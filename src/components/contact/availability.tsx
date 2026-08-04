'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const NAVY = '#0B0730';
const CREAM = '#FAF9F6';
const TEXT = '#5F5B6B';

export default function ContactAvailabilitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.from('.ca-left-col', {
        opacity: 0,
        x: -40,
        duration: 1,
      })
        .from(
          '.ca-right-col',
          {
            opacity: 0,
            x: 40,
            duration: 1,
          },
          '-=0.8'
        )
        .from(
          '.ca-label',
          {
            opacity: 0,
            y: 16,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.ca-heading',
          {
            opacity: 0,
            y: 24,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          '.ca-subtext',
          {
            opacity: 0,
            y: 16,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.ca-action-box',
          {
            opacity: 0,
            y: 24,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          '.ca-trust',
          {
            opacity: 0,
            y: 12,
            duration: 0.8,
          },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF9F6] py-24 md:py-32 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 55% at 85% 50%,
              ${GOLD}0A 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 40% at 10% 20%,
              ${NAVY}04 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[700px] rounded-full blur-[140px]
        pointer-events-none"
        style={{
          background: `${GOLD}06`,
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="ca-left-col lg:col-span-5">
            <div className="flex items-start gap-6 md:gap-8">

              {/* Gold vertical accent */}
              <div
                className="w-1 h-16 md:h-20 shrink-0 mt-1 rounded-full"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    ${GOLD},
                    ${GOLD}80
                  )`,
                }}
              />

              <div>

                {/* Label */}
                <span
                  className="ca-label inline-block text-xs md:text-sm
                  font-medium tracking-[0.3em] uppercase mb-5"
                  style={{
                    color: GOLD,
                    fontFamily: 'var(--font-hanken), sans-serif',
                  }}
                >
                  04 — Availability
                </span>

                {/* Heading */}
                <h2
                  className="ca-heading text-[#0B0730]
                  text-4xl md:text-5xl lg:text-6xl
                  font-normal mb-6
                  tracking-tight
                  leading-[1.1]"
                  style={{
                    fontFamily: 'var(--font-eb-garamond), serif',
                  }}
                >
                  Based in Amsterdam.
                  <br className="hidden md:block" />

                  <span
                    className="italic"
                    style={{ color: GOLD }}
                  >
                    Available wherever the work calls.
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="ca-subtext text-[#5F5B6B]
                  text-base md:text-lg
                  leading-relaxed max-w-md"
                  style={{
                    fontFamily: 'var(--font-hanken), sans-serif',
                  }}
                >
                  Maud travels internationally for speaking engagements,
                  retreats, and select in-person mentorship.
                </p>

              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="ca-right-col lg:col-span-7 lg:pl-12">

            <div
              className="
                ca-action-box
                relative
                bg-white/75
                border
                border-[#0B0730]/10
                rounded-sm
                p-8
                md:p-10
                lg:p-12
                shadow-[0_20px_60px_rgba(11,7,48,0.06)]
                backdrop-blur-sm
              "
            >

              {/* Gold top accent */}
              <div
                className="absolute top-0 left-0 w-20 h-[2px]"
                style={{
                  background: `linear-gradient(
                    to right,
                    ${NAVY},
                    ${GOLD}
                  )`,
                }}
              />

              {/* Decorative corner */}
              <div
                className="absolute top-5 right-5 w-10 h-10
                border-t border-r"
                style={{
                  borderColor: `${GOLD}70`,
                }}
              />

              <div className="relative z-10">

                {/* Section mini heading */}
                <div className="mb-8">

                  <span
                    className="inline-block text-[10px] md:text-xs
                    tracking-[0.3em] uppercase mb-3"
                    style={{
                      color: GOLD,
                      fontFamily: 'var(--font-hanken), sans-serif',
                    }}
                  >
                    Open to the right conversations
                  </span>

                  <h3
                    className="text-[#0B0730]
                    text-2xl md:text-3xl
                    font-normal"
                    style={{
                      fontFamily: 'var(--font-eb-garamond), serif',
                    }}
                  >
                    Wherever the work calls.
                  </h3>

                </div>

                {/* =================================================
                    LOCATION BADGES
                ================================================= */}

                <div className="flex flex-wrap gap-4 mb-8">

                  <div
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3.5
                      bg-[#FAF9F6]
                      border
                      border-[#0B0730]/10
                      rounded-sm
                      transition-all
                      duration-300
                      hover:border-[#C5A065]/60
                      hover:-translate-y-0.5
                    "
                  >
                    <MapPin
                      size={16}
                      className="text-[#C5A065]"
                    />

                    <span
                      className="text-[#5F5B6B] text-sm"
                      style={{
                        fontFamily:
                          'var(--font-hanken), sans-serif',
                      }}
                    >
                      Amsterdam, NL
                    </span>
                  </div>

                  <div
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3.5
                      bg-[#FAF9F6]
                      border
                      border-[#0B0730]/10
                      rounded-sm
                      transition-all
                      duration-300
                      hover:border-[#C5A065]/60
                      hover:-translate-y-0.5
                    "
                  >
                    <Globe
                      size={16}
                      className="text-[#C5A065]"
                    />

                    <span
                      className="text-[#5F5B6B] text-sm"
                      style={{
                        fontFamily:
                          'var(--font-hanken), sans-serif',
                      }}
                    >
                      Global Travel
                    </span>
                  </div>

                </div>

                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div
                  className="w-full h-px mb-8"
                  style={{
                    background: `linear-gradient(
                      to right,
                      ${GOLD}40,
                      ${NAVY}08,
                      transparent
                    )`,
                  }}
                />

                {/* =================================================
                    CTA
                ================================================= */}

                <a
                  href="mailto:hello@maudberkx.com"
                  className="
                    group
                    relative
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-6
                    md:px-8
                    py-5
                    bg-[#C5A065]
                    text-white
                    text-xs
                    md:text-sm
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    rounded-sm
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:bg-[#D4B07A]
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_35px_rgba(197,160,101,0.25)]
                  "
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >

                  <span className="relative z-10">
                    hello@maudberkx.com
                  </span>

                  <span
                    className="
                      relative
                      z-10
                      w-9
                      h-9
                      rounded-full
                      border
                      border-[#0B0730]/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </span>

                  {/* Shine */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-transparent
                      via-white/30
                      to-transparent
                      -translate-x-full
                      group-hover:translate-x-full
                      transition-transform
                      duration-700
                    "
                  />

                </a>

                {/* =================================================
                    TRUST NOTE
                ================================================= */}

                <p
                  className="
                    ca-trust
                    text-[#8A8792]
                    text-xs
                    tracking-wide
                    flex
                    items-center
                    gap-2
                    mt-6
                  "
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: `${GOLD}90`,
                    }}
                  />

                  Personally read. Typically replies within
                  2–3 business days.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}