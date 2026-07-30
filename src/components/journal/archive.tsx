'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

interface Article {
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

const ARTICLES: Article[] = [
  { category: 'Leadership', title: 'The Quiet Power of Kingdom Leadership', date: 'Jan 20, 2026', readTime: '9 min', image: '/wisdom-1.png', href: '/journal/article' },
  { category: 'Faith', title: 'Walking in Divine Timing: What to Act on and When', date: 'Jan 13, 2026', readTime: '7 min', image: '/about-4.png', href: '/journal/article' },
  { category: 'Stewardship', title: 'The Grace Stewards: Emerald for Editorial Essays', date: 'Jan 6, 2026', readTime: '11 min', image: '/about-3.png', href: '/journal/article' },
  { category: 'Legacy', title: 'Building Legacy Beyond Your Lifetime', date: 'Dec 30, 2025', readTime: '8 min', image: '/about-5.png', href: '/journal/article' },
  { category: 'Leadership', title: 'From Ambition to Stewardship', date: 'Dec 23, 2025', readTime: '6 min', image: '/wisdom-2.png', href: '/journal/article' },
  { category: 'Faith', title: 'Grace-Filled Decision Making', date: 'Dec 16, 2025', readTime: '10 min', image: '/wisdom-3.png', href: '/journal/article' },
  { category: 'Legacy', title: 'The Quiet Photograph of Editorial Essays', date: 'Dec 9, 2025', readTime: '5 min', image: '/about-1.png', href: '/journal/article' },
  { category: 'Stewardship', title: 'The Quiet Power of Kingdom Leaders, Essays', date: 'Dec 2, 2025', readTime: '9 min', image: '/about-4.png', href: '/journal/article' },
  { category: 'Leadership', title: 'The Quiet Power of Kingdom Leadership for Premiums', date: 'Nov 25, 2025', readTime: '12 min', image: '/wisdom-2.png', href: '/journal/article' },
];

export default function JournalArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [visibleCount, setVisibleCount] = useState(7);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const visibleArticles = ARTICLES.slice(0, visibleCount);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.ja-label',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(
        '.ja-heading-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.ja-heading', start: 'top 80%' } }
      );

      gsap.fromTo(
        '.ja-ornament',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)', delay: 0.3, scrollTrigger: { trigger: '.ja-heading', start: 'top 80%' } }
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rule = card.querySelector('.ja-card-rule');
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.1 + 0.25, scrollTrigger: { trigger: card, start: 'top 88%' } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, visibleCount]);

  const handleEnter = (i: number) => {
    if (prefersReducedMotion) return;
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card.querySelector('.ja-card-image'), { scale: 1.08, filter: 'grayscale(0%)', duration: 0.7, ease: 'power2.out' });
    gsap.to(card.querySelector('.ja-card-arrow'), { x: 4, opacity: 1, duration: 0.3, ease: 'power2.out' });
  };
  const handleLeave = (i: number) => {
    if (prefersReducedMotion) return;
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card.querySelector('.ja-card-image'), { scale: 1, filter: 'grayscale(65%)', duration: 0.7, ease: 'power2.out' });
    gsap.to(card.querySelector('.ja-card-arrow'), { x: 0, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} data-section-label="The Archive" className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden">

      {/* Subtle texture, same safe device used across the site */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#F6F6F60d 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <div className="text-center mb-8">
          <p
            className="ja-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            03 — The Archive
          </p>
          <h2
            className="ja-heading text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15]"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            <span className="block overflow-hidden">
              <span className="ja-heading-line block">
                Every essay, <span className="italic" style={{ color: GOLD }}>kept.</span>
              </span>
            </span>
          </h2>
          <div className="ja-ornament flex items-center justify-center gap-3 mt-8">
            <span className="block h-px w-12" style={{ backgroundColor: `${GOLD}80` }} />
            <span className="block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: GOLD }} />
            <span className="block h-px w-12" style={{ backgroundColor: `${GOLD}80` }} />
          </div>
        </div>

        <p
          className="text-[#DDD9CE]/50 text-sm text-center max-w-md mx-auto mb-16 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          {ARTICLES.length} essays and counting — new writing added as it&rsquo;s
          lived, not on a schedule.
        </p>

        {/* Bento grid — the first essay is a large spotlight card, giving
            the archive real hierarchy instead of nine identical boxes. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-16">
          {visibleArticles.map((article, i) => {
            const isSpotlight = i === 0;
            return (
              <a
                key={`${article.title}-${i}`}
                href={article.href}
                ref={(el) => {cardRefs.current[i] = el}}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                className={`group flex flex-col h-full ${
                  isSpotlight ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* flex-1 lets the image genuinely fill whatever height the
                    grid track gives this cell (crucial for the spotlight's
                    row-span-2 — a fixed height here is what left the gap). */}
                <div
                  className={`relative overflow-hidden mb-6 flex-1 ${
                    isSpotlight ? 'min-h-[20rem]' : 'min-h-[16rem]'
                  }`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="ja-card-image absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'grayscale(65%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/50 via-transparent to-transparent" />
                  {isSpotlight && (
                    <span
                      className="absolute top-5 left-5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] bg-[#F6F6F6] text-[#282828]"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      Latest
                    </span>
                  )}
                </div>

                <span
                  className="ja-card-rule block h-px w-10 mb-4 origin-left shrink-0"
                  style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
                />

                <div
                  className="inline-flex items-center gap-2 mb-4 px-3 py-1 border rounded-full self-start shrink-0"
                  style={{ borderColor: `${GOLD}50` }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: GOLD }} />
                  <span
                    className="text-[0.65rem] tracking-[0.18em] uppercase"
                    style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {article.category}
                  </span>
                </div>

                <h3
                  className={`text-[#F6F6F6] leading-snug mb-4 transition-colors duration-300 group-hover:text-[#DDD9CE] shrink-0 ${
                    isSpotlight ? 'text-2xl md:text-3xl' : 'text-xl md:text-[1.4rem]'
                  }`}
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  {article.title}
                </h3>

                <div className="flex items-center justify-between shrink-0">
                  <div
                    className="flex items-center gap-3 text-[#DDD9CE]/50 text-xs tracking-[0.05em]"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#DDD9CE]/30" />
                    <span>{article.readTime} read</span>
                  </div>
                  <ArrowUpRight size={16} className="ja-card-arrow text-[#DDD9CE]/60" style={{ opacity: 0.6 }} />
                </div>
              </a>
            );
          })}
        </div>

        {visibleCount < ARTICLES.length && (
          <div className="flex justify-center mt-16 md:mt-20">
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + 3, ARTICLES.length))}
              className="group inline-flex items-center gap-3 border border-[#DDD9CE]/25 px-8 py-3.5 rounded-full text-[#F6F6F6] text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#DDD9CE]/60"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Load More Essays
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}