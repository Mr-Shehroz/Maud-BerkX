'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#B08C5A';

export default function JournalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journal-label',
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.journal-heading',
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>('.journal-card')
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              delay: (i % 3) * 0.12,
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
              },
            }
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const articles = [
    {
      title: 'The Quiet Power of Editorial Essays',
      img: 'wisdom-1.png',
    },
    {
      title: 'The Quiet Power of Kingdom Leaders Essays',
      img: 'about-4.png',
    },
    {
      title: 'The Quiet Power of Kingdom Leadership',
      img: 'about-5.png',
    },
    {
      title: 'The Grace Stewards Emerald for Editorial Essays',
      img: 'about-3.png',
    },
    {
      title: 'The Quiet Photograph of Editorial Essays',
      img: 'about-1.png',
    },
    {
      title: 'The Quiet Power of Kingdom Leadership for Premiums',
      img: 'wisdom-2.png',
    },
    {
      title: 'The Quiet Power of Kingdom Leadership',
      img: 'wisdom-3.png',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#282828] py-24 md:py-32"
    >
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(
            ellipse 60% 40% at 50% 20%,
            ${GOLD}1a,
            transparent 70%
          )`,
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-14">
          <p
            className="journal-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-5"
            style={{
              fontFamily: 'var(--font-hanken), sans-serif',
            }}
          >
            Journal &amp; Essays
          </p>

          <h2
            className="journal-heading text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal"
            style={{
              fontFamily: 'var(--font-eb-garamond), serif',
            }}
          >
            Wisdom Journal
          </h2>
        </div>

        {/* MASONRY */}
        <div
          className="
            columns-1
            sm:columns-2
            lg:columns-3
            gap-6
            md:gap-8
            [column-fill:_balance]
          "
        >
          {articles.map((article, i) => (
            <article
              key={i}
              className="
                journal-card
                group
                mb-8
                md:mb-10
                break-inside-avoid
              "
            >

              {/* IMAGE */}
              <div
                className="
                  relative
                  overflow-hidden
                  mb-4
                  border
                  border-[#DDD9CE]/10
                  bg-[#1f1f1f]
                "
              >
                <img
                  src={article.img}
                  alt={article.title}
                  className="
                    block
                    w-full
                    h-auto
                    object-contain
                    grayscale
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.02]
                  "
                />

                {/* Hover overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                    pointer-events-none
                  "
                  style={{
                    background: `linear-gradient(
                      to top,
                      ${GOLD}33,
                      transparent 60%
                    )`,
                  }}
                />
              </div>

              {/* TITLE */}
              <h3
                className="
                  text-[#F6F6F6]
                  text-lg
                  md:text-xl
                  leading-snug
                  mb-2
                  transition-colors
                  duration-300
                  group-hover:text-[#DDD9CE]
                "
                style={{
                  fontFamily:
                    'var(--font-eb-garamond), serif',
                }}
              >
                {article.title}
              </h3>

              {/* READ MORE */}
              <a
                href="/journal/article"
                className="
                  text-xs
                  tracking-[0.15em]
                  uppercase
                  inline-block
                  pb-0.5
                  border-b
                  transition-colors
                  duration-300
                "
                style={{
                  color: GOLD,
                  borderColor: `${GOLD}55`,
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                Read More
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}