'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const GOLD = '#C5A065';
const NAVY = '#0B0730';
const CREAM = '#FAF9F6';
const TEXT = '#5F5B6B';

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

      return () => clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}

export default function PodcastSubscribe() {
  const { ref, visible } = useRevealOnScroll();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    // Connect newsletter provider here
    setSubmitted(true);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: CREAM,
      }}
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 70% at 0% 50%,
              ${GOLD}08,
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 60% at 100% 50%,
              ${NAVY}04,
              transparent 70%
            )
          `,
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-8 py-20 md:py-28 lg:py-32">

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0)'
              : 'translateY(30px)',
            transition:
              'opacity 900ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >

          {/* =================================================
              LEFT — PODCAST VISUAL
          ================================================= */}

          <div className="lg:col-span-5">

            <div
              className="
                relative
                h-[420px]
                md:h-[500px]
                overflow-hidden
                border
              "
              style={{
                borderColor: `${NAVY}15`,
                backgroundColor: NAVY,
              }}
            >

              {/* Image */}

              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=85&w=1000"
                alt="Podcast microphone"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  grayscale
                  opacity-75
                  transition-transform
                  duration-[1200ms]
                  hover:scale-105
                "
              />

              {/* Navy overlay */}

              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(
                      to bottom,
                      rgba(11,7,48,0.15),
                      rgba(11,7,48,0.35),
                      rgba(11,7,48,0.92)
                    )
                  `,
                }}
              />

              {/* Gold frame */}

              <div
                className="absolute inset-5 md:inset-7 pointer-events-none"
                style={{
                  border: `1px solid ${GOLD}55`,
                }}
              />

              {/* Top label */}

              <div className="absolute top-8 left-8 md:top-10 md:left-10">

                <div className="flex items-center gap-3">

                  <span
                    className="w-9 h-px"
                    style={{
                      backgroundColor: GOLD,
                    }}
                  />

                  <span
                    className="text-[9px] tracking-[0.3em] uppercase text-white"
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    The Inner Circle
                  </span>

                </div>

              </div>

              {/* Episode count */}

              <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">

                <p
                  className="text-6xl md:text-7xl text-white leading-none"
                  style={{
                    fontFamily:
                      'var(--font-eb-garamond), serif',
                  }}
                >
                  47
                </p>

                <div
                  className="w-10 h-px my-3"
                  style={{
                    backgroundColor: GOLD,
                  }}
                />

                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/65"
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  Episodes and counting
                </p>

              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT — SUBSCRIBE CONTENT
          ================================================= */}

          <div className="lg:col-span-7 lg:pl-8 xl:pl-12">

            <div className="flex items-start gap-6">

              {/* Gold vertical strip */}

              <div
                className="
                  w-1
                  h-16
                  md:h-20
                  shrink-0
                  mt-2
                "
                style={{
                  backgroundColor: GOLD,
                }}
              />

              <div className="flex-1">

                {/* Label */}

                <span
                  className="inline-block text-[#C5A065] text-xs font-medium tracking-[0.3em] uppercase mb-4"
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  Never Miss an Episode
                </span>

                {/* Heading */}

                <h2
                  className="
                    text-[#0B0730]
                    text-4xl
                    md:text-5xl
                    xl:text-6xl
                    font-normal
                    mb-6
                    tracking-tight
                    leading-[1.08]
                  "
                  style={{
                    fontFamily:
                      'var(--font-eb-garamond), serif',
                  }}
                >
                  New conversations,
                  <br />

                  <span className="italic">
                    delivered quietly.
                  </span>
                </h2>

                {/* Description */}

                <p
                  className="
                    text-[#5F5B6B]
                    text-base
                    md:text-lg
                    leading-relaxed
                    max-w-xl
                    mb-9
                  "
                  style={{
                    fontFamily:
                      'var(--font-hanken), sans-serif',
                  }}
                >
                  Join the Inner Circle to be the first to
                  hear each new conversation, along with
                  reflections that don't make it into the
                  show notes.
                </p>

                {/* =================================================
                    FORM
                ================================================= */}

                {submitted ? (

                  <div
                    className="
                      max-w-xl
                      p-5
                      border
                      bg-white/60
                    "
                    style={{
                      borderColor: `${GOLD}55`,
                    }}
                  >
                    <p
                      className="text-lg text-[#0B0730]"
                      style={{
                        fontFamily:
                          'var(--font-eb-garamond), serif',
                      }}
                    >
                      You're on the list.
                    </p>

                    <p
                      className="text-sm text-[#5F5B6B] mt-1"
                      style={{
                        fontFamily:
                          'var(--font-hanken), sans-serif',
                      }}
                    >
                      Look out for Episode 48 in your inbox.
                    </p>
                  </div>

                ) : (

                  <form
                    onSubmit={handleSubmit}
                    className="max-w-xl"
                  >

                    <div className="flex flex-col sm:flex-row gap-4">

                      {/* Email */}

                      <div className="relative flex-1 group">

                        <Mail
                          size={17}
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-[#9B97A5]
                            transition-colors
                            duration-300
                            group-focus-within:text-[#C5A065]
                          "
                        />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Your email address"
                          className="
                            w-full
                            bg-white/60
                            border
                            border-[#0B0730]/10
                            rounded-sm
                            py-4
                            pl-12
                            pr-4
                            text-[#0B0730]
                            placeholder:text-[#9B97A5]
                            focus:outline-none
                            focus:border-[#C5A065]/70
                            focus:bg-white
                            transition-all
                            duration-300
                          "
                          style={{
                            fontFamily:
                              'var(--font-hanken), sans-serif',
                          }}
                        />

                      </div>

                      {/* Button */}

                      <button
                        type="submit"
                        className="
                          group
                          relative
                          px-8
                          py-4
                          bg-[#C5A065]
                          text-[#0B0730]
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          rounded-sm
                          hover:bg-[#D4B07A]
                          transition-colors
                          duration-300
                          flex
                          items-center
                          justify-center
                          gap-2
                          whitespace-nowrap
                        "
                        style={{
                          fontFamily:
                            'var(--font-hanken), sans-serif',
                        }}
                      >
                        <span>
                          Subscribe
                        </span>

                        <ArrowRight
                          size={16}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        />

                      </button>

                    </div>

                    {/* Privacy */}

                    <p
                      className="
                        text-[#8A8792]
                        text-xs
                        tracking-wide
                        flex
                        items-center
                        gap-2
                        mt-5
                      "
                      style={{
                        fontFamily:
                          'var(--font-hanken), sans-serif',
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: `${GOLD}99`,
                        }}
                      />

                      We respect your privacy.
                      Unsubscribe at any time.
                    </p>

                  </form>

                )}

                {/* =================================================
                    BOTTOM META
                ================================================= */}

                <div className="flex flex-wrap items-center gap-4 mt-10">

                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#8A8792]"
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    Faith
                  </span>

                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: `${GOLD}70`,
                    }}
                  />

                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#8A8792]"
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    Wisdom
                  </span>

                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: `${GOLD}70`,
                    }}
                  />

                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#8A8792]"
                    style={{
                      fontFamily:
                        'var(--font-hanken), sans-serif',
                    }}
                  >
                    Leadership
                  </span>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}