'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const goldLineRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const paragraphsRef = useRef<Array<HTMLParagraphElement | null>>([]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.about-img', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.about-text', { opacity: 1, y: 0 });
        gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.from('.about-img', {
        opacity: 0,
        y: 40,
        scale: 1.05,
        duration: 1.1,
        stagger: 0.1,
      })
        .from(eyebrowRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.6,
        }, '-=0.7')
        .from(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.5')
        .fromTo(
          goldLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'left center' },
          '-=0.5'
        )
        .from(paragraphsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
        }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-[#F6F6F6] overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #453E33 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Side: Artistic Collage */}
          <div
            className="lg:col-span-5 grid gap-3 md:gap-4 h-[560px] md:h-[660px] lg:h-[700px]"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gridTemplateAreas: `
                "a b f"
                "a c f"
                "d c f"
                "d e f"
              `,
            }}
          >
            {[
              { area: 'a', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=650&fit=crop', alt: 'Portrait' },
              { area: 'b', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&h=650&fit=crop', alt: 'Hands' },
              { area: 'c', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=650&fit=crop', alt: 'Woman in dark' },
              { area: 'd', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=650&fit=crop', alt: 'Artistic closeup' },
              { area: 'e', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=650&fit=crop', alt: 'Hand detail' },
              { area: 'f', src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=900&fit=crop', alt: 'Standing portrait' },
            ].map((img) => (
              <div
                key={img.area}
                className="about-img group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                style={{ gridArea: img.area }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover grayscale transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                {/* Subtle gold-tinted overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                  style={{ background: `linear-gradient(to top, ${GOLD}22, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 lg:pl-6 xl:pl-10">
            {/* Eyebrow label */}
            <span
              ref={eyebrowRef}
              className="block text-xs md:text-sm tracking-[0.25em] uppercase mb-4 md:mb-5"
              style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Legacy &amp; Leadership
            </span>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[#282828] text-3xl md:text-5xl lg:text-6xl font-normal mb-4 md:mb-6 leading-[1.1]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              About the Founder
            </h2>

            {/* Gold Accent Line */}
            <span
              ref={goldLineRef}
              className="block h-px w-12 md:w-16 mb-8 md:mb-10 origin-left"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />

            {/* Content Paragraphs */}
            <div className="space-y-5 md:space-y-6">
              <p
                ref={(el) => { paragraphsRef.current[0] = el }}
                className="about-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="text-[#282828] font-medium">Maud Berky</span> is an international
                leadership strategist and wisdom keeper who has dedicated her life to helping
                women of influence build enduring legacies rooted in faith, purpose, and
                Kingdom principles. Her work bridges the ancient and the modern, offering a
                voice that is both timeless and urgently needed.
              </p>

              <p
                ref={(el) => { paragraphsRef.current[1] = el }}
                className="about-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                With over two decades of experience mentoring global leaders, Maud combines
                deep spiritual insight with practical wisdom to guide women through
                transformative journeys of leadership and legacy-building. She believes that
                true influence is not about visibility, but about stewardship.
              </p>

              <p
                ref={(el) => { paragraphsRef.current[2] = el }}
                className="about-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Her work spans continents, impacting women across cultures and generations
                through intimate mentorship, speaking engagements, and her curated wisdom
                journal. Maud is building something that outlasts trend and circumstance —
                a life, and a leadership, built to hold weight.
              </p>
            </div>

            {/* Signature-style closing accent */}
            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <span className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${GOLD}66` }} />
              <span
                className="text-xs md:text-sm italic text-[#453E33]/60"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Founder, Kingdom Legacy Collective
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}