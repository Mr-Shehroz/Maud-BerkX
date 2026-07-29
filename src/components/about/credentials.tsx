'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const DARK = '#282828';

export default function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counted, setCounted] = useState(false);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stats = [
    { value: 14, suffix: '+', label: 'Years in Practice' },
    { value: 30, suffix: '+', label: 'Countries Reached' },
    { value: 500, suffix: '+', label: 'Women Mentored' },
    { value: 12, suffix: '', label: 'Published Works' },
  ];

  const credentials = [
    { title: 'Certified Executive Coach', body: 'International Coaching Federation (ICF), PCC Credential' },
    { title: 'M.A. in Organizational Leadership', body: 'Fuller Theological Seminary' },
    { title: "Board Certified Mentor', body: 'Global Women's Leadership Alliance" },
    { title: 'Ordained Ministry Leader', body: 'Kingdom Legacy Collective, Founding Chapter' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo('.cr-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      
      gsap.fromTo('.cr-heading-line', { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.cr-heading', start: 'top 80%' } });
      
      gsap.fromTo('.cr-stats', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.cr-stats', start: 'top 75%', onEnter: () => setCounted(true) } });
      
      gsap.fromTo('.cr-cred-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.cr-credentials', start: 'top 85%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!counted || prefersReducedMotion) {
      if (prefersReducedMotion) {
        statRefs.current.forEach((el, i) => { if (el) el.textContent = String(stats[i].value); });
      }
      return;
    }
    statRefs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stats[i].value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = String(Math.round(obj.val)); },
      });
    });
  }, [counted, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-[#F6F6F6] py-28 md:py-36 lg:py-44 overflow-hidden">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">

        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <p className="cr-label text-[#C5A065] text-xs tracking-[0.35em] uppercase mb-6" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
            04 — Credentials
          </p>
          <div className="cr-heading max-w-3xl mx-auto">
            <h2 className="text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2]" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
              <span className="block overflow-hidden">
                <span className="cr-heading-line block">A record built on</span>
              </span>
              <span className="block overflow-hidden">
                <span className="cr-heading-line block italic" style={{ color: GOLD }}>substance, not spectacle.</span>
              </span>
            </h2>
          </div>
        </div>

        {/* STATS - Clean 4-column layout */}
        <div className="cr-stats grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mb-24 md:mb-20">
          {stats.map((stat, i) => (
            <div key={stat.label} className="cr-stat text-center">
              <p className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none mb-3 tabular-nums" style={{ color: DARK, fontFamily: 'var(--font-eb-garamond), serif' }}>
                <span ref={(el) => { statRefs.current[i] = el; }}>0</span>
                <span className="text-[#C5A065]" style={{ fontSize: '0.7em' }}>{stat.suffix}</span>
              </p>
              <p className="text-[#453E33]/70 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CREDENTIALS - 2-column grid with dividers */}
        <div className="cr-credentials max-w-[1500px] mx-auto">
          <div className="space-y-0">
            {credentials.map((cred, index) => (
              <div
                key={cred.title}
                className="cr-cred-item grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 py-6 border-t border-[#282828]/10 first:border-t-0"
              >
                <h3 className="text-[#282828] text-lg md:text-xl font-medium" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
                  {cred.title}
                </h3>
                <p className="text-[#453E33]/60 text-sm md:text-base" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                  {cred.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}