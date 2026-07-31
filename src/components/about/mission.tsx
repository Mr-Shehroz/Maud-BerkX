'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const BROWN = '#583929';

export default function MissionApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);

  const approach = [
    {
      numeral: 'I',
      title: 'Listen First',
      desc: 'Every engagement begins with deep, unhurried listening — to the person, the pressures they carry, and the calling underneath both.',
    },
    {
      numeral: 'II',
      title: 'Discern Together',
      desc: "Wisdom is drawn out, not handed down. Maud walks alongside leaders as they name what they already sense but haven't yet said aloud.",
    },
    {
      numeral: 'III',
      title: 'Build with Intention',
      desc: 'Strategy is shaped around what will actually last — structures, habits, and decisions built to hold weight over decades, not quarters.',
    },
    {
      numeral: 'IV',
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
          '.ma-label, .ma-initial, .ma-mission-text, .ma-mission-sub, .ma-step-numeral, .ma-step-title, .ma-step-desc, .ma-step-rule',
          { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 }
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

      // Illuminated initial — a single deliberate flourish, not scattered motion
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

      // The ribbon — a bookmark tracing progress down the ledger as you read
      if (railFillRef.current) {
        gsap.fromTo(
          railFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.ma-steps',
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.ma-step').forEach((step) => {
        gsap.fromTo(
          step.querySelector('.ma-step-numeral'),
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
        gsap.fromTo(
          [step.querySelector('.ma-step-title'), step.querySelector('.ma-step-desc')],
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            delay: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
        // Hand-inked underline drawing on beneath each title
        gsap.fromTo(
          step.querySelector('.ma-step-rule'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            delay: 0.35,
            transformOrigin: 'left center',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
      });
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
          {/* MISSION — read like the opening page of a ledger, not a centered banner */}
          <div className="ma-mission-col lg:sticky lg:top-28 self-start">
            <div className="max-w-md">
              {/* True drop cap: letter floats so the heading text wraps beside it, no overlap */}
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

          {/* APPROACH — a four-entry ledger, read down the page like turned pages */}
          <div className="ma-steps relative pl-16 sm:pl-20">
            {/* the ribbon: a vertical rail with a traveling gold fill, like a bookmark down the spine */}
            <div className="absolute left-6 sm:left-8 top-1 bottom-1 w-px bg-[#DDD9CE]/12">
              <div
                ref={railFillRef}
                className="absolute inset-0 w-full origin-top"
                style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
              />
            </div>

            <div className="flex flex-col gap-14 md:gap-16">
              {approach.map((step) => (
                <div key={step.numeral} className="ma-step relative">
                  <span
                    className="ma-step-numeral absolute -left-16 sm:-left-20 top-0 w-16 sm:w-20 text-right pr-6 sm:pr-7 text-2xl md:text-[1.7rem]"
                    style={{
                      fontFamily: 'var(--font-eb-garamond), serif',
                      color: GOLD,
                      fontStyle: 'italic',
                    }}
                  >
                    {step.numeral}
                  </span>

                  <h3
                    className="ma-step-title text-[#F6F6F6] text-lg md:text-xl lg:text-[1.4rem] mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {step.title}
                  </h3>

                  <span
                    className="ma-step-rule block h-px w-16 mb-3.5 origin-left"
                    style={{ backgroundColor: `${BROWN}00`, borderTop: `1px solid ${GOLD}80` }}
                  />

                  <p
                    className="ma-step-desc text-[#DDD9CE]/70 text-sm md:text-[0.95rem] leading-[1.7] max-w-md"
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