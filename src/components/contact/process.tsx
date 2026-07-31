'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

const STEPS = [
  {
    number: '01',
    title: 'Your Message Arrives',
    body: 'Every inquiry is read personally — never filtered through an inbox assistant or automated reply.',
  },
  {
    number: '02',
    title: 'A Personal Reply',
    body: 'Within a few days, you\u2019ll hear back directly from Maud, with thoughtful next steps suited to what you shared.',
  },
  {
    number: '03',
    title: 'A Discovery Conversation',
    body: 'For mentorship inquiries, a brief call follows — unhurried, and focused on whether the fit is right on both sides.',
  },
  {
    number: '04',
    title: 'A Tailored Path Forward',
    body: 'If it\u2019s a fit, the next steps are shaped around your season, your goals, and the legacy you\u2019re building.',
  },
];

export default function ContactProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.cp-label',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );

      gsap.fromTo(
        '.cp-heading-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.cp-heading', start: 'top 85%' } }
      );

      gsap.utils.toArray<HTMLElement>('.cp-step').forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.cp-grid', start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        <div className="max-w-2xl mb-16 md:mb-20">
          <p
            className="cp-label text-[#453E33]/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            03 — What Happens Next
          </p>
          <h2
            className="cp-heading text-[#282828] text-3xl md:text-5xl font-normal leading-[1.2]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="cp-heading-line block">A considered process,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="cp-heading-line block italic" style={{ color: GOLD }}>from first message to first call.</span>
            </span>
          </h2>
        </div>

        <div className="cp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="cp-step">
              <p
                className="text-4xl md:text-5xl mb-5"
                style={{ color: GOLD, fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {step.number}
              </p>
              <h3
                className="text-[#282828] text-xl md:text-2xl italic mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[#453E33]/65 text-sm md:text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}