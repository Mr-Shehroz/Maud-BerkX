'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function FeaturedArticle() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const goldVertRef = useRef<HTMLSpanElement>(null);
  const readBtnRef = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const article = {
    category: 'Leadership',
    title: 'The Quiet Power of Kingdom Leadership',
    excerpt:
      'What it means to lead with quiet confidence — rooted not in visibility or applause, but in a conviction that outlasts both. A look at the difference between influence that is stewarded and influence that is merely performed.',
    author: 'Maud Berkx',
    date: 'January 20, 2026',
    readTime: '9 min read',
    image: '/wisdom-1.png',
    href: '/journal/article',
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.fa-label',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

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
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
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
        '.fa-corner',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.6,
          ease: 'back.out(2.5)',
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.fa-tag',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.fa-content', start: 'top 82%' } }
      );

      gsap.fromTo(
        '.fa-heading-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.13,
          ease: 'expo.out',
          delay: 0.15,
          scrollTrigger: { trigger: '.fa-content', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.fa-excerpt',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: '.fa-content', start: 'top 82%' } }
      );

      gsap.fromTo(
        '.fa-meta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4, scrollTrigger: { trigger: '.fa-content', start: 'top 82%' } }
      );

      gsap.fromTo(
        '.fa-cta',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.5, scrollTrigger: { trigger: '.fa-content', start: 'top 82%' } }
      );

      gsap.fromTo(
        '.fa-ghost-num',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.fa-content', start: 'top 82%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleImageEnter = () => {
    if (prefersReducedMotion) return;
    gsap.to(imageInnerRef.current, { scale: 1.06, duration: 0.6, ease: 'power2.out' });
    gsap.to(readBtnRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
  };
  const handleImageLeave = () => {
    if (prefersReducedMotion) return;
    gsap.to(imageInnerRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' });
    gsap.to(readBtnRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' });
  };

  return (
    <section ref={sectionRef} data-section-label="Editor's Pick" className="relative bg-[#F6F6F6] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden">

      {/* Subtle texture — same safe device used on Journal Hero/Credentials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#2828280d 1px, transparent 1px)`, backgroundSize: '30px 30px', opacity: 0.6 }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <p
          className="fa-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-16 md:mb-20"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          — Editor&rsquo;s Pick
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">

          {/* Image — framed with gold corner brackets + real shadow,
              hover reveals a "Read" button, same as a physical featured
              plate rather than a flat photo. */}
          <div className="relative order-2 lg:order-1">
            <a
              href={article.href}
              onMouseEnter={handleImageEnter}
              onMouseLeave={handleImageLeave}
              className="block relative"
            >
              <div
                ref={imageWrapRef}
                className="relative h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden"
                style={{ boxShadow: '0 40px 80px -30px rgba(40,40,40,0.35)' }}
              >
                <div ref={imageInnerRef} className="absolute inset-[-4%]">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute inset-0 bg-[#282828]/0 transition-colors duration-500" />

                {/* Hover "read" button */}
                <span
                  ref={readBtnRef}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#F6F6F6] flex items-center justify-center opacity-0"
                  style={{ transform: 'translate(-50%, -50%) scale(0.8)' }}
                >
                  <ArrowUpRight size={22} className="text-[#282828]" />
                </span>
              </div>

              {/* Corner brackets — same language as Credentials plaques */}
              <span className="fa-corner absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: GOLD }} />
              <span className="fa-corner absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: GOLD }} />
            </a>

            <span
              ref={goldVertRef}
              className="hidden lg:block absolute top-4 -left-10 w-px h-[calc(100%-2rem)] origin-top"
              style={{ backgroundColor: GOLD, transform: 'scaleY(0)' }}
            />
          </div>

          {/* Content */}
          <div className="fa-content relative order-1 lg:order-2 lg:pl-4">


            {/* Category — bordered pill instead of plain tag text */}
            <div
              className="fa-tag inline-flex items-center gap-2 mb-7 px-4 py-1.5 border rounded-full"
              style={{ borderColor: `${GOLD}60` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: '#583929', fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Featured &middot; {article.category}
              </span>
            </div>

            <h2
              className="text-[#282828] text-3xl md:text-4xl lg:text-[2.85rem] leading-[1.2] mb-7"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="fa-heading-line block">{article.title}</span>
              </span>
            </h2>

            <p
              className="fa-excerpt relative text-[#453E33]/80 text-base md:text-lg leading-relaxed mb-9 max-w-lg"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              <span
                className="float-left mr-2 leading-[0.8] text-[#583929]"
                style={{ fontFamily: 'var(--font-eb-garamond), serif', fontSize: '3.4rem' }}
              >
                {article.excerpt.charAt(0)}
              </span>
              {article.excerpt.slice(1)}
            </p>

            <div className="fa-meta flex items-center gap-4 mb-10">
              <span
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[0.6rem] tracking-widest shrink-0"
                style={{ borderColor: `${GOLD}80`, color: GOLD, fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                MB
              </span>
              <div
                className="flex items-center gap-3 text-xs md:text-sm text-[#453E33]/60 tracking-[0.05em]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span style={{ fontFamily: 'var(--font-eb-garamond), serif', fontStyle: 'italic', color: '#583929' }}>
                  {article.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#453E33]/40" />
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#453E33]/40" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <a
              href={article.href}
              className="fa-cta group relative inline-flex items-center gap-3 text-[#282828] text-sm md:text-base transition-colors duration-300 hover:text-[#583929]"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              <span className="border-b border-[#282828]/50 pb-1 transition-colors duration-300 group-hover:border-[#583929]">
                Read the Full Essay
              </span>
              <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}