'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function ContactAvailabilitySection() {
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

      // Animate left and right columns separately for a premium, dynamic feel
      tl.from('.ca-left-col', { opacity: 0, x: -40, duration: 1 })
        .from('.ca-right-col', { opacity: 0, x: 40, duration: 1 }, '-=0.8')
        .from('.ca-label', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
        .from('.ca-heading', { opacity: 0, y: 24, duration: 1 }, '-=0.6')
        .from('.ca-subtext', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
        .from('.ca-action-box', { opacity: 0, y: 24, duration: 1 }, '-=0.6')
        .from('.ca-trust', { opacity: 0, y: 12, duration: 0.8 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-[60px] md:py-[90px] lg:py-[110px] overflow-hidden"
    >
      {/* Single, elegant top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A065]/50 to-transparent"></div>
      
      {/* Subtle ambient glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A065]/[0.03] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Heading & Subtext with Bold Gold Strip */}
          <div className="ca-left-col lg:col-span-5">
            <div className="flex items-start gap-6 md:gap-8">
              {/* Bold vertical gold strip (The "Furious" Luxury Detail) */}
              <div className="w-1 h-16 md:h-20 bg-[#C5A065] rounded-full shrink-0 mt-1 shadow-[0_0_20px_rgba(197,160,101,0.4)]"></div>
              
              <div>
                <span 
                  className="ca-label inline-block text-[#C5A065] text-xs font-medium tracking-[0.35em] uppercase mb-5"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  04 — Availability
                </span>

                <h2 
                  className="ca-heading text-white text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight leading-[1.1]"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  Based in Amsterdam.
                  <br className="hidden md:block" />
                  <span className="italic text-[#C5A065]">Available wherever the work calls.</span>
                </h2>

                <p 
                  className="ca-subtext text-gray-400 text-base md:text-lg leading-relaxed max-w-md"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  Maud travels internationally for speaking engagements, retreats, and select in-person mentorship. 
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Action Box & Details */}
          <div className="ca-right-col lg:col-span-7 lg:pl-12">
            <div className="ca-action-box relative bg-[#111111] border border-white/[0.06] rounded-sm p-8 md:p-10 backdrop-blur-sm">
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none"></div>

              <div className="relative z-10">
                {/* Location Badges */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-sm">
                    <MapPin size={16} className="text-[#C5A065]" />
                    <span className="text-gray-300 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                      Amsterdam, NL
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-sm">
                    <Globe size={16} className="text-[#C5A065]" />
                    <span className="text-gray-300 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                      Global Travel
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <a
                  href="mailto:hello@maudberkx.com"
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#C5A065] text-[#0A0A0A] text-xs md:text-sm font-semibold uppercase tracking-[0.25em] rounded-sm hover:bg-white transition-all duration-500 overflow-hidden"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    hello@maudberkx.com
                    <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </a>

                {/* Trust Note */}
                <p className="ca-trust text-gray-500 text-xs tracking-wide flex items-center gap-2 mt-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A065]"></span>
                  Personally read. Typically replies within 2–3 business days.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}