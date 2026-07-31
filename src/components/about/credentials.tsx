'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const BROWN = '#583929';
const DARK = '#282828';

export default function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const goldLineRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const plaqueRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statBoxRefs = useRef<Array<HTMLDivElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stats = [
    { value: 14, suffix: '+', label: 'Years' },
    { value: 30, suffix: '+', label: 'Countries' },
    { value: 500, suffix: '+', label: 'Women of Influence' },
    { value: 12, suffix: '', label: 'Books Published' },
  ];

  const credentials = [
    { title: 'Certified Executive Coach', body: 'International Coaching Federation (ICF), PCC Credential' },
    { title: 'M.A. in Organizational Leadership', body: 'Fuller Theological Seminary' },
    { title: 'Board Certified Mentor', body: "Global Women's Leadership Alliance" },
    { title: 'Ordained Ministry Leader', body: 'Kingdom Legacy Collective, Founding Chapter' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        statRefs.current.forEach((el, i) => {
          if (el) el.textContent = String(stats[i].value);
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })
        .from(headingRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'left center' },
          '-=0.5'
        )
        .from('.cr-sub-copy', { opacity: 0, y: 16, duration: 0.7 }, '-=0.6');

      gsap.fromTo(
        '.cr-col-label',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.cr-columns', start: 'top 84%' } }
      );

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            transformOrigin: 'top center',
            scrollTrigger: { trigger: '.cr-columns', start: 'top 78%' },
          }
        );
      }

      // Left column — credential plaques
      plaqueRefs.current.forEach((plaque, i) => {
        if (!plaque) return;
        const corners = plaque.querySelectorAll('.plaque-corner');
        const seal = plaque.querySelector('.plaque-seal');
        gsap.fromTo(
          plaque,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.cr-columns', start: 'top 80%' },
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
            scrollTrigger: { trigger: '.cr-columns', start: 'top 80%' },
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
              scrollTrigger: { trigger: '.cr-columns', start: 'top 80%' },
            }
          );
        }
      });

      // Right column — stat cards (2x2 grid)
      statBoxRefs.current.forEach((box, i) => {
        if (!box) return;
        gsap.fromTo(
          box,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: '.cr-stats-grid',
              start: 'top 82%',
              onEnter: () => {
                const el = statRefs.current[i];
                if (!el) return;
                const target = stats[i].value;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: target,
                  duration: 1.6,
                  ease: 'power2.out',
                  delay: i * 0.1 + 0.1,
                  onUpdate: () => {
                    el.textContent = String(Math.round(obj.val));
                  },
                });
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handlePlaqueEnter = (i: number) => {
    if (prefersReducedMotion) return;
    const el = plaqueRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      y: -8,
      scale: 1.01,
      boxShadow: `0 40px 65px -22px rgba(88,57,41,0.4), inset 0 0 0 1px ${GOLD}70`,
      duration: 0.45,
      ease: 'power2.out',
    });
    gsap.to(el.querySelectorAll('.plaque-corner'), { width: 44, height: 44, duration: 0.45, ease: 'power2.out' });
  };
  const handlePlaqueLeave = (i: number) => {
    if (prefersReducedMotion) return;
    const el = plaqueRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      y: 0,
      scale: 1,
      boxShadow: `0 20px 42px -26px rgba(88,57,41,0.24), inset 0 0 0 1px rgba(197,160,101,0.18)`,
      duration: 0.45,
      ease: 'power2.out',
    });
    gsap.to(el.querySelectorAll('.plaque-corner'), { width: 26, height: 26, duration: 0.45, ease: 'power2.out' });
  };

  const handleStatEnter = (i: number) => {
    if (prefersReducedMotion) return;
    const el = statBoxRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      y: -6,
      scale: 1.02,
      boxShadow: `0 26px 44px -18px rgba(88,57,41,0.35), inset 0 0 0 1px ${GOLD}70`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  const handleStatLeave = (i: number) => {
    if (prefersReducedMotion) return;
    const el = statBoxRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      y: 0,
      scale: 1,
      boxShadow: `0 14px 30px -20px rgba(88,57,41,0.18), inset 0 0 0 1px rgba(197,160,101,0.18)`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="relative bg-[#F6F6F6] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${BROWN}0d 0%, transparent 60%),
                       radial-gradient(ellipse 60% 50% at 100% 100%, ${GOLD}0a 0%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(${DARK}08 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">

        {/* ───────── Intro block ───────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span
            ref={eyebrowRef}
            className="block text-xs md:text-sm tracking-[0.25em] uppercase mb-3 md:mb-4"
            style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            — Credentials
          </span>

          <h2
            ref={headingRef}
            className="text-[#282828] text-3xl md:text-5xl lg:text-6xl font-normal mb-5 md:mb-6 leading-[1.15]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            A record shaped by faithful, steady work.
          </h2>

          <span
            ref={goldLineRef}
            className="block h-px w-12 md:w-16 mb-6 md:mb-7 mx-auto origin-left"
            style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
          />

          <p
            className="cr-sub-copy text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            14+ years, across 30+ countries — walking alongside 500+ women of
            influence, and putting pen to paper 12 times.
          </p>
        </div>

        {/* ───────── Two columns: credentials (left) / stats (right) ───────── */}
        <div className="cr-columns relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 lg:gap-16 items-start">

          <div
            ref={dividerRef}
            className="hidden md:block absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px origin-top"
            style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}55 15%, ${GOLD}55 85%, transparent)` }}
            aria-hidden
          />

          {/* LEFT — Credential plaques */}
          <div>
            <p
              className="cr-col-label text-xs tracking-[0.28em] uppercase mb-6 md:mb-7 pl-1"
              style={{ color: `${BROWN}b0`, fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Credentials &amp; Ordination
            </p>

            <div className="flex flex-col gap-5 md:gap-6">
              {credentials.map((cred, i) => (
                <div
                  key={cred.title}
                  ref={(el) => { plaqueRefs.current[i] = el }}
                  onMouseEnter={() => handlePlaqueEnter(i)}
                  onMouseLeave={() => handlePlaqueLeave(i)}
                  className="relative px-8 pt-8 pb-9 md:px-10 md:pt-9 md:pb-11 transition-transform"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 100%)',
                    boxShadow: `0 20px 42px -26px rgba(88,57,41,0.24), inset 0 0 0 1px rgba(197,160,101,0.18)`,
                  }}
                >
                  <span
                    className="absolute top-0 left-0 w-14 h-[2px]"
                    style={{ background: `linear-gradient(to right, ${BROWN}, ${GOLD})` }}
                  />
                  <span className="plaque-corner absolute -top-1 -left-1 w-[26px] h-[26px] border-t-2 border-l-2" style={{ borderColor: GOLD }} />
                  <span className="plaque-corner absolute -bottom-1 -right-1 w-[26px] h-[26px] border-b-2 border-r-2" style={{ borderColor: GOLD }} />

                  <span
                    className="plaque-seal absolute top-6 right-7 w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${GOLD}22, transparent 70%)`,
                      border: `1px solid ${GOLD}90`,
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[0.6rem] tracking-widest"
                      style={{ border: `1px solid ${GOLD}50`, color: BROWN, fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      MB
                    </span>
                  </span>

                  <span
                    className="block text-[0.65rem] tracking-[0.25em] uppercase mb-2"
                    style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3
                    className="text-[#282828] text-xl md:text-2xl italic mb-3 pr-14 leading-snug"
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

          {/* RIGHT — Compact 2x2 stat grid, sized to its own content */}
          <div>
            <p
              className="cr-col-label text-xs tracking-[0.28em] uppercase mb-6 md:mb-7 pl-1"
              style={{ color: `${BROWN}b0`, fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              By the Numbers
            </p>

            <div className="cr-stats-grid grid grid-cols-2 gap-5 md:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statBoxRefs.current[i] = el }}
                  onMouseEnter={() => handleStatEnter(i)}
                  onMouseLeave={() => handleStatLeave(i)}
                  className="relative px-6 py-7 md:px-7 md:py-8 flex flex-col items-center justify-center text-center gap-2.5 transition-transform"
                  style={{
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 100%)',
                    boxShadow: `0 14px 30px -20px rgba(88,57,41,0.18), inset 0 0 0 1px rgba(197,160,101,0.18)`,
                  }}
                >
                  <span
                    className="absolute top-0 left-0 w-9 h-[2px]"
                    style={{ background: `linear-gradient(to right, ${BROWN}, ${GOLD})` }}
                  />

                  <p
                    className="tabular-nums leading-none"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif', color: BROWN }}
                  >
                    <span className="text-3xl md:text-[2.5rem] font-normal">
                      <span ref={(el) => { statRefs.current[i] = el }}>0</span>
                      {stat.suffix}
                    </span>
                  </p>

                  <span
                    className="block w-5 h-px"
                    style={{ backgroundColor: `${GOLD}70` }}
                    aria-hidden
                  />

                  <p
                    className="text-[#453E33]/60 text-[0.65rem] md:text-xs tracking-[0.16em] uppercase leading-snug"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Fills the remaining vertical space beside the taller credentials list
                without stretching the stat cards themselves */}
            <div
              className="mt-6 md:mt-8 px-7 py-6 md:py-7 relative"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
                boxShadow: `inset 0 0 0 1px rgba(197,160,101,0.15)`,
              }}
            >
              <span
                className="absolute top-0 left-0 w-9 h-[2px]"
                style={{ background: `linear-gradient(to right, ${BROWN}, ${GOLD})` }}
              />
              <p
                className="text-[#453E33]/60 text-xs md:text-sm italic leading-relaxed"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                &ldquo;Every number here represents a room she chose to walk into —
                and a woman who left it steadier than she found it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}