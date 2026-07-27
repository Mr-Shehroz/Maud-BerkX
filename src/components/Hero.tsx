'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.from('.hero-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from('.hero-headline', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.7
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[url('/banner1.webp')] bg-cover bg-top bg-no-repeat"
    >
      {/* Subtle dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#282828]/20"></div>

      {/* ✨ BOTTOM MERGE LAYER: Smoothly fades the hero image into the next section's light background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-44 bg-gradient-to-t from-[#2D241E] via-[#2D241E]/70 to-transparent z-0 pointer-events-none"></div>

      {/* Content Container with requested sizing */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-20">
        <div className="flex justify-end">

          {/* Content Block - Positioned to the right */}
          <div className="max-w-2xl lg:max-w-3xl">

            {/* Font Label */}
            <p
              className="hero-label text-[#F6F6F6] text-lg md:text-xl mb-4 md:mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Cormorant Garamond
            </p>

            {/* Main Headline */}
            <h1
              className="hero-headline text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] md:leading-[1.15] lg:leading-[1.2] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              The quiet leadership<br className="hidden md:block" />
              that builds an enduring<br className="hidden md:block" />
              Kingdom legacy.
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle text-[#F6F6F6]/90 text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 max-w-xl"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              A curated journey of faith and wisdom for international women of influence.
            </p>

            {/* Buttons */}
            <div className="hero-buttons flex flex-wrap gap-4 md:gap-6">
              <button
                className="group px-6 md:px-8 py-3 md:py-4 bg-[#453E33] text-[#F6F6F6] text-xs md:text-sm font-medium tracking-wide rounded-sm hover:bg-[#583929] transition-all duration-300"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Explore the Vision
              </button>

              <button
                className="group px-6 md:px-8 py-3 md:py-4 bg-[#F6F6F6] text-[#282828] text-xs md:text-sm font-medium tracking-wide rounded-sm hover:bg-[#DDD9CE] transition-all duration-300"
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