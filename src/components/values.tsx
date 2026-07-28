'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#B08C5A';

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.values-label',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.values-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.values-heading', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.values-intro',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: '.values-heading', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.values-signature',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-signature', start: 'top 90%' },
        }
      );

      gsap.fromTo(
        '.values-cta',
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-cta', start: 'top 92%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const values = [
    {
      title: 'Integrity & Honor',
      description: 'Serving with an unwavering commitment to trust, discretion, and the highest ethical standards.',
    },
    {
      title: 'Visionary Stewardship',
      description: 'Developing enduring strategies that generate positive, lasting change for organizations and individuals.',
    },
    {
      title: 'Generational Impact',
      description: 'Empowering others with empathy, wisdom, and a vision for common good that spans generations.',
    },
    {
      title: 'Innovative Stewardship',
      description: 'Finding creative solutions while respecting resources and managing legacy with care.',
    },
    {
      title: 'Professional Excellence',
      description: 'Relentless dedication to mastery and quality in every facet of our work.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-section-label="Core Values"
      className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient background glow, echoing the gold light behind each card number */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${GOLD}1a, transparent 70%)`,
        }}
      />

      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">

        {/* Centered heading + intro */}
        <div className="values-heading text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2
            className="text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="values-heading-line block">Core Values</span>
            </span>
          </h2>
          <p
            className="values-intro text-[#DDD9CE]/70 text-sm md:text-base leading-relaxed mt-5"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Five commitments that shape every program, every conversation, and
            every client relationship — not aspirations, but the standard.
          </p>
        </div>

        {/* Card grid */}
        <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="value-card group relative border border-[#DDD9CE]/15 rounded-sm px-7 py-9 md:px-8 md:py-10 transition-colors duration-300 hover:border-[#B08C5A]/50"
              style={{ backgroundColor: '#2E2E2E' }}
            >
              {/* Glow behind the number */}
              <div
                className="absolute top-6 left-6 w-16 h-16 rounded-full pointer-events-none opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: `${GOLD}33` }}
              />

              <span
                className="relative block text-4xl md:text-5xl mb-6"
                style={{ color: GOLD, fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                0{i + 1}
              </span>

              <h3
                className="relative text-[#F6F6F6] text-xl md:text-2xl leading-snug mb-3"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {value.title}
              </h3>

              <p
                className="relative text-[#DDD9CE]/65 text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Signature and CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 md:pt-20">
          <p
            className="values-signature text-[#DDD9CE] text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-signature), cursive' }}
          >
            Maud Berkx
          </p>

          <a
            href="/values"
            className="values-cta group flex items-center gap-3 text-[#F6F6F6] text-sm md:text-base transition-colors duration-300 hover:text-[#DDD9CE]"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b border-[#F6F6F6]/50 pb-0.5 transition-colors duration-300 group-hover:border-[#DDD9CE]">
              Learn More about Our Approach
            </span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}