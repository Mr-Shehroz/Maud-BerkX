'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Same gold hairline used across the site. Here it becomes literal: the
// thread that runs through Maud's actual timeline, which is the one place
// on the site where that metaphor is earned rather than decorative.
const GOLD = '#B08C5A';

export default function FaithVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const goldVertRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.fv-label',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' },
        }
      );

      gsap.fromTo(
        '.timeline-node-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' },
        }
      );

      // The gold line's fill IS the timeline — it draws as you scroll
      // through her actual history.
      gsap.fromTo(
        '.timeline-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        }
      );

      // Connector ticks bridge the node to the copy, closing the visual gap
      // that made the row feel empty.
      gsap.fromTo(
        '.timeline-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          stagger: 0.2,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' },
        }
      );

      // Oversized ghost year fills the empty opposite column — same device
      // as the ghost quote mark elsewhere on the site.
      gsap.fromTo(
        '.timeline-ghost-year',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' },
        }
      );

      // Active-chapter spotlight: the item nearest center brightens and its
      // node grows, everything else settles back — gives the timeline a
      // sense of progression rather than sitting there as a static list.
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const node = el.querySelector('.timeline-node');
        const ghost = el.querySelector('.timeline-ghost-year') as HTMLElement | null;
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            gsap.to(el, { opacity: self.isActive ? 1 : 0.45, duration: 0.5, ease: 'power2.out' });
            if (node) gsap.to(node, { scale: self.isActive ? 1.35 : 1, duration: 0.5, ease: 'back.out(2)' });
            if (ghost) gsap.to(ghost, { opacity: self.isActive ? 0.1 : 0.05, duration: 0.6 });
          },
        });
      });

      // Quote/vision image: same curtain wipe + parallax as Hero/About,
      // for a consistent site-wide image language.
      if (imageWrapRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.3,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
          }
        );
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.15, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '.quote-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (goldVertRef.current) {
        gsap.fromTo(
          goldVertRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'top center',
            delay: 0.3,
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
          }
        );
      }

      // Vision headline: per-line mask reveal
      gsap.fromTo(
        '.quote-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.quote-content', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.quote-signature',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: '.quote-signature', start: 'top 88%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const milestones = [
    { year: '2012', title: 'The Foundation', desc: 'A vision of purposeful leadership takes root.' },
    { year: '2018', title: 'Deepening Faith', desc: 'Wisdom becomes the core. The Kingdom focus emerges.' },
    { year: '2023', title: 'Expanding Impact', desc: 'The global community finds leadership with grace.' },
    { year: '2026', title: 'Kingdom Legacy', desc: 'Vision and wisdom are codified for future generations.' },
  ];

  return (
    <section ref={sectionRef} data-section-label="Faith & Vision" className="relative bg-[#F6F6F6] overflow-hidden">
      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-24 md:py-32 lg:py-40">

        <p
          className="fv-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-20 md:mb-32"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          04 — Faith &amp; Vision
        </p>

        {/* TIMELINE — plain text blocks either side of a gold line, no
            card boxes, no icon circles. The line's fill traces her history
            as you scroll. */}
        <div className="timeline-container relative mb-32 md:mb-48">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#282828]/12 md:-translate-x-1/2">
            <div
              className="timeline-line-fill absolute top-0 left-0 w-full h-full origin-top"
              style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Node — grows and fills when this chapter is active */}
                  <div className="timeline-node absolute left-4 md:left-1/2 w-3 h-3 rounded-full border border-[#B08C5A] flex items-center justify-center -translate-x-1/2 z-10 bg-[#F6F6F6]">
                    <span className="timeline-node-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                  </div>

                  {/* Connector tick — bridges the gap between the line and the copy */}
                  <span
                    className={`timeline-connector hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-16 ${
                      isLeft ? 'right-1/2' : 'left-1/2'
                    }`}
                    style={{
                      backgroundColor: GOLD,
                      opacity: 0.5,
                      transform: 'scaleX(0)',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                    }}
                  />

                  <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <p
                      className="text-[#583929] text-3xl md:text-4xl leading-none mb-3 tabular-nums"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      {item.year}
                    </p>
                    <h3
                      className="text-[#282828] text-lg md:text-xl font-semibold tracking-[0.08em] uppercase mb-3"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[#453E33]/75 text-sm md:text-base leading-relaxed ${isLeft ? 'md:ml-auto' : ''} max-w-sm`}
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Ghost year — fills what was empty space with a quiet
                      typographic watermark instead of leaving it blank */}
                  <div
                    className={`hidden md:flex md:w-1/2 items-center overflow-hidden pointer-events-none select-none ${
                      isLeft ? 'justify-start pl-16' : 'justify-end pr-16'
                    }`}
                    aria-hidden
                  >
                    <span
                      className="timeline-ghost-year text-[#583929] leading-none"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif', fontSize: '9rem', opacity: 0.05 }}
                    >
                      {item.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUOTE / VISION */}
        <div className="quote-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-16 md:pt-20 border-t border-[#282828]/10">

          <div className="relative">
            <div ref={imageWrapRef} className="relative h-[440px] md:h-[560px] overflow-hidden">
              <div ref={imageInnerRef} className="absolute inset-[-4%]">
                <img src="/banner.webp" alt="Maud Berkx — Vision" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <span
              ref={goldVertRef}
              className="hidden lg:block absolute top-0 -right-8 w-px h-full origin-top"
              style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
            />
          </div>

          <div className="quote-content space-y-8 lg:pl-8">
            <h2
              className="text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="quote-heading-line block">We build. We serve.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="quote-heading-line block">We lead with love.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="quote-heading-line block italic text-[#583929]">For the Glory of the King.</span>
              </span>
            </h2>

            <div className="quote-signature pt-8">
              <p className="text-[#583929] text-5xl md:text-6xl mb-8" style={{ fontFamily: 'var(--font-signature), cursive' }}>
                Maud Berkx
              </p>

              <a
                href="/vision"
                className="group inline-flex items-center gap-3 text-[#282828] text-sm md:text-base transition-colors duration-300 hover:text-[#583929]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="border-b border-[#282828]/50 pb-1 transition-colors duration-300 group-hover:border-[#583929]">
                  Continue the Journey.
                </span>
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}