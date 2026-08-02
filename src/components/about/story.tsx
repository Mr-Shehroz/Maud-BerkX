'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const BROWN = '#583929';

/**
 * `weight` mirrors the original CSS-grid row-span for that image so the
 * proportions match the source layout exactly:
 *   col1: f (4 rows, full height)             -> weight 4        (sum 4)
 *   col2: a (2 rows) / d (2 rows)              -> weights 2, 2    (sum 4)
 *   col3: b (1 row) / c (2 rows) / e (1 row)   -> weights 1, 2, 1 (sum 4)
 * Column order is mirrored vs. the homepage About section (full-height
 * column first instead of last) to match the mirrored text/image layout.
 */
type MarqueeImage = { src: string; alt: string; weight: number };

const COLUMNS: {
  images: MarqueeImage[];
  duration: number;
  direction: 'up' | 'down';
}[] = [
  {
    images: [{ src: 'about-1.png', alt: 'Standing portrait', weight: 4 }],
    duration: 18,
    direction: 'down',
  },
  {
    images: [
      { src: 'about-4.png', alt: 'Portrait', weight: 2 },
      { src: 'about-3.png', alt: 'Artistic closeup', weight: 2 },
    ],
    duration: 22,
    direction: 'up',
  },
  {
    images: [
      { src: 'about-5.png', alt: 'Detail', weight: 1 },
      { src: 'about-2.png', alt: 'Woman in dark', weight: 2 },
      { src: 'about-6.png', alt: 'Hand detail', weight: 1 },
    ],
    duration: 28,
    direction: 'down',
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
            className="story-img group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
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
          className="story-img group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
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

export default function StorySection() {
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
        gsap.set('.story-img', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.story-text', { opacity: 1, y: 0 });
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

      tl.from('.story-img', {
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
      className="relative py-[50px] md:py-[80px] lg:py-[100px] bg-[#EFEAE1] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #453E33 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">
        {/* Mirrored order vs. homepage: text left, collage right — so
            the two sections read as a pair, not a duplicate. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Side: Content */}
          <div className="lg:col-span-7 lg:pr-6 xl:pr-10 order-2 lg:order-1 lg:mt-0 mt-[3vh]">
            <span
              ref={eyebrowRef}
              className="block text-xs md:text-sm tracking-[0.25em] uppercase mb-4 md:mb-5"
              style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              — Her Story
            </span>

            <h2
              ref={headingRef}
              className="text-[#282828] text-3xl md:text-5xl lg:text-6xl font-normal mb-4 md:mb-6 leading-[1.1]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Not a straight road —{' '}
              <span className="italic" style={{ color: BROWN }}>a faithful one.</span>
            </h2>

            <span
              ref={goldLineRef}
              className="block h-px w-12 md:w-16 mb-8 md:mb-10 origin-left"
              style={{ backgroundColor: GOLD, transform: 'scaleX(0)' }}
            />

            <div className="space-y-5 md:space-y-6">
              <p
                ref={(el) => { paragraphsRef.current[0] = el }}
                className="story-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="text-[#282828] font-medium">Maud</span> never set out to
                become a name spoken in rooms of influence. She set out, simply, to be
                faithful with what she was given — a conviction, a quiet discipline, and a
                stubborn belief that leadership was never meant to be about visibility.
              </p>

              <p
                ref={(el) => { paragraphsRef.current[1] = el }}
                className="story-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                What began as private mentorship in borrowed living rooms slowly became a
                body of work that now reaches women of influence across continents — though
                the posture underneath it has never changed. She was, and remains, the
                person others quietly seek out in the margins of difficult decisions.
              </p>

              <p
                ref={(el) => { paragraphsRef.current[2] = el }}
                className="story-text text-[#453E33]/70 text-sm md:text-base lg:text-xl leading-relaxed lg:leading-[1.7]"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                Today, that same conviction shapes mentorship circles, speaking engagements,
                and a growing body of writing — all pointed at one quiet belief: that a life
                well-stewarded becomes a legacy that holds weight long after the room empties.
              </p>
            </div>

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

          {/* Right Side: Marquee Collage — same scrolling behavior as
              homepage About section, mirrored column order and Story's
              own crop selection */}
          <div className="lg:col-span-5 flex gap-3 md:gap-4 h-[560px] md:h-[660px] lg:h-[700px] order-1 lg:order-2">
            {COLUMNS.map((col, i) => (
              <div key={i} className="relative h-full flex-1 min-w-0">
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
        </div>
      </div>
    </section>
  );
}