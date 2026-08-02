'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function MissionApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const approach = [
    {
      numeral: '01',
      title: 'Listen First',
      desc: 'Every engagement begins with deep, unhurried listening — to the person, the pressures they carry, and the calling underneath both.',
    },
    {
      numeral: '02',
      title: 'Discern Together',
      desc: "Wisdom is drawn out, not handed down. Maud walks alongside leaders as they name what they already sense but haven't yet said aloud.",
    },
    {
      numeral: '03',
      title: 'Build with Intention',
      desc: 'Strategy is shaped around what will actually last — structures, habits, and decisions built to hold weight over decades, not quarters.',
    },
    {
      numeral: '04',
      title: 'Steward the Legacy',
      desc: "The work doesn't end at implementation. Ongoing stewardship ensures what's built continues to serve long after the engagement closes.",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          '.ma-label, .ma-initial, .ma-mission-text, .ma-mission-sub, .ma-card',
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      gsap.fromTo(
        '.ma-label',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.ma-initial',
        { opacity: 0, scale: 0.85, rotate: -4 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.ma-mission-col', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.ma-mission-text',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: '.ma-mission-col', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.ma-mission-sub',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: { trigger: '.ma-mission-col', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.ma-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ma-cards', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#282828] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${GOLD}1a, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
        <p
          className="ma-label text-center text-[#DDD9CE]/80 text-xs md:text-sm tracking-[0.28em] uppercase mb-14 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Mission &amp; Approach
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-y-16 lg:gap-x-16 xl:gap-x-24">
          {/* MISSION */}
          <div className="ma-mission-col lg:sticky lg:top-28 self-start">
            <div className="max-w-md">
              <div className="ma-initial-wrap overflow-hidden">
                <h2
                  className="ma-mission-text text-[#F6F6F6] text-2xl sm:text-3xl md:text-[2.15rem] lg:text-4xl font-normal leading-[1.35]"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  <span
                    className="ma-initial float-left leading-[0.72] select-none mr-2"
                    style={{
                      color: GOLD,
                      fontSize: 'clamp(4rem, 8.5vw, 5.75rem)',
                      fontStyle: 'italic',
                    }}
                    aria-hidden="true"
                  >
                    T
                  </span>
                  o help women of influence build{' '}
                  <span className="italic" style={{ color: GOLD }}>
                    legacies that outlast them
                  </span>{' '}
                  — rooted in faith, not fame.
                </h2>
              </div>

              <p
                className="ma-mission-sub text-[#DDD9CE]/70 text-sm md:text-base leading-relaxed mt-7 pl-6 border-l"
                style={{
                  fontFamily: 'var(--font-hanken), sans-serif',
                  borderColor: `${GOLD}40`,
                }}
              >
                That mission shapes everything — from the first conversation
                to the structures built years into a partnership.
              </p>
            </div>
          </div>

          {/* APPROACH — a 2x2 grid of quiet, self-contained cards. Each carries
              its own ghosted numeral in the corner instead of relying on a
              connecting line, so the layout reads as four standalone
              principles rather than sequential steps on a track. */}
          <div className="ma-cards grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {approach.map((step) => (
              <div
                key={step.numeral}
                className="ma-card group relative overflow-hidden p-7 md:p-8 border transition-colors duration-500"
                style={{
                  borderColor: `${GOLD}26`,
                  backgroundColor: 'rgba(246,246,246,0.02)',
                }}
              >
                {/* ghosted numeral, tucked in the corner as texture, not a label */}
                <span
                  className="pointer-events-none select-none absolute -top-3 right-3 text-[5rem] md:text-[6rem] leading-none font-normal transition-colors duration-500"
                  style={{
                    fontFamily: 'var(--font-eb-garamond), serif',
                    color: 'rgba(246,246,246,0.05)',
                  }}
                  aria-hidden="true"
                >
                  {step.numeral}
                </span>

                {/* top accent that draws in on hover — replaces the old rail as the only "line" in the section */}
                <span
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-[width] duration-500 ease-out"
                  style={{ backgroundColor: GOLD }}
                />

                <div className="relative">
                  <span
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {step.numeral}
                  </span>

                  <h3
                    className="text-[#F6F6F6] text-lg md:text-xl lg:text-[1.35rem] mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-[#DDD9CE]/65 text-sm md:text-[0.95rem] leading-[1.7]"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}