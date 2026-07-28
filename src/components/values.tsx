'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Same gold hairline used across the site — the recurring "legacy line" signature.
const GOLD = '#B08C5A';

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.values-label',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Heading: per-line mask reveal, same technique as the hero
      gsap.fromTo(
        '.values-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.values-heading', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.values-intro',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: '.values-heading', start: 'top 82%' },
        }
      );

      // Row dividers draw in first, establishing the list's structure,
      // then each row's content fades up in sequence.
      gsap.fromTo(
        '.value-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.values-list', start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.value-row',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: '.values-list', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.values-signature',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-signature', start: 'top 88%' },
        }
      );

      gsap.fromTo(
        '.values-cta',
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-cta', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleEnter = (i: number) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    gsap.to(iconRefs.current[i], { rotate: 45, duration: 0.4, ease: 'back.out(2)' });
  };
  const handleLeave = (i: number) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    gsap.to(iconRefs.current[i], { rotate: 0, duration: 0.4, ease: 'power2.out' });
  };

  const values = [
    {
      title: 'Integrity',
      description: 'Serving with an unwavering commitment to trust, discretion, and the highest ethical standards.',
    },
    {
      title: 'Purposeful Impact',
      description: 'Developing enduring strategies that generate positive, lasting change for organizations and individuals.',
    },
    {
      title: 'Compassionate Leadership',
      description: 'Empowering others with empathy, wisdom, and a vision for common good.',
    },
    {
      title: 'Innovative Stewardship',
      description: 'Finding creative solutions while respecting resources and managing legacy with care.',
    },
    {
      title: 'Professional Excellence',
      description: 'Relentless dedication to mastery and quality in every facet of our work.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-section-label="Core Values"
      className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <p
          className="values-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-8 md:mb-12"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          03 — Core Values
        </p>

        {/* Heading + intro, left-aligned to match the rest of the site's
            typographic system rather than a centered all-caps block. */}
        <div className="values-heading grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-end mb-16 md:mb-20">
          <h2
            className="text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="values-heading-line block">The values that</span>
            </span>
            <span className="block overflow-hidden">
              <span className="values-heading-line block italic text-[#DDD9CE]">steady the work.</span>
            </span>
          </h2>
          <p
            className="values-intro text-[#DDD9CE]/70 text-sm md:text-base leading-relaxed lg:pb-2"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Five commitments that shape every program, every conversation, and
            every client relationship — not aspirations, but the standard.
          </p>
        </div>

        {/* Manifesto list — rows instead of cards, expand on hover to reveal
            the description. On touch/narrow screens the description is
            simply always visible (no hover-dependent content). */}
        <div className="values-list border-t border-[#DDD9CE]/15">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="value-row group relative border-b border-[#DDD9CE]/15 py-7 md:py-9"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              <span
                className="value-divider absolute left-0 top-0 h-px w-full origin-left"
                style={{ backgroundColor: GOLD, opacity: 0.4, transform: 'scaleX(0)' }}
              />

              <div className="flex items-start justify-between gap-6 md:gap-10">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span
                    className="text-[#DDD9CE]/30 text-xs md:text-sm tracking-[0.1em] tabular-nums pt-1"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="text-[#F6F6F6] text-xl md:text-2xl lg:text-3xl transition-colors duration-300 group-hover:text-[#DDD9CE]"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {value.title}
                  </h3>
                </div>

                <span
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="hidden lg:inline-flex mt-2 shrink-0 text-[#DDD9CE]/50 transition-colors duration-300 group-hover:text-[#DDD9CE]"
                >
                  <Plus size={18} strokeWidth={1.5} />
                </span>
              </div>

              {/* Description: CSS grid-rows trick for a smooth, robust
                  expand/collapse — no JS height measuring required. */}
              <div className="grid transition-[grid-template-rows] duration-500 ease-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p
                    className="text-[#DDD9CE]/70 text-sm md:text-base leading-relaxed max-w-xl pt-4 md:pt-5 pl-0 lg:pl-[3.1rem]"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature and CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 md:pt-16">
          <p
            className="values-signature text-[#DDD9CE] text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-signature), cursive' }}
          >
            Maud Berkx
          </p>

          <a
            href="/values"
            className="values-cta group flex items-center gap-3 text-[#F6F6F6] text-sm md:text-base transition-colors duration-300 hover:text-[#DDD9CE]"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b border-[#F6F6F6]/50 pb-0.5 transition-colors duration-300 group-hover:border-[#DDD9CE]">
              Learn More about Our Approach
            </span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}