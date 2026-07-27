'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, BookOpen, Globe, Crown, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FaithVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section Label
      gsap.fromTo('.fv-label', 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.fv-label', start: 'top 85%' } }
      );

      // Timeline Items Stagger
      gsap.fromTo('.timeline-item', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' }
        }
      );

      // Timeline Line Animation
      gsap.fromTo('.timeline-line', 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          duration: 1.5, 
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 70%', end: 'bottom 70%', scrub: 1 }
        }
      );

      // Quote Section Animations
      gsap.fromTo('.quote-image', 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.quote-section', start: 'top 75%' } }
      );

      gsap.fromTo('.quote-content', 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.quote-section', start: 'top 75%' }, delay: 0.2 }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      year: '2012',
      title: 'THE FOUNDATION',
      desc: 'A vision of purposeful leadership takes root.',
      icon: Compass
    },
    {
      year: '2018',
      title: 'DEEPENING FAITH',
      desc: 'Wisdom becomes the core. The Kingdom focus emerges.',
      icon: BookOpen
    },
    {
      year: '2023',
      title: 'EXPANDING IMPACT',
      desc: 'The global community finds leadership with grace.',
      icon: Globe
    },
    {
      year: '2026',
      title: 'KINGDOM LEGACY',
      desc: 'Vision and wisdom are codified for future generations.',
      icon: Crown
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#F6F6F6] overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F6F6] via-[#DDD9CE]/30 to-[#F6F6F6] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 py-24 md:py-32 lg:py-40">
        
        {/* Section Label */}
        <div className="fv-label mb-20 md:mb-32">
          <p 
            className="text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            04 — Faith & Vision
          </p>
        </div>

        {/* VERTICAL TIMELINE */}
        <div className="timeline-container relative mb-32 md:mb-48">
          {/* Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#282828]/20 transform md:-translate-x-1/2 origin-top timeline-line"></div>

          <div className="space-y-16 md:space-y-24">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Node/Dot on the line */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#F6F6F6] border-2 border-[#583929]/50 flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(88,57,41,0.3)]">
                    <div className="w-2 h-2 rounded-full bg-[#583929]"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="group relative bg-white border border-[#282828]/10 p-8 md:p-10 rounded-sm hover:border-[#583929]/40 hover:shadow-xl transition-all duration-500">
                      {/* Icon inside card */}
                      <div className={`flex items-center gap-4 mb-6 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 rounded-full border border-[#583929]/30 flex items-center justify-center group-hover:border-[#583929] transition-colors duration-500">
                          <Icon size={20} className="text-[#583929]" strokeWidth={1.5} />
                        </div>
                        <span 
                          className="text-[#583929] text-sm tracking-widest font-semibold"
                          style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                        >
                          {item.year}
                        </span>
                      </div>
                      
                      <h3 
                        className="text-[#282828] text-xl md:text-2xl font-semibold tracking-wide mb-4"
                        style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-[#453E33]/80 text-sm md:text-base leading-relaxed"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUOTE / VISION SECTION */}
        <div className="quote-section grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-12 border-t border-[#282828]/10">
          
          {/* Left: Image */}
          <div className="quote-image relative">
            <div className="overflow-hidden rounded-sm">
              <img 
                src="/banner.webp"
                alt="Maud Berkx Vision"
                className="w-full h-[500px] md:h-[600px] object-cover object-top"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 text-[#583929]/20">
              <Star size={64} fill="currentColor" />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="quote-content space-y-8 lg:pl-8">
            <h2 
              className="text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] md:leading-[1.2]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              We build. We serve.<br />
              We lead with love.<br />
              <span className="italic text-[#583929]">For the Glory of the King.</span>
            </h2>

            <div className="pt-8">
              <p 
                className="text-[#583929] text-5xl md:text-6xl mb-8"
                style={{ fontFamily: 'var(--font-signature), cursive' }}
              >
                Maud Berkx
              </p>
              
              <a 
                href="/vision"
                className="group inline-flex items-center gap-3 text-[#282828] text-sm md:text-base hover:text-[#583929] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="border-b border-[#282828]/50 group-hover:border-[#583929] transition-colors duration-300 pb-1">
                  Continue the Journey.
                </span>
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}