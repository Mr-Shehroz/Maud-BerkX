'use client';
import { useEffect, useRef, useState } from 'react';

const GOLD = '#C5A065';
const BG = '#F6F6F6';
const INK = '#282828';
const BODY = '#453E33';
const SANS = 'var(--font-hanken), sans-serif';
const SERIF = 'var(--font-eb-garamond), serif';

const CATEGORIES = [
  {
    title: 'Faith',
    description: 'Conversations on conviction, discernment, and walking in divine timing.',
    count: '14 episodes',
  },
  {
    title: 'Leadership',
    description: 'Quiet confidence, grace-filled decisions, and leading without losing yourself.',
    count: '19 episodes',
  },
  {
    title: 'Legacy',
    description: 'Building what outlasts a title — the long view on influence and impact.',
    count: '9 episodes',
  },
  {
    title: 'Stewardship',
    description: 'Ambition held with open hands, and resources managed with care.',
    count: '11 episodes',
  },
];

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
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}

export default function Categories() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" style={{ backgroundColor: BG }}>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${BODY} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative">

        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-10" style={{ backgroundColor: GOLD }} />
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase" style={{ color: GOLD, fontFamily: SANS }}>
            Topics
          </p>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] mb-14 md:mb-20 max-w-2xl"
          style={{ fontFamily: SERIF, color: INK }}
        >
          Four threads, one conversation.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px transition-all duration-700 ease-out"
          style={{
            backgroundColor: `${BODY}1A`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              className="group text-left p-8 md:p-10 transition-colors duration-300"
              style={{ backgroundColor: BG }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EFEFEF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BG)}
            >
              <span
                className="block text-xs tracking-[0.15em] uppercase mb-6"
                style={{ color: `${BODY}80`, fontFamily: SANS }}
              >
                {cat.count}
              </span>

              <h3
                className="text-2xl mb-4 font-normal transition-colors duration-300 group-hover:text-[color:var(--gold)]"
                style={{ fontFamily: SERIF, color: INK, ['--gold' as string]: GOLD }}
              >
                {cat.title}
              </h3>

              <p className="text-sm leading-relaxed mb-8" style={{ color: `${BODY}B3`, fontFamily: SANS }}>
                {cat.description}
              </p>

              <span
                className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase"
                style={{ color: GOLD, fontFamily: SANS }}
              >
                Browse
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M7 0L12 5L7 10" stroke={GOLD} strokeWidth="1.2" />
                  <path d="M0 5H11.5" stroke={GOLD} strokeWidth="1.2" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}