'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

interface Category {
  label: string;
  count: number;
}

const CATEGORIES: Category[] = [
  { label: 'All', count: 9 },
  { label: 'Leadership', count: 3 },
  { label: 'Faith', count: 2 },
  { label: 'Stewardship', count: 2 },
  { label: 'Legacy', count: 2 },
];

interface CategoriesFilterProps {
  /** Called with the selected category label ('All' or one of the topics)
   *  so the parent page can filter the Journal Archive grid above/below. */
  onChange?: (category: string) => void;
}

export default function CategoriesFilter({ onChange }: CategoriesFilterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState('All');

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const moveIndicator = (index: number, animate = true) => {
    const tab = tabRefs.current[index];
    const indicator = indicatorRef.current;
    if (!tab || !indicator) return;
    const { offsetLeft, offsetWidth } = tab;

    if (!animate || prefersReducedMotion) {
      gsap.set(indicator, { x: offsetLeft, width: offsetWidth });
      return;
    }
    gsap.to(indicator, { x: offsetLeft, width: offsetWidth, duration: 0.45, ease: 'power3.out' });
  };

  useEffect(() => {
    // Position the indicator under "All" once refs are mounted.
    requestAnimationFrame(() => moveIndicator(0, false));

    const onResize = () => {
      const i = CATEGORIES.findIndex((c) => c.label === active);
      moveIndicator(i, false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.cf-label',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );

      gsap.fromTo(
        '.cf-heading-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.cf-heading', start: 'top 82%' } }
      );

      gsap.fromTo(
        '.cf-tabs',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: '.cf-tabs', start: 'top 88%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSelect = (label: string, index: number) => {
    setActive(label);
    moveIndicator(index);
    onChange?.(label);
  };

  return (
    <section ref={sectionRef} data-section-label="Browse by Topic" className="relative bg-[#F6F6F6] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p
              className="cf-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              04 — Browse by Topic
            </p>
            <h2
              className="cf-heading text-[#282828] text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.2]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="cf-heading-line block">Find what speaks to you.</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Pill tabs with a sliding gold indicator underneath the active one */}
        <div className="cf-tabs relative">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-5 no-scrollbar">
            {CATEGORIES.map((cat, i) => {
              const isActive = active === cat.label;
              return (
                <button
                  key={cat.label}
                  ref={(el) => {tabRefs.current[i] = el}}
                  onClick={() => handleSelect(cat.label, i)}
                  className={`shrink-0 inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full border text-xs md:text-sm uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#282828] border-[#282828] text-[#F6F6F6]'
                      : 'border-[#282828]/20 text-[#282828]/70 hover:border-[#583929] hover:text-[#583929]'
                  }`}
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {cat.label}
                  <span className={isActive ? 'text-[#DDD9CE]/70' : 'text-[#453E33]/40'}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sliding indicator — sits under the tab row, tracks the active
              tab's measured position/width rather than a static swap. */}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ backgroundColor: GOLD }}
          />
        </div>
      </div>
    </section>
  );
}