'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Clock, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function PodcastSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      /* =====================================================
         PODCAST HEADER ANIMATION
      ===================================================== */

      gsap.fromTo(
        '.podcast-header',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.podcast-header',
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* =====================================================
         FEATURED EPISODE ANIMATION
      ===================================================== */

      gsap.fromTo(
        '.featured-episode-card',
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-episode-card',
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* =====================================================
         RECENT EPISODES HEADER
      ===================================================== */

      gsap.fromTo(
        '.recent-episodes-header',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.recent-episodes-header',
            start: 'top 90%',
            once: true,
          },
        }
      );

      /* =====================================================
         3D SEQUENTIAL EPISODE OPENING
         
         Each card behaves like a panel hinged from its
         TOP edge.

         Initial:
         - rotateX: -82deg
         - slightly compressed
         - slightly lifted
         - invisible

         Final:
         - rotateX: 0
         - normal scale
         - normal position
         - visible

         The cards open sequentially from TOP → BOTTOM.
      ===================================================== */

      const episodeItems =
        gsap.utils.toArray<HTMLElement>('.episode-item');

      if (episodeItems.length) {
        gsap.set(episodeItems, {
          transformPerspective: 1400,
          transformOrigin: '50% 0%',
          rotateX: -82,
          scaleY: 0.92,
          y: -12,
          opacity: 0,
        });

        const episodeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.episode-list',
            start: 'top 82%',
            once: true,
          },
        });

        episodeItems.forEach((item, index) => {
          episodeTimeline.to(
            item,
            {
              rotateX: 0,
              scaleY: 1,
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: 'power3.out',
            },
            index === 0 ? 0 : '-=0.48'
          );
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =======================================================
     FEATURED EPISODE
  ======================================================= */

  const featuredEpisode = {
    number: 'Episode 47',
    title: 'The Quiet Power of Kingdom Leadership',
    description:
      'In this profound conversation, we explore what it means to lead with quiet confidence, rooted in faith and wisdom.',
    duration: '52 min',
    date: 'Jan 20, 2026',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
  };

  /* =======================================================
     RECENT EPISODES
  ======================================================= */

  const episodes = [
    {
      number: '46',
      title: 'From Ambition to Stewardship',
      duration: '45 min',
      date: 'Jan 13, 2026',
      category: 'Leadership',
      image:
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
    },
    {
      number: '45',
      title: 'Walking in Divine Timing',
      duration: '38 min',
      date: 'Jan 6, 2026',
      category: 'Faith & Wisdom',
      image:
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
    },
    {
      number: '44',
      title: 'Building Legacy Beyond Lifetime',
      duration: '41 min',
      date: 'Dec 30, 2025',
      category: 'Kingdom Impact',
      image:
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
    },
    {
      number: '43',
      title: 'Grace-Filled Decision Making',
      duration: '36 min',
      date: 'Dec 23, 2025',
      category: 'Wisdom',
      image:
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
    },
    {
      number: '42',
      title: 'The Quiet Power of Surrender',
      duration: '42 min',
      date: 'Dec 16, 2025',
      category: 'Faith & Wisdom',
      image:
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200',
    },
  ];

  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  const togglePlay = (index: number) => {
    setPlayingEpisode((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F0F0F] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      {/* ===================================================
          BACKGROUND ATMOSPHERE
      =================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 55% 40% at 50% 10%,
              ${GOLD}0D,
              transparent 70%
            )
          `,
        }}
      />

      {/* Subtle center line */}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none opacity-20"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            ${GOLD}33,
            transparent
          )`,
        }}
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="podcast-header text-center mb-16 md:mb-20">
          <p
            className="text-[#C5A065] text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily:
                'var(--font-hanken), sans-serif',
            }}
          >
            The Podcast
          </p>

          <h2
            className="text-white text-3xl md:text-5xl lg:text-6xl font-normal mb-6"
            style={{
              fontFamily:
                'var(--font-eb-garamond), serif',
            }}
          >
            Voices of Influence
          </h2>

          <p
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
            style={{
              fontFamily:
                'var(--font-hanken), sans-serif',
            }}
          >
            Faith, wisdom, and leadership conversations
            for women of influence.
          </p>
        </div>

        {/* =================================================
            GRID
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* =================================================
              LEFT — FEATURED EPISODE
          ================================================= */}

          <div className="lg:col-span-7">
            <div
              className="
                featured-episode-card
                group
                relative
                bg-[#1a1a1a]
                border
                border-white/10
                rounded-sm
                overflow-hidden
                hover:border-[#C5A065]/40
                transition-all
                duration-500
              "
            >
              {/* IMAGE */}

              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Image gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />

                {/* Episode badge */}

                <div className="absolute top-6 left-6">
                  <span
                    className="
                      inline-block
                      px-4
                      py-2
                      bg-[#C5A065]
                      text-[#121212]
                      text-xs
                      font-semibold
                      tracking-wider
                      uppercase
                    "
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    {featuredEpisode.number}
                  </span>
                </div>

                {/* =================================================
                    FEATURED PLAY BUTTON
                ================================================= */}

                <button
                  onClick={() => togglePlay(0)}
                  aria-label={
                    playingEpisode === 0
                      ? 'Pause episode'
                      : 'Play episode'
                  }
                  className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-20
                    h-20
                    rounded-full
                    bg-white/95
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    shadow-2xl
                    transition-all
                    duration-500
                    hover:bg-[#C5A065]
                    hover:scale-110
                  "
                >
                  <span
                    className="
                      absolute
                      inset-[-8px]
                      rounded-full
                      border
                      border-white/30
                      scale-90
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  />

                  {playingEpisode === 0 ? (
                    <Pause
                      size={32}
                      className="relative z-10 text-[#121212]"
                    />
                  ) : (
                    <Play
                      size={32}
                      className="relative z-10 text-[#121212] ml-1"
                    />
                  )}
                </button>
              </div>

              {/* =================================================
                  FEATURED CONTENT
              ================================================= */}

              <div className="p-6 md:p-8">
                <h3
                  className="text-white text-2xl md:text-3xl mb-4"
                  style={{
                    fontFamily:
                      'var(--font-eb-garamond), serif',
                  }}
                >
                  {featuredEpisode.title}
                </h3>

                <p
                  className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed"
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  {featuredEpisode.description}
                </p>

                <div
                  className="flex items-center gap-4 text-gray-500 text-sm"
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredEpisode.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {featuredEpisode.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — RECENT EPISODES
          ================================================= */}

          <div className="lg:col-span-5">

            {/* Recent episodes header */}

            <div className="recent-episodes-header flex items-center justify-between mb-6">
              <p
                className="text-[#C5A065] text-xs uppercase tracking-wider"
                style={{
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                Recent Episodes
              </p>

              <a
                href="/podcast"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[#C5A065]
                  text-xs
                  tracking-wide
                  hover:text-white
                  transition-colors
                  duration-300
                "
                style={{
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                <span>View All Episodes</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* =================================================
                3D EPISODE LIST
            ================================================= */}

            <div
              className="episode-list space-y-4"
              style={{
                perspective: '1400px',
                perspectiveOrigin: 'center top',
              }}
            >
              {episodes.map((episode, index) => (
                <div
                  key={index}
                  className="
                    episode-item
                    group
                    flex
                    items-center
                    gap-4
                    bg-[#1a1a1a]
                    border
                    border-white/5
                    p-4
                    hover:border-[#C5A065]/30
                    hover:bg-[#1d1d1d]
                    transition-colors
                    duration-300
                    cursor-pointer
                    will-change-transform
                  "
                  onClick={() =>
                    togglePlay(index + 1)
                  }
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* =================================================
                      EPISODE NUMBER
                  ================================================= */}

                  <div
                    className="
                      hidden
                      md:flex
                      w-8
                      flex-shrink-0
                      items-center
                      justify-center
                      text-[#C5A065]/50
                      text-xs
                      tracking-wider
                    "
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    {episode.number}
                  </div>

                  {/* =================================================
                      THUMBNAIL
                  ================================================= */}

                  <div
                    className="
                      relative
                      w-16
                      h-16
                      flex-shrink-0
                      bg-[#2a2a2a]
                      overflow-hidden
                      rounded-sm
                    "
                  >
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        grayscale
                        transition-all
                        duration-700
                        group-hover:grayscale-0
                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#C5A065]/0
                        group-hover:bg-[#C5A065]/10
                        transition-colors
                        duration-500
                      "
                    />
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="flex-1 min-w-0">

                    <h4
                      className="
                        text-white
                        text-sm
                        mb-1
                        truncate
                        group-hover:text-[#C5A065]
                        transition-colors
                        duration-300
                      "
                      style={{
                        fontFamily:
                          'var(--font-eb-garamond), serif',
                      }}
                    >
                      {episode.title}
                    </h4>

                    <p
                      className="text-gray-500 text-xs"
                      style={{
                        fontFamily:
                          'var(--font-hanken), sans-serif',
                      }}
                    >
                      {episode.duration} • {episode.date}
                    </p>

                    <span
                      className="
                        inline-block
                        mt-2
                        text-[9px]
                        uppercase
                        tracking-[0.16em]
                        text-white/25
                        group-hover:text-[#C5A065]/60
                        transition-colors
                        duration-300
                      "
                    >
                      {episode.category}
                    </span>
                  </div>

                  {/* =================================================
                      PLAY BUTTON
                  ================================================= */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(index + 1);
                    }}
                    aria-label={
                      playingEpisode === index + 1
                        ? `Pause ${episode.title}`
                        : `Play ${episode.title}`
                    }
                    className="
                      relative
                      w-10
                      h-10
                      rounded-full
                      border
                      border-[#C5A065]/50
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                      transition-all
                      duration-500
                      hover:bg-[#C5A065]
                      hover:border-[#C5A065]
                      hover:scale-105
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-[-4px]
                        rounded-full
                        border
                        border-[#C5A065]/0
                        group-hover:border-[#C5A065]/20
                        group-hover:scale-110
                        transition-all
                        duration-500
                      "
                    />

                    {playingEpisode === index + 1 ? (
                      <Pause
                        size={16}
                        className="
                          relative
                          z-10
                          text-[#C5A065]
                          group-hover:text-white
                          transition-colors
                          duration-300
                        "
                      />
                    ) : (
                      <Play
                        size={16}
                        className="
                          relative
                          z-10
                          text-[#C5A065]
                          ml-0.5
                          group-hover:text-white
                          transition-colors
                          duration-300
                        "
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}