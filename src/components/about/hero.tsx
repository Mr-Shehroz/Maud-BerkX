'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GOLD = '#C5A065';

export default function AboutHero() {
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

      // Ken Burns effect on background
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 8, ease: 'power1.out', repeat: -1, yoyo: true }
        );
      }

      tl.from('.about-hero-label', {
        opacity: 0,
        y: 24,
        duration: 1,
      })
        .fromTo(
          '.about-hero-headline-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'center center' },
          '-=0.7'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* Background layer with Ken Burns effect */}
      <div
        className="absolute inset-0 bg-cover lg:bg-center bg-position-[30%_100%] bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url('/banner-3.png')`,
          transformOrigin: 'center center',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-[#121212]/20"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 pb-20 pt-[50vh]">
        <div className="xl:max-w-4xl max-w-2xl ml-auto">

          {/* Headline — masked reveal */}
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-normal leading-[1.1] md:leading-[1.35] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="about-hero-headline-line block">A life devoted to</span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-hero-headline-line block italic">
                faith, wisdom
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="about-hero-headline-line block">and enduring legacy.</span>
            </span>
          </h1>

          {/* Centered Gold line */}
          <div className="flex justify-center mb-8 md:mb-10">
            <span
              ref={goldLineRef}
              className="block h-px w-24 md:w-32 origin-center"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />
          </div>

        </div>
      </div>

      {/* Bottom fade to blend seamlessly into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}