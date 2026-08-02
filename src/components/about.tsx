'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

/**
 * `weight` mirrors the original CSS-grid row-span for that image, so the
 * proportions match the source layout exactly:
 *   col1: a (2 rows) / d (2 rows)            -> weights 2, 2   (sum 4)
 *   col2: b (1 row) / c (2 rows) / e (1 row) -> weights 1, 2, 1 (sum 4)
 *   col3: f (4 rows, full height)            -> weight 4        (sum 4)
 * Every column's weights sum to 4, matching the original 4-row grid, so
 * the per-row pixel height stays consistent across all three columns.
 */
type MarqueeImage = { src: string; alt: string; weight: number };

const COLUMNS: {
  images: MarqueeImage[];
  duration: number;
  direction: 'up' | 'down';
}[] = [
  {
    images: [
      { src: 'about-1.png', alt: 'Portrait', weight: 2 },
      { src: 'about-2.png', alt: 'Artistic closeup', weight: 2 },
    ],
    duration: 22,
    direction: 'up',
  },
  {
    images: [
      { src: 'about-3.png', alt: 'Hands', weight: 1 },
      { src: 'about-4.png', alt: 'Woman in dark', weight: 2 },
      { src: 'about-5.png', alt: 'Hand detail', weight: 1 },
    ],
    duration: 28,
    direction: 'down',
  },
  {
    images: [
      { src: 'about-6.png', alt: 'Standing portrait', weight: 4 },
    ],
    duration: 18,
    direction: 'up',
  },
];

function MarqueeColumn({
  images,
  duration,
  direction,
  reducedMotion,
}: {
  images: MarqueeImage[];
  duration: number;
  direction: 'up' | 'down';
  reducedMotion: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !trackRef.current) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // The track holds the image set duplicated twice, stacked, and is
      // exactly 2x the visible (masked) container height. Animating
      // yPercent between 0 and -50 moves exactly one full set out of
      // view — invisible to the eye, since the duplicate set has
      // scrolled into the exact same position, giving a seamless loop.
      if (direction === 'up') {
        gsap.fromTo(
          track,
          { yPercent: 0 },
          { yPercent: -50, duration, ease: 'none', repeat: -1 }
        );
      } else {
        gsap.fromTo(
          track,
          { yPercent: -50 },
          { yPercent: 0, duration, ease: 'none', repeat: -1 }
        );
      }
    });

    return () => ctx.revert();
  }, [duration, direction, reducedMotion]);

  const doubled = [...images, ...images];

  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-3 md:gap-4 h-[1120px] md:h-[1320px] lg:h-[1400px]"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            style={{ flexGrow: img.weight, flexBasis: 0, minHeight: 0 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover grayscale transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
              style={{ background: `linear-gradient(to top, ${GOLD}22, transparent)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Static fallback (no motion) — same proportions, single image set. */
function StaticColumn({ images }: { images: MarqueeImage[] }) {
  return (
    <div className="relative h-full overflow-hidden flex flex-col gap-3 md:gap-4">
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          style={{ flexGrow: img.weight, flexBasis: 0, minHeight: 0 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover grayscale transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
      ))}
    </div>
  );
}

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

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.6,
      })
        .from(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, '-=0.3')
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
      className="relative py-[50px] md:py-[80px] lg:py-[100px] bg-[#F6F6F6] overflow-hidden"
    >
      {/* Subtle background texture */}
      {/* <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #453E33 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      /> */}

      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-20 items-center">

          {/* Left Side: Marquee Collage */}
          <div className="lg:col-span-5 flex gap-3 md:gap-4 h-[560px] md:h-[660px] lg:h-[700px]">
            {COLUMNS.map((col, i) => (
              <div key={i} className="relative h-full flex-1 min-w-0">
                {/* top/bottom fade edges so images scroll in/out softly */}
                {/* <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-10 z-10"
                  style={{ background: 'linear-gradient(to bottom, #F6F6F6, transparent)' }}
                /> */}
                {/* <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10"
                  style={{ background: 'linear-gradient(to top, #F6F6F6, transparent)' }}
                /> */}
                {prefersReducedMotion ? (
                  <StaticColumn images={col.images} />
                ) : (
                  <MarqueeColumn
                    images={col.images}
                    duration={col.duration}
                    direction={col.direction}
                    reducedMotion={!!prefersReducedMotion}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 lg:pl-6 xl:pl-10 lg:mt-0 mt-[4vh]">
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