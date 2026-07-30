'use client';
import { useEffect, useRef, useState } from 'react';

const GOLD = '#C5A065';

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

export default function PodcastSubscribe() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Wire this up to your existing newsletter provider
    setSubmitted(true);
  };

  return (
    <section className="relative bg-[#121212] py-24 md:py-32">
      <div className="w-full max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] border border-white/10 rounded-md overflow-hidden transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Image panel */}
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200"
              alt="Behind the mic at the Voices of Influence podcast"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#121212]" />

            {/* Episode count callout, anchors the image with real content */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <p
                className="text-4xl md:text-5xl font-normal text-white leading-none"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                47
              </p>
              <p className="text-xs tracking-[0.2em] uppercase mt-2" style={{ color: GOLD }}>
                Episodes and counting
              </p>
            </div>
          </div>

          {/* Content panel */}
          <div className="bg-[#161513] p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            <p
              className="text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
              style={{ color: GOLD }}
            >
              Never Miss an Episode
            </p>

            <h2
              className="text-white text-3xl sm:text-4xl md:text-[2.75rem] font-normal leading-[1.15] mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              New episodes, delivered quietly.
            </h2>

            <p className="text-white/60 text-base leading-relaxed font-light mb-10 max-w-md">
              Join the Inner Circle to be the first to hear each new conversation,
              along with reflections that don't make it into the show notes.
            </p>

            {submitted ? (
              <p className="text-base" style={{ color: GOLD }}>
                You're on the list. Look out for Episode 48 in your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent border-b border-white/25 focus:border-[color:var(--gold)] outline-none text-white placeholder-white/35 text-sm py-3 transition-colors duration-300"
                    style={{ ['--gold' as string]: GOLD }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center justify-center px-8 py-3 rounded-full text-sm tracking-wide uppercase font-medium transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_30px_rgba(197,160,101,0.35)] hover:-translate-y-0.5"
                    style={{ backgroundColor: GOLD, color: '#121212' }}
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-white/35 text-xs">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}