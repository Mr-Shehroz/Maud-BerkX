'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Target, Heart, Lightbulb, Award, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.values-label', 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-label', start: 'top 85%' }
        }
      );

      gsap.fromTo('.values-heading', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-heading', start: 'top 85%' },
          delay: 0.2
        }
      );

      gsap.fromTo('.value-card', 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.value-card', start: 'top 85%' },
          delay: 0.3
        }
      );

      gsap.fromTo('.values-signature', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-signature', start: 'top 85%' },
          delay: 0.6
        }
      );

      gsap.fromTo('.values-cta', 
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.values-cta', start: 'top 85%' },
          delay: 0.7
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Shield,
      title: 'INTEGRITY',
      description: 'Serving with an unwavering commitment to trust, discretion, and the highest ethical standards.'
    },
    {
      icon: Target,
      title: 'PURPOSEFUL IMPACT',
      description: 'Developing enduring strategies that generate positive, lasting change for organizations and individuals.'
    },
    {
      icon: Heart,
      title: 'COMPASSIONATE LEADERSHIP',
      description: 'Empowering others with empathy, wisdom, and a vision for common good.'
    },
    {
      icon: Lightbulb,
      title: 'INNOVATIVE STEWARDSHIP',
      description: 'Finding creative solutions while respecting resources and managing legacy with care.'
    },
    {
      icon: Award,
      title: 'PROFESSIONAL EXCELLENCE',
      description: 'Relentless dedication to mastery and quality in every facet of our work.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Section Label */}
        <div className="values-label mb-8 md:mb-12">
          <p 
            className="text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            03 — Core Values
          </p>
        </div>

        {/* Main Heading */}
        <div className="values-heading mb-16 md:mb-20 text-center">
          <h2 
            className="text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            OUR CORE VALUES
          </h2>
        </div>

        {/* Values Grid - 3 on top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-6xl mx-auto">
          {values.slice(0, 3).map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="value-card group bg-[#453E33]/30 border border-[#DDD9CE]/20 rounded-sm p-8 md:p-10 hover:border-[#DDD9CE]/60 hover:bg-[#453E33]/50 transition-all duration-500"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 border border-[#DDD9CE]/40 rounded-full flex items-center justify-center mb-6 group-hover:border-[#DDD9CE] group-hover:bg-[#DDD9CE] transition-all duration-500">
                  <Icon size={24} className="text-[#DDD9CE] group-hover:text-[#282828] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 
                  className="text-[#F6F6F6] text-base md:text-lg font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-[#DDD9CE]/80 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-4xl mx-auto">
          {values.slice(3, 5).map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index + 3}
                className="value-card group bg-[#453E33]/30 border border-[#DDD9CE]/20 rounded-sm p-8 md:p-10 hover:border-[#DDD9CE]/60 hover:bg-[#453E33]/50 transition-all duration-500"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 border border-[#DDD9CE]/40 rounded-full flex items-center justify-center mb-6 group-hover:border-[#DDD9CE] group-hover:bg-[#DDD9CE] transition-all duration-500">
                  <Icon size={24} className="text-[#DDD9CE] group-hover:text-[#282828] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 
                  className="text-[#F6F6F6] text-base md:text-lg font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-[#DDD9CE]/80 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Signature and CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-[#DDD9CE]/20">
          
          <div className="values-signature">
            <p 
              className="text-[#DDD9CE] text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-signature), cursive' }}
            >
              Maud Berkx
            </p>
          </div>

          <a 
            href="/values"
            className="values-cta group flex items-center gap-3 text-[#F6F6F6] text-sm md:text-base hover:text-[#DDD9CE] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b border-[#F6F6F6]/50 group-hover:border-[#DDD9CE] transition-colors duration-300 pb-0.5">
              Learn More about Our Approach
            </span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>

        </div>
      </div>
    </section>
  );
}