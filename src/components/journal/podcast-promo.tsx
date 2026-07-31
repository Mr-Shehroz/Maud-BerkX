'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const INK = '#282828';

const episodes = [
  { num: '12', title: 'Walking in Divine Timing', duration: '38 min' },
  { num: '11', title: 'The Quiet Power of Kingdom Leadership', duration: '44 min' },
  { num: '10', title: 'Building Legacy Beyond Your Lifetime', duration: '41 min' },
];

export default function PodcastPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Reliable gsap.from animations
      gsap.from('.pp-kicker', { 
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.from('.pp-line', { 
        yPercent: 110, duration: 1.2, stagger: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: '.pp-heading', start: 'top 80%' }
      });

      gsap.from('.pp-sub', { 
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-heading', start: 'top 80%' }, delay: 0.2
      });

      gsap.from('.pp-cta', { 
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-heading', start: 'top 80%' }, delay: 0.4
      });

      gsap.from('.pp-player-card', { 
        opacity: 0, x: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-player-wrapper', start: 'top 80%' }
      });

      gsap.from('.pp-bar', { 
        scaleY: 0.2, duration: 0.8, stagger: 0.05, ease: 'power2.out', transformOrigin: 'bottom center',
        scrollTrigger: { trigger: '.pp-player-wrapper', start: 'top 80%' }, delay: 0.3
      });

      gsap.from('.pp-episode', { 
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-episodes', start: 'top 85%' }
    });

      // Gentle idle pulse for the waveform
      if (barsRef.current) {
        gsap.to(barsRef.current.querySelectorAll('.pp-bar'), {
          scaleY: () => 0.4 + Math.random() * 0.6,
          duration: 1.1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.12, from: 'random' },
          delay: 1.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      {/* Subtle texture matching other light sections */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: `radial-gradient(#2828280d 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* LEFT — The Invitation */}
          <div>
            <p
              className="pp-kicker text-[#C5A065] text-xs md:text-sm tracking-[0.35em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              — The Podcast
            </p>

            <h2
              className="pp-heading text-[#282828] text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-normal leading-[1.15] mb-8"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="pp-line block">Some seasons call for</span>
              </span>
              <span className="block overflow-hidden">
                <span className="pp-line block italic" style={{ color: GOLD }}>
                  reading. Others, for a voice
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="pp-line block">in your ear.</span>
              </span>
            </h2>

            <p
              className="pp-sub text-[#453E33]/70 text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              The same essays, spoken aloud — conversations on faith,
              leadership, and building something that lasts, for the drive,
              the walk, or the quiet morning before everyone wakes.
            </p>

            <a
              href="/podcast"
              className="pp-cta group inline-flex items-center gap-3 text-[#282828] text-sm md:text-base font-medium transition-colors duration-300 hover:text-[#C5A065]"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              <span className="border-b border-[#282828]/40 pb-1 transition-colors duration-300 group-hover:border-[#C5A065]">
                Listen to the Podcast
              </span>
              <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* RIGHT — Player & Episodes */}
          <div className="pp-player-wrapper">
            
            {/* Elegant Player Card */}
            <div className="pp-player-card relative bg-white border border-[#282828]/5 rounded-sm p-8 md:p-10 mb-8 shadow-[0_20px_60px_-20px_rgba(40,40,40,0.08)]">
              <div className="flex items-center gap-6 md:gap-8">
                {/* Play Button Visual */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center rounded-full bg-[#F6F6F6] border border-[#282828]/10 group cursor-pointer hover:border-[#C5A065]/50 transition-colors duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C5A065] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#C5A065]/20">
                    <Play size={24} className="text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Audio Waveform */}
                <div className="flex-1">
                  <p className="text-[#C5A065] text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    Now Playing
                  </p>
                  <div ref={barsRef} className="flex items-end gap-1.5 h-12 md:h-16">
                    {[0.5, 0.8, 0.35, 1, 0.6, 0.9, 0.4, 0.75, 0.55, 0.85, 0.45, 0.7].map((h, i) => (
                      <span
                        key={i}
                        className="pp-bar w-1.5 md:w-2 rounded-full origin-bottom"
                        style={{
                          height: `${h * 100}%`,
                          backgroundColor: i % 2 === 0 ? GOLD : 'rgba(88, 57, 41, 0.25)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Episodes List */}
            <div className="pp-episodes">
              <p className="text-[#453E33]/50 text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                Recent Episodes
              </p>
              <div className="divide-y divide-[#282828]/10 border-t border-[#282828]/10">
                {episodes.map((ep) => (
                  <div
                    key={ep.num}
                    className="pp-episode group flex items-baseline justify-between gap-4 py-5 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
                      <span
                        className="text-sm italic flex-shrink-0 w-6"
                        style={{ fontFamily: 'var(--font-eb-garamond), serif', color: GOLD }}
                      >
                        {ep.num}
                      </span>
                      <span
                        className="text-[#282828] text-sm md:text-base truncate transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C5A065]"
                        style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                      >
                        {ep.title}
                      </span>
                    </div>
                    <span
                      className="text-[#453E33]/50 text-xs flex-shrink-0 font-medium"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {ep.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}