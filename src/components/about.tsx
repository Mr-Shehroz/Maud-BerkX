'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Same gold hairline used across the site — the recurring "legacy line" signature.
const GOLD = '#B08C5A';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const goldVertRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.about-reveal, .about-pull-line, .about-philosophy-item', {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        gsap.set(imageWrapRef.current, { clipPath: 'inset(0 0 0% 0)' });
        return;
      }

      gsap.fromTo(
        '.about-label',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Image: curtain wipe reveal, then a slow drift for the rest of the
      // section's scroll life (works nicely alongside the CSS sticky pin).
      if (imageWrapRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.3,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
          }
        );
        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (goldVertRef.current) {
        gsap.fromTo(
          goldVertRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'top center',
            delay: 0.3,
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
          }
        );
      }

      gsap.fromTo(
        captionRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
        }
      );

      // Drop cap settles a beat before the rest of the quote
      gsap.fromTo(
        '.about-drop-cap',
        { opacity: 0, y: -8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.about-pull-quote', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.about-pull-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 0.15,
          scrollTrigger: { trigger: '.about-pull-quote', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.about-eyebrow-quote',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-pull-quote', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.about-expand',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-expand', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.about-signature',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-signature', start: 'top 88%' },
        }
      );

      gsap.fromTo(
        '.about-philosophy-divider',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.about-philosophy-row', start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.about-philosophy-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: '.about-philosophy-row', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.about-cta',
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cta', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const philosophies = [
    { title: 'Integrity', description: 'Create integrity and empower leaders in comfortability.' },
    { title: 'Purpose', description: 'Building innovation, purpose, and vision.' },
    { title: 'Service', description: 'Focuses on service and serving every client community.' },
  ];

  return (
    <section
      ref={sectionRef}
      data-section-label="About the Founder"
      className="relative bg-[#F6F6F6] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <p
          className="about-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-16 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          02 — About the Founder
        </p>

        {/* Left column stays put (position: sticky) while the right column
            scrolls past it — the reason this needs to be its own grid rather
            than items-start / items-center. */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-24">

          {/* Left: pinned image */}
          <div className="relative lg:sticky lg:top-28 self-start h-fit">
            <div
              ref={imageWrapRef}
              className="relative h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden"
            >
              <div ref={imageInnerRef} className="absolute inset-[-4%]">
                <img
                  src="/banner.webp"
                  alt="Maud Berkx — Founder"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <span
              ref={goldVertRef}
              className="hidden lg:block absolute top-0 -right-8 w-px h-full origin-top"
              style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
            />
            <div ref={captionRef} className="mt-5">
              <p
                className="text-[#282828] text-sm tracking-[0.1em] uppercase"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Maud Berkx
              </p>
              <p
                className="text-[#453E33]/70 text-xs mt-1 italic"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Founder &amp; Kingdom Legacy Strategist
              </p>
            </div>
          </div>

          {/* Right: the story scrolls past the pinned image */}
          <div className="relative pt-2 lg:pt-6">
            <p
              className="about-eyebrow-quote text-[#583929] text-base md:text-lg italic mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              The Grace Behind the Vision
            </p>

            <div
              className="about-pull-quote relative text-[#282828] text-2xl md:text-[1.9rem] lg:text-[2.15rem] leading-[1.4] font-normal"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="about-pull-line block">
                  <span
                    className="about-drop-cap float-left mr-2 leading-[0.85] text-[#583929]"
                    style={{ fontSize: '4.2rem' }}
                  >
                    M
                  </span>
                  aud Berkx is more than a strategist;
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-pull-line block">she is a catalyst for enduring transformation.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-pull-line block">Rooted in wisdom and faith, her mission is to</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-pull-line block">empower leaders to steward their influence with</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-pull-line block">clarity, purpose, and profound grace.</span>
              </span>
            </div>

            {/* Short expansion paragraph — gives the sticky image time to
                breathe as the reader keeps scrolling. */}
            <p
              className="about-expand mt-8 text-[#453E33]/80 text-sm md:text-base leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Her work sits at the intersection of conviction and craft — helping
              women build something that outlasts trend and circumstance: a life,
              and a leadership, built to hold weight.
            </p>

            <p
              className="about-signature mt-10 text-[#583929] text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-signature), cursive' }}
            >
              Maud Berkx
            </p>

            {/* Philosophies */}
            <div className="about-philosophy-row relative mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3">
              {philosophies.map((item, index) => (
                <div key={item.title} className="relative py-6 sm:py-0 sm:px-6 lg:px-8 first:pl-0 last:pr-0">
                  {index !== 0 && (
                    <span
                      className="about-philosophy-divider hidden sm:block absolute left-0 top-0 h-full w-px origin-top"
                      style={{ backgroundColor: '#282828', opacity: 0.12, transform: 'scaleY(0)' }}
                    />
                  )}
                  <div className="about-philosophy-item group">
                    <h4
                      className="text-[#282828] text-sm md:text-base font-semibold tracking-[0.15em] uppercase mb-3 transition-[letter-spacing] duration-300 group-hover:tracking-[0.22em]"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {item.title}
                    </h4>
                    <span
                      className="block h-px w-8 mb-4 transition-all duration-300 group-hover:w-12"
                      style={{ backgroundColor: GOLD }}
                    />
                    <p
                      className="text-[#453E33]/80 text-sm leading-relaxed max-w-xs"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 md:mt-16">
              <a
                href="/about"
                className="about-cta group inline-flex items-center gap-2 text-[#282828] text-sm md:text-base transition-colors duration-300 hover:text-[#583929]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="border-b border-[#282828]/50 pb-0.5 transition-colors duration-300 group-hover:border-[#583929]">
                  Discover the Journey.
                </span>
                <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}