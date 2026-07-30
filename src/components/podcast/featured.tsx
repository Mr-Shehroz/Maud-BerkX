'use client';
import { useEffect, useRef, useState } from 'react';

const GOLD = '#C5A065';
const BG = '#F6F6F6';
const INK = '#282828';
const BODY = '#453E33';
const SANS = 'var(--font-hanken), sans-serif';
const SERIF = 'var(--font-eb-garamond), serif';

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => setVisible(true);
    const fallback = setTimeout(reveal, 1200);

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}

export default function FeaturedEpisode() {
  const { ref: artRef, visible: artVisible } = useRevealOnScroll<HTMLDivElement>();
  const { ref: infoRef, visible: infoVisible } = useRevealOnScroll<HTMLDivElement>();
  const [scrubbed, setScrubbed] = useState(false);

  useEffect(() => {
    if (infoVisible) {
      const t = setTimeout(() => setScrubbed(true), 250);
      return () => clearTimeout(t);
    }
  }, [infoVisible]);

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{ backgroundColor: BG }}>
      {/* Same subtle dot texture used on the About page's light section */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${BODY} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="block h-px w-10" style={{ backgroundColor: GOLD }} />
          <p
            className="text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ color: GOLD, fontFamily: SANS }}
          >
            Latest Release
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-12 lg:gap-20 items-center">

          {/* Cover art with play control */}
          <div
            ref={artRef}
            className="relative aspect-square w-full max-w-[440px] mx-auto lg:mx-0 overflow-hidden group cursor-pointer transition-all duration-700 ease-out"
            style={{
              opacity: artVisible ? 1 : 0,
              transform: artVisible ? 'translateY(0)' : 'translateY(24px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=900"
              alt="Episode 47 cover art"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Play latest episode"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                style={{ borderColor: GOLD, backgroundColor: 'rgba(18,18,18,0.4)' }}
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path d="M0 0L18 11L0 22V0Z" fill={GOLD} />
                </svg>
              </button>
            </div>

            <div
              className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase"
              style={{ backgroundColor: 'rgba(18,18,18,0.55)', color: GOLD, fontFamily: SANS }}
            >
              Episode 47
            </div>
          </div>

          {/* Episode info */}
          <div
            ref={infoRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: infoVisible ? 1 : 0,
              transform: infoVisible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '150ms',
            }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] mb-6"
              style={{ fontFamily: SERIF, color: INK }}
            >
              The Quiet Power of Kingdom Leadership
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: `${BODY}B3`, fontFamily: SANS }}
            >
              In this profound conversation, we explore what it means to lead
              with quiet confidence, rooted in faith and wisdom — and why the
              most enduring influence is rarely the loudest voice in the room.
            </p>

            <div
              className="flex items-center gap-4 text-sm mb-8 tracking-wide"
              style={{ color: `${BODY}99`, fontFamily: SANS }}
            >
              <span>Jan 20, 2026</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${BODY}4D` }} />
              <span>52 min</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${BODY}4D` }} />
              <span>Season 3</span>
            </div>

            {/* Mini scrubber */}
            <div className="mb-10 max-w-md">
              <div
                className="h-[2px] w-full rounded-full overflow-hidden"
                style={{ backgroundColor: `${BODY}1F` }}
              >
                <div
                  className="h-full rounded-full transition-[width] ease-out"
                  style={{
                    backgroundColor: GOLD,
                    width: scrubbed ? '18%' : '0%',
                    transitionDuration: '1400ms',
                  }}
                />
              </div>
              <div
                className="flex justify-between mt-2 text-[11px] tracking-wide"
                style={{ color: `${BODY}80`, fontFamily: SANS }}
              >
                <span>09:24</span>
                <span>52:00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-wide uppercase font-medium transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(197,160,101,0.35)] hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, color: '#121212', fontFamily: SANS }}
              >
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M0 0L10 6L0 12V0Z" fill="#121212" />
                </svg>
                Play Episode
              </button>

              <button
                className="inline-flex items-center px-8 py-4 rounded-full text-sm tracking-wide uppercase font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: `1px solid ${BODY}40`, color: INK, fontFamily: SANS }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${BODY}99`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${BODY}40`)}
              >
                Show Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}