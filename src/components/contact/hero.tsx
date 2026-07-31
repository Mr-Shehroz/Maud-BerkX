'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function ContactHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const meta = [
    { label: 'Write', value: 'hello@maudberkx.com' },
    { label: 'Based In', value: 'Amsterdam, Netherlands' },
    { label: 'Availability', value: 'International Travel' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.ch-label',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );

      gsap.fromTo(
        '.ch-heading-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.ch-heading', start: 'top 85%' } }
      );

      gsap.fromTo(
        '.ch-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: '.ch-heading', start: 'top 85%' } }
      );

      gsap.fromTo(
        '.ch-meta-item',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.ch-meta', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#282828] py-[50px] md:py-[80px] lg:pt-[150px] lg:pb-[100px] overflow-hidden"
    >
      {/* Same ambient gold glow used behind Journal / Availability, so this
          reads as part of the same dark-section family rather than a
          one-off. */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${GOLD}1a, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 mt-[7vh] lg:mt-0">
        <p
          className="ch-label text-[#DDD9CE]/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          — Get in Touch
        </p>

        <h1
          className="ch-heading text-[#F6F6F6] text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.35] max-w-4xl mb-8"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          <span className="block overflow-hidden">
            <span className="ch-heading-line block">A conversation,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="ch-heading-line block italic" style={{ color: GOLD }}>before anything else.</span>
          </span>
        </h1>

        <p
          className="ch-sub text-[#DDD9CE]/60 text-base md:text-lg max-w-xl mb-16 md:mb-20 leading-relaxed"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Whether you&apos;re exploring mentorship, inviting Maud to speak, or simply
          have a question — every message is read personally, and answered with
          the same care it was written with.
        </p>

        <div className="ch-meta grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 border-t border-white/10 pt-10">
          {meta.map((item) => (
            <div key={item.label} className="ch-meta-item">
              <p
                className="text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {item.label}
              </p>
              <p
                className="text-[#F6F6F6] text-lg md:text-xl"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}