'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const GOLD = '#C5A065';

type Episode = {
  number: string;
  title: string;
  category: string;
  date: string;
  duration: string;
};

const EPISODES: Episode[] = [
  { number: '47', title: 'The Quiet Power of Kingdom Leadership', category: 'Leadership', date: 'Jan 20, 2026', duration: '52 min' },
  { number: '46', title: 'From Ambition to Stewardship', category: 'Stewardship', date: 'Jan 13, 2026', duration: '45 min' },
  { number: '45', title: 'Walking in Divine Timing', category: 'Faith', date: 'Jan 6, 2026', duration: '38 min' },
  { number: '44', title: 'Building Legacy Beyond Lifetime', category: 'Legacy', date: 'Dec 30, 2025', duration: '41 min' },
  { number: '43', title: 'Grace-Filled Decision Making', category: 'Leadership', date: 'Dec 23, 2025', duration: '36 min' },
  { number: '42', title: 'The Discipline of Discernment', category: 'Faith', date: 'Dec 16, 2025', duration: '44 min' },
  { number: '41', title: 'Stewarding Influence Without Losing Yourself', category: 'Stewardship', date: 'Dec 9, 2025', duration: '39 min' },
  { number: '40', title: 'What Outlasts a Title', category: 'Legacy', date: 'Dec 2, 2025', duration: '47 min' },
];

const CATEGORIES = ['All', 'Faith', 'Leadership', 'Legacy', 'Stewardship'];

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
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}

export default function EpisodesArchive() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return EPISODES.filter((ep) => {
      const matchesCategory = activeCategory === 'All' || ep.category === activeCategory;
      const matchesQuery = ep.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section className="relative bg-[#121212] py-24 md:py-32">
      <div className="w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        {/* Eyebrow + heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10" style={{ backgroundColor: GOLD }} />
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase" style={{ color: GOLD }}>
                The Archive
              </p>
            </div>
            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Every conversation, in one place.
            </h2>
          </div>

          {/* Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes"
              className="w-full bg-transparent border-b border-white/20 focus:border-[color:var(--gold)] outline-none text-white placeholder-white/35 text-sm py-3 transition-colors duration-300"
              style={{ ['--gold' as string]: GOLD }}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase border transition-all duration-300"
                style={{
                  borderColor: isActive ? GOLD : 'rgba(255,255,255,0.2)',
                  color: isActive ? GOLD : 'rgba(255,255,255,0.6)',
                  backgroundColor: isActive ? 'rgba(197,160,101,0.08)' : 'transparent',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Episode list */}
        <div
          ref={ref}
          className="border-t border-white/10 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {filtered.length === 0 && (
            <p className="text-white/40 text-sm py-12">
              No episodes match that search. Try a different term or category.
            </p>
          )}

          {filtered.map((ep) => (
            <div
              key={ep.number}
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-6 border-b border-white/10 cursor-pointer transition-colors duration-300 hover:bg-white/[0.03] px-2 -mx-2"
            >
              <span
                className="text-sm w-10 shrink-0 transition-colors duration-300 group-hover:text-[color:var(--gold)]"
                style={{ color: 'rgba(255,255,255,0.35)', ['--gold' as string]: GOLD }}
              >
                {ep.number}
              </span>

              <div className="flex-1 min-w-0">
                <h3
                  className="text-white text-lg md:text-xl font-normal truncate"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  {ep.title}
                </h3>
              </div>

              <span
                className="text-xs tracking-[0.1em] uppercase shrink-0"
                style={{ color: GOLD }}
              >
                {ep.category}
              </span>

              <span className="text-white/40 text-sm shrink-0 hidden md:block">
                {ep.date}
              </span>

              <span className="text-white/40 text-sm shrink-0 w-16 text-right">
                {ep.duration}
              </span>

              {/* Play affordance, appears on hover */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                style={{ borderColor: GOLD }}
              >
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path d="M0 0L8 5L0 10V0Z" fill={GOLD} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-14">
            <button className="inline-flex items-center px-8 py-4 rounded-full text-sm tracking-wide uppercase font-medium text-white border border-white/30 transition-all duration-300 hover:border-white/70 hover:bg-white/5 hover:-translate-y-0.5">
              Load More Episodes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}