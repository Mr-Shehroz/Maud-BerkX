'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const BROWN = '#583929';

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
      className="relative py-24 md:py-32 lg:py-40 bg-[#EFEAE1] overflow-hidden"
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
          <div className="lg:col-span-7 lg:pr-6 xl:pr-10 order-2 lg:order-1">
            <span
              ref={eyebrowRef}
              className="block text-xs md:text-sm tracking-[0.25em] uppercase mb-4 md:mb-5"
              style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              02 — Her Story
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

          {/* Right Side: Artistic Collage — same grid structure as
              homepage About section, different crop selection */}
          <div
            className="lg:col-span-5 grid gap-3 md:gap-4 h-[560px] md:h-[660px] lg:h-[700px] order-1 lg:order-2"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gridTemplateAreas: `
                "f a b"
                "f a c"
                "f d c"
                "f d e"
              `,
            }}
          >
            {[
              { area: 'a', src: 'about-4.png', alt: 'Portrait' },
              { area: 'b', src: 'about-5.png', alt: 'Detail' },
              { area: 'c', src: 'about-2.png', alt: 'Woman in dark' },
              { area: 'd', src: 'about-3.png', alt: 'Artistic closeup' },
              { area: 'e', src: 'about-6.png', alt: 'Hand detail' },
              { area: 'f', src: 'about-1.png', alt: 'Standing portrait' },
            ].map((img) => (
              <div
                key={img.area}
                className="story-img group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                style={{ gridArea: img.area }}
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
      </div>
    </section>
  );
}