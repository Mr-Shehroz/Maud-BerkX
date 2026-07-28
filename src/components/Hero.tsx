'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Same gold hairline used in the header — the recurring "legacy line" signature.
const GOLD = '#B08C5A';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLSpanElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Slow continuous Ken Burns drift on the background — runs independently
      // of the entrance timeline so it never "finishes" and stalls.
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 6, ease: 'power1.out' }
        );
      }

      tl.from('.hero-label', {
        opacity: 0,
        y: 24,
        duration: 0.9,
      })
        // Per-line mask reveal. Each line sits in its own overflow-hidden
        // wrapper, so translating the inner span up from below the mask
        // reads as a clean reveal rather than a fade.
        .fromTo(
          '.hero-headline-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.14 },
          '-=0.5'
        )
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left center' },
          '-=0.6'
        )
        .from(
          '.hero-subtitle',
          { opacity: 0, y: 20, duration: 0.9 },
          '-=0.5'
        )
        .from(
          '.hero-buttons',
          { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Magnetic hover on both CTAs — same feel as the header's Request button.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const buttons = [button1Ref.current, button2Ref.current].filter(Boolean) as HTMLButtonElement[];
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const quickX = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const quickY = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        quickX((e.clientX - (rect.left + rect.width / 2)) * 0.2);
        quickY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      };

      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      cleanups.push(() => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layer, isolated so it can scale (Ken Burns) independently
          of everything else in the section. */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/banner1.webp')] bg-cover bg-top bg-no-repeat"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Subtle dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#282828]/20"></div>

      {/* BOTTOM MERGE LAYER: fades the hero image into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-44 bg-gradient-to-t from-[#2D241E] via-[#2D241E]/70 to-transparent z-0 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-20">
        <div className="flex justify-end">
          <div className="max-w-2xl lg:max-w-3xl">

            <p
              className="hero-label text-[#F6F6F6] text-lg md:text-xl mb-4 md:mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Cormorant Garamond
            </p>

            {/* Headline — each line masked for a clean reveal */}
            <h1
              className="text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] md:leading-[1.15] lg:leading-[1.2] mb-3 md:mb-4"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="hero-headline-line block">The quiet leadership</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-headline-line block">that builds an enduring</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-headline-line block">Kingdom legacy.</span>
              </span>
            </h1>

            {/* Gold legacy line — same signature accent as the header */}
            <span
              ref={goldLineRef}
              className="block h-px w-24 md:w-32 mb-6 md:mb-8 origin-left"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />

            <p
              className="hero-subtitle text-[#F6F6F6]/90 text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 max-w-xl"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              A curated journey of faith and wisdom for international women of influence.
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <button
                ref={button1Ref}
                className="hero-buttons group relative px-6 md:px-8 py-3 md:py-4 bg-[#453E33] text-[#F6F6F6] text-xs md:text-sm font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-[#583929] hover:tracking-wider"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Explore the Vision
              </button>

              <button
                ref={button2Ref}
                className="hero-buttons group relative px-6 md:px-8 py-3 md:py-4 bg-[#F6F6F6] text-[#282828] text-xs md:text-sm font-medium tracking-wide rounded-sm transition-all duration-300 hover:bg-[#DDD9CE] hover:tracking-wider"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Read the Journal
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}