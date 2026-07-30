'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const BROWN = '#583929';

export default function MissionApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const approach = [
    {
      num: '01',
      title: 'Listen First',
      desc: 'Every engagement begins with deep, unhurried listening — to the person, the pressures they carry, and the calling underneath both.',
    },
    {
      num: '02',
      title: 'Discern Together',
      desc: "Wisdom is drawn out, not handed down. Maud walks alongside leaders as they name what they already sense but haven't yet said aloud.",
    },
    {
      num: '03',
      title: 'Build with Intention',
      desc: 'Strategy is shaped around what will actually last — structures, habits, and decisions built to hold weight over decades, not quarters.',
    },
    {
      num: '04',
      title: 'Steward the Legacy',
      desc: "The work doesn't end at implementation. Ongoing stewardship ensures what's built continues to serve long after the engagement closes.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ma-label',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.ma-mission-line',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.ma-mission', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.ma-mission-sub',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.ma-mission', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.ma-approach-label',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ma-approach', start: 'top 85%' },
        }
      );

      if (connectorRef.current) {
        gsap.fromTo(
          connectorRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: '.ma-steps',
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.ma-step').forEach((step, i) => {
        gsap.fromTo(
          step.querySelector('.ma-step-num'),
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
        gsap.fromTo(
          [step.querySelector('.ma-step-title'), step.querySelector('.ma-step-desc')],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.1,
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
        gsap.fromTo(
          step.querySelector('.ma-step-dot'),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
            delay: i * 0.05,
            scrollTrigger: { trigger: '.ma-steps', start: 'top 78%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-[#282828] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden">
      {/* Ambient gold glow, consistent with Core Values / Journal dark sections */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 15%, ${GOLD}1a, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <p
          className="ma-label text-center text-[#DDD9CE]/80 text-xs md:text-sm tracking-[0.28em] uppercase mb-8 md:mb-10"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Mission &amp; Approach
        </p>

        {/* MISSION — one large declarative statement, not a paragraph. */}
        <div className="ma-mission max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <h2
            className="text-[#F6F6F6] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.3]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="ma-mission-line block">To help women of influence build</span>
            </span>
            <span className="block overflow-hidden">
              <span className="ma-mission-line block italic" style={{ color: GOLD }}>
                legacies that outlast them —
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="ma-mission-line block">rooted in faith, not fame.</span>
            </span>
          </h2>
        </div>

        <p
          className="ma-mission-sub text-center text-[#DDD9CE]/75 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          That mission shapes everything — from the first conversation to the
          structures built years into a partnership.
        </p>

        {/* APPROACH */}
        <div className="ma-approach">
          <p
            className="ma-approach-label text-center text-[#DDD9CE]/80 text-xs md:text-sm tracking-[0.28em] uppercase mb-10 md:mb-12"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            The Approach
          </p>

          <div className="ma-steps relative">
            {/* Connecting thread — visible only at lg+ where steps sit in a single row */}
            <div className="hidden lg:block absolute top-[1.875rem] left-0 right-0 h-px bg-[#DDD9CE]/10">
              <div
                ref={connectorRef}
                className="absolute inset-0 h-full origin-left"
                style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-x-8 lg:gap-y-0">
              {approach.map((step) => (
                <div key={step.num} className="ma-step relative pt-0 lg:pt-16">
                  {/* Dot on the connecting thread */}
                  <span
                    className="ma-step-dot hidden lg:block absolute top-[1.875rem] left-0 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                    style={{ backgroundColor: GOLD, boxShadow: `0 0 0 8px #282828` }}
                  />

                  <p
                    className="ma-step-num text-3xl md:text-4xl mb-3"
                    style={{ color: GOLD, fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {step.num}
                  </p>
                  <h3
                    className="ma-step-title text-[#F6F6F6] text-base md:text-lg lg:text-xl mb-2.5 leading-snug"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="ma-step-desc text-[#DDD9CE]/70 text-sm leading-[1.65]"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}