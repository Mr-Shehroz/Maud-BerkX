'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

type Episode = {
  number: string;
  title: string;
  category: string;
  date: string;
  duration: string;
};

const EPISODES: Episode[] = [
  {
    number: '47',
    title: 'The Quiet Power of Kingdom Leadership',
    category: 'Leadership',
    date: 'Jan 20, 2026',
    duration: '52 min',
  },
  {
    number: '46',
    title: 'From Ambition to Stewardship',
    category: 'Stewardship',
    date: 'Jan 13, 2026',
    duration: '45 min',
  },
  {
    number: '45',
    title: 'Walking in Divine Timing',
    category: 'Faith',
    date: 'Jan 6, 2026',
    duration: '38 min',
  },
  {
    number: '44',
    title: 'Building Legacy Beyond Lifetime',
    category: 'Legacy',
    date: 'Dec 30, 2025',
    duration: '41 min',
  },
  {
    number: '43',
    title: 'Grace-Filled Decision Making',
    category: 'Leadership',
    date: 'Dec 23, 2025',
    duration: '36 min',
  },
  {
    number: '42',
    title: 'The Discipline of Discernment',
    category: 'Faith',
    date: 'Dec 16, 2025',
    duration: '44 min',
  },
  {
    number: '41',
    title: 'Stewarding Influence Without Losing Yourself',
    category: 'Stewardship',
    date: 'Dec 9, 2025',
    duration: '39 min',
  },
  {
    number: '40',
    title: 'What Outlasts a Title',
    category: 'Legacy',
    date: 'Dec 2, 2025',
    duration: '47 min',
  },
];

const CATEGORIES = [
  'All',
  'Faith',
  'Leadership',
  'Legacy',
  'Stewardship',
];

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const reveal = () => setVisible(true);

    const fallback = setTimeout(reveal, 1200);

    if (typeof IntersectionObserver === 'undefined') {
      reveal();

      return () => {
        clearTimeout(fallback);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    visible,
  };
}

export default function EpisodesArchive() {
  const { ref, visible } = useRevealOnScroll();

  const archiveRef = useRef<HTMLDivElement | null>(null);
  const episodeListRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return EPISODES.filter((ep) => {
      const matchesCategory =
        activeCategory === 'All' ||
        ep.category === activeCategory;

      const matchesQuery = ep.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  /*
  ============================================================
  SEQUENTIAL TOP → BOTTOM 3D OPENING ANIMATION
  ============================================================
  */

  useEffect(() => {
    const list = episodeListRef.current;

    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>('.archive-episode-item')
    );

    if (!items.length) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      gsap.set(items, {
        opacity: 1,
        rotateX: 0,
        scaleY: 1,
        y: 0,
      });

      return;
    }

    const ctx = gsap.context(() => {
      /*
       * Important:
       * Perspective is applied to the parent.
       * The cards rotate around their TOP edge.
       */
      gsap.set(list, {
        perspective: 1400,
        perspectiveOrigin: '50% 0%',
      });

      /*
       * Initial state:
       *
       * rotateX -86deg = folded backwards
       * scaleY   = slight compression
       * y        = slightly above
       * opacity  = invisible
       *
       * There is intentionally NO x animation.
       */
      gsap.set(items, {
        opacity: 0,
        rotateX: -86,
        scaleY: 0.92,
        y: -10,
        transformOrigin: '50% 0%',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top 82%',
          once: true,
        },
      });

      items.forEach((item, index) => {
        timeline.to(
          item,
          {
            opacity: 1,
            rotateX: 0,
            scaleY: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          index === 0 ? 0 : '-=0.55'
        );
      });
    }, archiveRef);

    return () => {
      ctx.revert();
    };
  }, [filtered]);

  /*
  ============================================================
  HOVER ANIMATION
  ============================================================
  */

  const handleEpisodeEnter = (
    element: HTMLDivElement
  ) => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) return;

    gsap.to(element, {
      y: -3,
      scale: 1.005,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleEpisodeLeave = (
    element: HTMLDivElement
  ) => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) return;

    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={archiveRef}
      className="relative w-full overflow-hidden bg-[#121212] py-[50px] md:py-[80px] lg:py-[100px]"
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 45% at 50% 0%,
              ${GOLD}0D 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 60% at 100% 100%,
              ${GOLD}07 0%,
              transparent 70%
            )
          `,
        }}
        aria-hidden
      />

      {/* Subtle center line */}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none opacity-20"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent,
              ${GOLD}33,
              transparent
            )
          `,
        }}
        aria-hidden
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8 xl:px-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">

          <div>

            <div className="flex items-center gap-4 mb-6">

              <span
                className="block h-px w-10"
                style={{
                  backgroundColor: GOLD,
                }}
              />

              <p
                className="text-xs md:text-sm tracking-[0.25em] uppercase"
                style={{
                  color: GOLD,
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                The Archive
              </p>

            </div>

            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2]"
              style={{
                fontFamily:
                  'var(--font-eb-garamond), serif',
              }}
            >
              Every conversation, in one place.
            </h2>

          </div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="w-full md:w-72">

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes"
              className="
                w-full
                bg-transparent
                border-b
                border-white/20
                focus:border-[color:var(--gold)]
                outline-none
                text-white
                placeholder-white/35
                text-sm
                py-3
                transition-colors
                duration-300
              "
              style={{
                ['--gold' as string]: GOLD,
                fontFamily:
                  'var(--font-hanken), sans-serif',
              }}
            />

          </div>
        </div>

        {/* =================================================
            CATEGORY FILTERS
        ================================================= */}

        <div className="flex flex-wrap gap-3 mb-10 md:mb-14">

          {CATEGORIES.map((cat) => {

            const isActive =
              cat === activeCategory;

            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat)
                }
                className="
                  px-5
                  py-2
                  rounded-full
                  text-xs
                  tracking-[0.15em]
                  uppercase
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                "
                style={{
                  borderColor: isActive
                    ? GOLD
                    : 'rgba(255,255,255,0.2)',

                  color: isActive
                    ? GOLD
                    : 'rgba(255,255,255,0.6)',

                  backgroundColor: isActive
                    ? 'rgba(197,160,101,0.08)'
                    : 'transparent',

                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                {cat}
              </button>
            );
          })}

        </div>

        {/* =================================================
            EPISODE LIST
        ================================================= */}

        <div
          ref={(node) => {
            episodeListRef.current = node;
            ref.current = node;
          }}
          className="
            archive-episode-list
            border-t
            border-white/10
          "
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0)'
              : 'translateY(20px)',
            transition:
              'opacity 0.7s ease, transform 0.7s ease',
          }}
        >

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filtered.length === 0 && (
            <p
              className="text-white/40 text-sm py-12"
              style={{
                fontFamily:
                  'var(--font-hanken), sans-serif',
              }}
            >
              No episodes match that search. Try a
              different term or category.
            </p>
          )}

          {/* =================================================
              EPISODES
          ================================================= */}

          {filtered.map((ep) => (

            <div
              key={ep.number}
              className="
                archive-episode-item
                group
                relative
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-3
                sm:gap-8
                py-6
                border-b
                border-white/10
                cursor-pointer
                px-2
                -mx-2
                bg-[#121212]
                transition-colors
                duration-300
                hover:bg-white/[0.035]
                will-change-transform
              "
              onMouseEnter={(e) =>
                handleEpisodeEnter(
                  e.currentTarget
                )
              }
              onMouseLeave={(e) =>
                handleEpisodeLeave(
                  e.currentTarget
                )
              }
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 0%',
                backfaceVisibility: 'hidden',
              }}
            >

              {/* =================================================
                  GOLD TOP ACCENT
              ================================================= */}

              <span
                className="
                  absolute
                  top-0
                  left-0
                  h-px
                  w-0
                  group-hover:w-20
                  transition-all
                  duration-500
                "
                style={{
                  background: `
                    linear-gradient(
                      to right,
                      ${GOLD},
                      transparent
                    )
                  `,
                }}
              />

              {/* =================================================
                  EPISODE NUMBER
              ================================================= */}

              <span
                className="
                  text-sm
                  w-10
                  shrink-0
                  transition-colors
                  duration-300
                  group-hover:text-[#C5A065]
                "
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                {ep.number}
              </span>

              {/* =================================================
                  TITLE
              ================================================= */}

              <div className="flex-1 min-w-0">

                <h3
                  className="
                    text-white
                    text-lg
                    md:text-xl
                    font-normal
                    leading-snug
                    transition-colors
                    duration-300
                    group-hover:text-[#C5A065]
                  "
                  style={{
                    fontFamily:
                      'var(--font-eb-garamond), serif',
                  }}
                >
                  {ep.title}
                </h3>

              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <span
                className="
                  text-xs
                  tracking-[0.1em]
                  uppercase
                  shrink-0
                "
                style={{
                  color: GOLD,
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                {ep.category}
              </span>

              {/* =================================================
                  DATE
              ================================================= */}

              <span
                className="
                  text-white/40
                  text-sm
                  shrink-0
                  hidden
                  md:block
                "
                style={{
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                {ep.date}
              </span>

              {/* =================================================
                  DURATION
              ================================================= */}

              <span
                className="
                  text-white/40
                  text-sm
                  shrink-0
                  w-16
                  text-right
                "
                style={{
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                {ep.duration}
              </span>

              {/* =================================================
                  PLAY AFFORDANCE
              ================================================= */}

              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  shrink-0
                  opacity-0
                  -translate-x-2
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  transition-all
                  duration-300
                "
                style={{
                  borderColor: GOLD,
                }}
              >

                <svg
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0 0L8 5L0 10V0Z"
                    fill={GOLD}
                  />
                </svg>

              </div>

            </div>

          ))}

        </div>

        {/* =================================================
            LOAD MORE
        ================================================= */}

        {filtered.length > 0 && (

          <div className="flex justify-center mt-14">

            <button
              className="
                inline-flex
                items-center
                px-8
                py-4
                rounded-full
                text-sm
                tracking-wide
                uppercase
                font-medium
                text-white
                border
                border-white/30
                transition-all
                duration-300
                hover:border-white/70
                hover:bg-white/5
                hover:-translate-y-0.5
              "
              style={{
                fontFamily:
                  'var(--font-hanken), sans-serif',
              }}
            >
              Load More Episodes
            </button>

          </div>

        )}

      </div>
    </section>
  );
}