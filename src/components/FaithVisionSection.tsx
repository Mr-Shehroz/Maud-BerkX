'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#B08C5A';
const BROWN = '#583929';

export default function FaithVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const goldVertRef = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const chapters = [
    {
      roman: 'I',
      year: '2012',
      title: 'The Foundation',
      desc: 'A vision of purposeful leadership takes root — the first seeds of a calling that would grow into a life\u2019s work.',
      quote: '“Every legacy begins as a whisper before it becomes a voice.”',
      img: '/about-4.png',
    },
    {
      roman: 'II',
      year: '2018',
      title: 'Deepening Faith',
      desc: 'Wisdom becomes the core. The Kingdom focus emerges as the true north of every decision made from here forward.',
      quote: '“Faith did not change the direction — it became the compass.”',
      img: '/about-1.png',
    },
    {
      roman: 'III',
      year: '2023',
      title: 'Expanding Impact',
      desc: 'The global community finds leadership with grace, carrying the work across continents and cultures.',
      quote: '“Influence, rightly stewarded, has no borders.”',
      img: '/about-3.png',
    },
    {
      roman: 'IV',
      year: '2026',
      title: 'Kingdom Legacy',
      desc: 'Vision and wisdom are codified for future generations — a legacy built to hold weight long after today.',
      quote: '“What is built to last is never built alone.”',
      img: '/about-5.png',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fv-label',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.fv-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.fv-heading', start: 'top 82%' },
        }
      );

      // The book spine draws down through the whole chapters block
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.chapters-list',
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.chapter-row').forEach((row) => {
        const isLeft = row.dataset.side === 'left';

        gsap.fromTo(
          row.querySelector('.chapter-image-wrap'),
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: row, start: 'top 78%' },
          }
        );

        gsap.fromTo(
          row.querySelector('.chapter-roman'),
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: row, start: 'top 78%' },
          }
        );

        gsap.fromTo(
          [
            row.querySelector('.chapter-title'),
            row.querySelector('.chapter-desc'),
            row.querySelector('.chapter-quote'),
            row.querySelector('.chapter-footer'),
          ],
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: { trigger: row, start: 'top 78%' },
          }
        );

        gsap.fromTo(
          row.querySelector('.chapter-rule'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.out',
            transformOrigin: isLeft ? 'left center' : 'right center',
            scrollTrigger: { trigger: row, start: 'top 78%' },
          }
        );

        // Node on the spine lights up as its chapter arrives
        gsap.fromTo(
          row.querySelector('.chapter-node'),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: row, start: 'top 75%' },
          }
        );
      });

      // Quote/vision image
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
          { scale: 1.15, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '.quote-section',
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
        '.quote-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1, stagger: 0.14, ease: 'expo.out',
          scrollTrigger: { trigger: '.quote-content', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.quote-signature',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.quote-signature', start: 'top 88%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} data-section-label="Faith & Vision" className="relative bg-[#F6F6F6] overflow-hidden">
      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-[50px] md:py-[80px] lg:py-[100px]">

        <p
          className="fv-label text-center text-[#453E33]/55 text-xs md:text-sm tracking-[0.28em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Faith &amp; Vision
        </p>

        <div className="fv-heading text-center mb-8">
          <h2
            className="text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="fv-heading-line block">Four chapters, one calling.</span>
            </span>
          </h2>
        </div>

        <p
          className="text-center text-[#453E33]/70 text-sm md:text-base max-w-lg mx-auto mb-24 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Fourteen years of quiet conviction, told the way it was lived — not as a chart of
          dates, but as a story still being written.
        </p>

        {/* CHAPTERS — image + text spreads, tied together by a single
            gold "book spine" running down the center. */}
        <div className="chapters-list relative">
          {/* Book spine — the connective device that replaces a timeline
              line, but reads as binding a book rather than plotting dates */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-[#282828]/8">
            <div
              ref={spineRef}
              className="absolute inset-0 w-full origin-top"
              style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
            />
          </div>

          <div className="space-y-24 md:space-y-32">
            {chapters.map((c, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={c.year}
                  data-side={isLeft ? 'left' : 'right'}
                  className={`chapter-row relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                    isLeft ? '' : 'md:[direction:rtl]'
                  }`}
                >
                  {/* Node on the spine */}
                  <span
                    className="chapter-node hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                    style={{ backgroundColor: GOLD, boxShadow: `0 0 0 5px #F6F6F6` }}
                  />

                  {/* Photograph */}
                  <div className="relative md:[direction:ltr]">
                    <div className="chapter-image-wrap relative h-[320px] md:h-[600px] overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full h-full object-cover object-[center_12%] grayscale"
                      />
                    </div>
                    <span
                      className="absolute -top-4 -left-4 md:-top-5 md:-left-5 text-7xl md:text-8xl leading-none select-none"
                      style={{
                        fontFamily: 'var(--font-eb-garamond), serif',
                        color: 'transparent',
                        WebkitTextStroke: `1.5px ${GOLD}`,
                      }}
                      aria-hidden
                    >
                      {c.roman}
                    </span>
                  </div>

                  {/* Copy */}
                  <div className={`relative md:[direction:ltr] max-w-xl ${isLeft ? '' : 'md:ml-auto'}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="chapter-roman inline-flex items-center justify-center w-11 h-11 rounded-full border shrink-0"
                        style={{ borderColor: `${GOLD}80`, color: GOLD, fontFamily: 'var(--font-eb-garamond), serif', fontSize: '1.05rem' }}
                      >
                        {c.roman}
                      </span>
                      <p
                        className="text-2xl md:text-3xl tabular-nums"
                        style={{ color: BROWN, fontFamily: 'var(--font-eb-garamond), serif' }}
                      >
                        {c.year}
                      </p>
                    </div>

                    <h3
                      className="chapter-title text-[#282828] text-3xl md:text-4xl leading-tight mb-5"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      {c.title}
                    </h3>

                    <span
                      className="chapter-rule block h-px w-14 mb-5 origin-left"
                      style={{ backgroundColor: GOLD }}
                    />

                    <p
                      className="chapter-desc text-[#453E33]/75 text-base md:text-lg leading-relaxed mb-6"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {c.desc}
                    </p>

                    <p
                      className="chapter-quote text-lg md:text-xl italic leading-snug mb-8"
                      style={{ color: BROWN, fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      {c.quote}
                    </p>

                    <div className="chapter-footer flex items-center gap-3">
                      <span className="h-px w-8" style={{ backgroundColor: `${GOLD}55` }} />
                      <span
                        className="text-xs tracking-[0.2em] uppercase text-[#453E33]/45"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        Chapter {c.roman} — p. {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}