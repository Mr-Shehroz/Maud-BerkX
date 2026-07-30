'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Matches the current home Hero's metallic gold.
const GOLD = '#C5A065';

export default function JournalHero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Slow continuous Ken Burns drift — same treatment as the home hero.
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 8, ease: 'power1.out', repeat: -1, yoyo: true }
        );
      }

      tl.from('.jh-label', {
        opacity: 0,
        y: 24,
        duration: 1,
      })
        .fromTo(
          '.jh-headline-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'center center' },
          '-=0.7'
        )
        .from(
          '.jh-subtitle',
          { opacity: 0, y: 20, duration: 1 },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      data-section-label="Journal"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* Background layer with Ken Burns — swap the path to your actual
          journal banner asset. */}
      <div
        className="absolute inset-0 bg-[url('/banner-4.png')] bg-cover bg-center bg-no-repeat opacity-60"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Content — bottom-anchored, right-aligned, same as the home hero */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 pb-20 pt-[50vh]">
        <div className="max-w-4xl ml-auto text-right">

          <p
            className="jh-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            The Journal
          </p>

          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] md:leading-[1.15] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="jh-headline-line block">Wisdom for</span>
            </span>
            <span className="block overflow-hidden">
              <span className="jh-headline-line block italic" style={{ color: GOLD }}>
                the long road.
              </span>
            </span>
          </h1>

          <div className="flex justify-center mb-8 md:mb-10">
            <span
              ref={goldLineRef}
              className="block h-px w-24 md:w-32 origin-center"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />
          </div>

          <p
            className="jh-subtitle text-[#DDD9CE]/70 text-sm md:text-base leading-relaxed max-w-md ml-auto"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Essays on faith, leadership, and building something that outlasts
            trend and circumstance.
          </p>
        </div>
      </div>

      {/* Bottom fade — same seam treatment as the home hero */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
    </section>
  );
}