'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Shared brand gold — matches Hero.tsx on the homepage
const GOLD = '#C5A065';

export default function PodcastHero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLSpanElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Slow continuous Ken Burns drift on the background, same feel as homepage
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          { scale: 1, duration: 8, ease: 'power1.out', repeat: -1, yoyo: true }
        );
      }

      // Ambient waveform — each bar breathes independently, like quiet audio
      if (waveRef.current) {
        const bars = waveRef.current.querySelectorAll('.wave-bar');
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: 0.25 + Math.random() * 0.9,
            duration: 1.1 + Math.random() * 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.06,
            transformOrigin: 'center center',
          });
        });
      }

      tl.from('.podcast-hero-label', {
        opacity: 0,
        y: 24,
        duration: 1,
      })
        .from(
          '.podcast-hero-wave',
          { opacity: 0, duration: 1 },
          '-=0.6'
        )
        // Per-line mask reveal, identical mechanic to the homepage headline
        .fromTo(
          '.podcast-hero-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.15 },
          '-=0.7'
        )
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'center center' },
          '-=0.7'
        )
        .from(
          '.podcast-hero-subtitle',
          { opacity: 0, y: 20, duration: 1 },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]"
    >
      <style>{`
        @keyframes podcastBtnReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .podcast-hero-buttons {
          opacity: 0;
          animation: podcastBtnReveal 0.8s ease-out 2.3s forwards;
        }
        .podcast-hero-buttons.btn-secondary {
          animation-delay: 2.45s;
        }
        @media (prefers-reduced-motion: reduce) {
          .podcast-hero-buttons {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
      {/* Background layer — swap for a studio / microphone image that matches your other pages */}
      <div
        className="absolute inset-0 bg-[url('/banner-5.png')] bg-cover md:bg-center bg-position-[35%_100%] bg-no-repeat opacity-40"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Dark gradient so text always reads clean against any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-[#121212]/30" />

      {/* Content container — mirrors homepage hero's right-aligned rhythm */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <p
            className="podcast-hero-label text-xs md:text-sm tracking-[0.25em] uppercase mb-6 md:mb-8"
            style={{ color: GOLD }}
          >
            The Podcast
          </p>

          {/* Ambient waveform — the signature element for this page */}
          <div
            ref={waveRef}
            className="podcast-hero-wave flex items-center justify-center gap-[3px] h-8 md:h-10 mb-6 md:mb-8"
            aria-hidden="true"
          >
            {Array.from({ length: 42 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar block w-[2px] md:w-[3px] rounded-full"
                style={{
                  height: '100%',
                  backgroundColor: GOLD,
                  opacity: 0.55,
                  transform: `scaleY(${0.2 + ((i % 7) / 7) * 0.6})`,
                }}
              />
            ))}
          </div>

          {/* Headline — masked reveal, identical mechanic to homepage */}
          <h1
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.35] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="podcast-hero-line block">Conversations that shape</span>
            </span>
            <span className="block overflow-hidden">
              <span className="podcast-hero-line block">a Kingdom legacy.</span>
            </span>
          </h1>

          {/* Gold divider, same treatment as homepage */}
          <div className="flex justify-center mb-6 md:mb-8">
            <span
              ref={goldLineRef}
              className="block h-px w-24 md:w-32 origin-center"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />
          </div>

          {/* Subtitle */}
          <p className="podcast-hero-subtitle text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10 font-light">
            Voices of Influence — faith, wisdom, and leadership conversations
            for women building something that lasts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              ref={button1Ref}
              className="podcast-hero-buttons group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-wide uppercase font-medium transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(197,160,101,0.35)] hover:-translate-y-0.5"
              style={{ backgroundColor: GOLD, color: '#121212' }}
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M0 0L10 6L0 12V0Z" fill="#121212" />
              </svg>
              Listen to the Latest Episode
            </button>

            <button
              ref={button2Ref}
              className="podcast-hero-buttons btn-secondary inline-flex items-center px-8 py-4 rounded-full text-sm tracking-wide uppercase font-medium text-white border border-white/30 transition-all duration-300 hover:border-white/70 hover:bg-white/5 hover:-translate-y-0.5"
            >
              Explore All Episodes
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade — same seam treatment as homepage hero */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
    </section>
  );
}