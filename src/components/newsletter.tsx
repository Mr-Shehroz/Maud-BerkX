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
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.from('.join-heading', { opacity: 0, y: 40, duration: 1.2 })
        .from('.join-subtext', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
        .from('.join-form-group', { opacity: 0, y: 30, duration: 1 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#121212] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A065]/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        
        {/* Heading */}
        <h2 
          className="join-heading text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6 tracking-tight"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          Join the Inner Circle
        </h2>

        {/* Subtext */}
        <p 
          className="join-subtext text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16"
          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
          Curated wisdom, exclusive insights, and a community of women building Kingdom legacy together.
        </p>

        {/* Form Group */}
        <div className="join-form-group flex flex-col sm:flex-row gap-4 max-w-xl mx-auto items-center justify-center">
          
          {/* Email Input */}
          <div className="relative w-full sm:flex-1 group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#C5A065]" />
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A065] transition-all duration-300"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            />
          </div>

          {/* Gold CTA Button */}
          <button 
            type="submit"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#C5A065] text-[#121212] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#D4B07A] transition-all duration-300 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="flex items-center gap-2">
              Request Invitation
              <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

        </div>

        {/* Trust Note */}
        <p className="mt-8 text-gray-600 text-xs tracking-wide">
          No spam. Unsubscribe anytime.
        </p>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
}