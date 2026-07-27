'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animations
      gsap.fromTo('.news-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.news-label', start: 'top 85%' } }
      );

      gsap.fromTo('.news-heading', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.news-heading', start: 'top 85%' }, delay: 0.1 }
      );

      gsap.fromTo('.news-subtext', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.news-subtext', start: 'top 85%' }, delay: 0.2 }
      );

      gsap.fromTo('.news-form-container', 
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.news-form-container', start: 'top 80%' }, delay: 0.3 }
      );

      gsap.fromTo('.news-trust', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.news-trust', start: 'top 90%' }, delay: 0.5 }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F6F6] via-[#DDD9CE]/20 to-[#F6F6F6] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Elegant Invitation Card */}
        <div className="news-form-container max-w-4xl mx-auto bg-white border border-[#282828]/10 rounded-sm p-8 md:p-16 lg:p-20 shadow-[0_20px_60px_-15px_rgba(40,40,40,0.05)] relative overflow-hidden">
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#583929]/20"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#583929]/20"></div>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p 
              className="news-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              08 — The Invitation
            </p>
            <h2 
              className="news-heading text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Join the Inner Circle
            </h2>
            <p 
              className="news-subtext text-[#453E33]/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Receive weekly insights on faith, wisdom, and building a Kingdom legacy. 
              No noise, just grace and purpose delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-10" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#453E33]/40" />
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full bg-[#F6F6F6] border border-[#282828]/10 rounded-sm py-4 pl-12 pr-4 text-[#282828] placeholder:text-[#453E33]/40 focus:outline-none focus:border-[#583929] focus:ring-1 focus:ring-[#583929]/20 transition-all duration-300"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              />
            </div>
            <button 
              type="submit"
              className="group relative bg-[#282828] text-[#F6F6F6] px-8 py-4 rounded-sm font-medium tracking-wide hover:bg-[#583929] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Invitation
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="news-trust flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#453E33]/60 text-xs md:text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#583929]" />
              Weekly Kingdom insights
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#583929]" />
              Exclusive early access
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#583929]" />
              Unsubscribe anytime
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}