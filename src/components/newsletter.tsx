'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function JoinSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Animate left and right columns separately for a premium feel
      tl.from('.join-left-col', { opacity: 0, x: -40, duration: 1 })
        .from('.join-right-col', { opacity: 0, x: 40, duration: 1 }, '-=0.8')
        .from('.join-label', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
        .from('.join-heading', { opacity: 0, y: 24, duration: 1 }, '-=0.6')
        .from('.join-subtext', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
        .from('.join-form', { opacity: 0, y: 24, duration: 1 }, '-=0.6')
        .from('.join-trust', { opacity: 0, y: 12, duration: 0.8 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0F0F0F] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      {/* Single, elegant top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A065]/40 to-transparent"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Heading & Subtext with Short Gold Strip (Patti) */}
          <div className="join-left-col lg:col-span-5">
            <div className="flex items-start gap-6">
              {/* Short vertical gold strip */}
              <div className="w-1 h-12 md:h-16 bg-[#C5A065] rounded-full shrink-0 mt-2"></div>
              
              <div>
                <span 
                  className="join-label inline-block text-[#C5A065] text-xs font-medium tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  The Newsletter
                </span>

                <h2 
                  className="join-heading text-white text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  Join the <br className="hidden md:block" /> Inner Circle
                </h2>

                <p 
                  className="join-subtext text-gray-400 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  Curated wisdom, exclusive insights, and a community of women building a Kingdom legacy together.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="join-right-col lg:col-span-7 lg:pl-12">
            <form className="join-form flex flex-col sm:flex-row gap-4 mb-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1 group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#C5A065]" />
                <input 
                  type="email" 
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A065]/60 focus:bg-white/[0.02] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                />
              </div>
              
              <button 
                type="submit"
                className="group relative px-8 py-4 bg-[#C5A065] text-[#0F0F0F] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-[#D4B07A] transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span>Request Invitation</span>
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Understated Trust Note */}
            <p className="join-trust text-gray-600 text-xs tracking-wide flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}