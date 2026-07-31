'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Updated Gold color to match the reference design's metallic accent
const GOLD = '#C5A065'; 

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

      // Slow continuous Ken Burns drift on the background
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 8, ease: 'power1.out', repeat: -1, yoyo: true }
        );
      }

      tl.from('.hero-label', {
        opacity: 0,
        y: 24,
        duration: 1,
      })
        // Per-line mask reveal
        .fromTo(
          '.hero-headline-line',
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
          '.hero-subtitle',
          { opacity: 0, y: 20, duration: 1 },
          '-=0.6'
        )
        .from(
          '.hero-buttons',
          { opacity: 0, y: 16, duration: 0.9, stagger: 0.1 },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Magnetic hover effect for buttons
  useEffect(() => {
    if (prefersReducedMotion) return;
    const buttons = [button1Ref.current, button2Ref.current].filter(Boolean) as HTMLButtonElement[];
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const quickX = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const quickY = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        quickX((e.clientX - (rect.left + rect.width / 2)) * 0.15);
        quickY((e.clientY - (rect.top + rect.height / 2)) * 0.2);
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
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      {/* Background layer with Ken Burns effect */}
      <div
        className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat opacity-60"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Dark overlay to ensure text readability against the background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/40 via-[#121212]/20 to-[#121212]"></div> */}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 pb-20 pt-[50vh]">
        <div className="xl:max-w-4xl max-w-2xl ml-auto">

          {/* Headline — masked reveal */}
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-normal leading-[1.1] md:leading-[1.30] mb-6 md:mb-8"
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

          {/* Centered Gold legacy line */}
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