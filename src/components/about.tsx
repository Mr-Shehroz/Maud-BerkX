'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-label',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-label', start: 'top 85%' }
        }
      );

      gsap.fromTo('.about-image-frame',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-image-frame', start: 'top 85%' },
          delay: 0.2
        }
      );

      gsap.fromTo('.philosophy-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.philosophy-card', start: 'top 85%' }
        }
      );

      gsap.fromTo('.about-subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-subtitle', start: 'top 85%' },
          delay: 0.4
        }
      );

      gsap.fromTo('.about-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-description', start: 'top 85%' },
          delay: 0.5
        }
      );

      gsap.fromTo('.about-signature',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-signature', start: 'top 85%' },
          delay: 0.6
        }
      );

      gsap.fromTo('.about-cta',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cta', start: 'top 85%' },
          delay: 0.7
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const philosophies = [
    {
      title: 'INTEGRITY',
      description: 'Create integrity and empower leaders in comfortability.'
    },
    {
      title: 'PURPOSE',
      description: 'Building innovation, purpose, and vision.'
    },
    {
      title: 'SERVICE',
      description: 'Focuses on service and serving every client community.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        {/* Section Label */}
        <div className="about-label mb-16 md:mb-20">
          <p
            className="text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            02 — About the Founder
          </p>
        </div>

        {/* TOP ROW: Image (left) + Philosophy Cards (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">

          {/* Left: Image */}
          <div className="about-image-frame">
            <div className="border border-[#282828]/20 p-2 md:p-3">
              <div className="overflow-hidden">
                <img
                  src="/banner.webp"
                  alt="Maud Berkx - Founder"
                  className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Right: Philosophy Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {philosophies.map((item, index) => (
                <div
                  key={index}
                  className="philosophy-card group border-t border-[#282828]/30 pt-6 hover:border-[#583929] transition-colors duration-500"
                >
                  <p
                    className="text-[#475D66] text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    Core Philosophies
                  </p>
                  <h4
                    className="text-[#282828] text-sm md:text-base font-semibold tracking-[0.1em] uppercase mb-3"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-[#453E33]/80 text-xs md:text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Text (left) + Signature & CTA (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: Text Content */}
          <div className="space-y-6">
            <p
              className="about-subtitle text-[#583929] text-base md:text-lg italic"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              The Grace Behind the Vision
            </p>

            <h2
              className="about-description text-[#282828] text-2xl md:text-3xl lg:text-[2rem] leading-[1.3] font-normal"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Maud Berkx is more than a strategist; she is a catalyst for enduring transformation. Rooted in wisdom and faith, her mission is to empower leaders to steward their influence with clarity, purpose, and profound grace.
            </h2>
          </div>

          {/* Right: Signature + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 lg:pt-12">

            <div className="about-signature">
              <p
                className="text-[#583929] text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: 'var(--font-signature), cursive' }}
              >
                Maud Berkx
              </p>
            </div>

            <a
              href="/about"
              className="about-cta group flex items-center gap-2 text-[#282828] text-sm md:text-base hover:text-[#583929] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              <span className="border-b border-[#282828]/50 group-hover:border-[#583929] transition-colors duration-300 pb-0.5">
                Discover the Journey.
              </span>
              <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}