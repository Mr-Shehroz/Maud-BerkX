'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const DARK = '#282828';

export default function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const plaqueRefs = useRef<Array<HTMLDivElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sentence: Array<
    | { type: 'text'; content: string }
    | { type: 'stat'; value: number; suffix: string }
  > = [
    { type: 'text', content: 'A record shaped over ' },
    { type: 'stat', value: 14, suffix: '+' },
    { type: 'text', content: ' years, across ' },
    { type: 'stat', value: 30, suffix: '+' },
    { type: 'text', content: ' countries — walking alongside ' },
    { type: 'stat', value: 500, suffix: '+' },
    { type: 'text', content: ' women of influence, and putting pen to paper ' },
    { type: 'stat', value: 12, suffix: '' },
    { type: 'text', content: ' times.' },
  ];

  const credentials = [
    { title: 'Certified Executive Coach', body: 'International Coaching Federation (ICF), PCC Credential' },
    { title: 'M.A. in Organizational Leadership', body: 'Fuller Theological Seminary' },
    { title: 'Board Certified Mentor', body: "Global Women's Leadership Alliance" },
    { title: 'Ordained Ministry Leader', body: 'Kingdom Legacy Collective, Founding Chapter' },
  ];

  const statIndices = sentence
    .map((part, i) => (part.type === 'stat' ? i : -1))
    .filter((i) => i !== -1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        statRefs.current.forEach((el, i) => {
          if (el) el.textContent = String((sentence[statIndices[i]] as any).value);
        });
        return;
      }

      gsap.fromTo(
        '.cr-label',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(
        '.cr-ornament',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)', delay: 0.4, scrollTrigger: { trigger: '.cr-sentence', start: 'top 75%' } }
      );

      gsap.fromTo(
        '.cr-sentence',
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cr-sentence',
            start: 'top 75%',
            onEnter: () => {
              statRefs.current.forEach((el, i) => {
                if (!el) return;
                const target = (sentence[statIndices[i]] as any).value;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: target,
                  duration: 1.8,
                  ease: 'power2.out',
                  delay: 0.3,
                  onUpdate: () => {
                    el.textContent = String(Math.round(obj.val));
                  },
                });
              });
            },
          },
        }
      );

      // (gold rule removed — replaced by the ornamental divider below)

      gsap.fromTo(
        '.cr-sub-label',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.cr-plaques', start: 'top 85%' } }
      );

      plaqueRefs.current.forEach((plaque, i) => {
        if (!plaque) return;
        const corners = plaque.querySelectorAll('.plaque-corner');
        const seal = plaque.querySelector('.plaque-seal');
        gsap.fromTo(
          plaque,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.cr-plaques', start: 'top 82%' },
          }
        );
        gsap.fromTo(
          corners,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            delay: i * 0.1 + 0.3,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: '.cr-plaques', start: 'top 82%' },
          }
        );
        if (seal) {
          gsap.fromTo(
            seal,
            { opacity: 0, rotate: -8, scale: 0.85 },
            {
              opacity: 1,
              rotate: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: i * 0.1 + 0.35,
              scrollTrigger: { trigger: '.cr-plaques', start: 'top 82%' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleEnter = (i: number) => {
    if (prefersReducedMotion) return;
    const el = plaqueRefs.current[i];
    if (!el) return;
    gsap.to(el, { y: -6, boxShadow: '0 30px 55px -20px rgba(40,40,40,0.28)', duration: 0.4, ease: 'power2.out' });
    gsap.to(el.querySelectorAll('.plaque-corner'), { width: 40, height: 40, duration: 0.4, ease: 'power2.out' });
  };
  const handleLeave = (i: number) => {
    if (prefersReducedMotion) return;
    const el = plaqueRefs.current[i];
    if (!el) return;
    gsap.to(el, { y: 0, boxShadow: '0 18px 36px -22px rgba(40,40,40,0.16)', duration: 0.4, ease: 'power2.out' });
    gsap.to(el.querySelectorAll('.plaque-corner'), { width: 24, height: 24, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} className="relative bg-[#F6F6F6] py-28 md:py-36 lg:py-44 overflow-hidden">

      {/* Subtle texture instead of a giant watermark — adds richness with
          zero risk of overlapping real content. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${DARK}0d 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12">

        <p
          className="cr-label text-center text-[#C5A065] text-xs tracking-[0.35em] uppercase mb-10 md:mb-14"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          04 — Credentials
        </p>

        <p
          className="cr-sentence text-center leading-[1.35] mb-8"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          {(() => {
            let statCursor = -1;
            return sentence.map((part, i) => {
              if (part.type === 'text') {
                return (
                  <span key={i} className="text-2xl md:text-3xl lg:text-4xl align-middle" style={{ color: DARK }}>
                    {part.content}
                  </span>
                );
              }
              statCursor += 1;
              const idx = statCursor;
              return (
                <span
                  key={i}
                  className="tabular-nums align-middle text-4xl md:text-5xl lg:text-6xl font-normal mx-1"
                  style={{ color: GOLD }}
                >
                  <span ref={(el) => {statRefs.current[idx] = el}}>0</span>
                  {part.suffix}
                </span>
              );
            });
          })()}
        </p>

        <div className="cr-ornament flex items-center justify-center gap-3 mb-20 md:mb-28">
          <span className="block h-px w-12" style={{ backgroundColor: `${GOLD}80` }} />
          <span className="block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: GOLD }} />
          <span className="block h-px w-12" style={{ backgroundColor: `${GOLD}80` }} />
        </div>

        <p
          className="cr-sub-label text-center text-[#453E33]/50 text-xs tracking-[0.3em] uppercase mb-12 md:mb-16"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Selected Recognitions
        </p>

        {/* CREDENTIALS — certificate plaques with real surface (card,
            shadow, hover lift) instead of brackets floating in empty
            space, and no large vertical stagger creating dead air. */}
        <div className="cr-plaques grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {credentials.map((cred, i) => (
            <div
              key={cred.title}
              ref={(el) => {plaqueRefs.current[i] = el}}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              className="relative bg-white/80 px-8 pt-8 pb-9 md:px-10 md:pt-9 md:pb-11"
              style={{ boxShadow: '0 18px 36px -22px rgba(40,40,40,0.16)' }}
            >
              <span className="absolute top-0 left-0 w-10 h-[3px]" style={{ backgroundColor: GOLD }} />
              <span className="plaque-corner absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: GOLD }} />
              <span className="plaque-corner absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: GOLD }} />

              {/* Seal mark — the "flourish" that was missing */}
              <span
                className="plaque-seal absolute top-6 right-7 w-9 h-9 rounded-full border flex items-center justify-center text-[0.65rem] tracking-widest"
                style={{ borderColor: `${GOLD}80`, color: GOLD, fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                MB
              </span>

              <h3
                className="text-[#282828] text-xl md:text-2xl italic mb-3 pr-12"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {cred.title}
              </h3>
              <p
                className="text-[#453E33]/60 text-xs md:text-sm tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {cred.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}