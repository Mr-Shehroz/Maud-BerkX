'use client';
import { useEffect, useRef, useState } from 'react';

const GOLD = '#C5A065';
const BG = '#F6F6F6';
const INK = '#282828';
const BODY = '#453E33';
const SANS = 'var(--font-hanken), sans-serif';
const SERIF = 'var(--font-eb-garamond), serif';

const CATEGORIES = [
  {
    title: 'Faith',
    description: 'Conversations on conviction, discernment, and walking in divine timing.',
    count: '14 episodes',
  },
  {
    title: 'Leadership',
    description: 'Quiet confidence, grace-filled decisions, and leading without losing yourself.',
    count: '19 episodes',
  },
  {
    title: 'Legacy',
    description: 'Building what outlasts a title — the long view on influence and impact.',
    count: '9 episodes',
  },
  {
    title: 'Stewardship',
    description: 'Ambition held with open hands, and resources managed with care.',
    count: '11 episodes',
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden" 
      style={{ backgroundColor: BG }}
    >
      {/* Subtle ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse at center, rgba(197, 160, 101, 0.08), transparent 70%)`,
        }}
      />

      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 relative z-10">

        {/* Header */}
        <div 
          className="mb-10 md:mb-14"
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-8" style={{ backgroundColor: GOLD }} />
            <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium" style={{ color: GOLD, fontFamily: SANS }}>
              Topics
            </p>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal leading-[1.15] max-w-2xl"
            style={{ fontFamily: SERIF, color: INK }}
          >
            Four threads, <br className="hidden md:block" />
            <span className="italic" style={{ color: GOLD }}>one conversation.</span>
          </h2>
        </div>

        {/* Editorial List */}
        <div className="flex flex-col">
          {CATEGORIES.map((cat, i) => (
            <CategoryRow 
              key={cat.title} 
              category={cat} 
              index={i + 1} 
              isVisible={isVisible} 
              delay={i * 120} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryRow({ category, index, isVisible, delay }: { 
  category: typeof CATEGORIES[0]; 
  index: number; 
  isVisible: boolean; 
  delay: number; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer border-b border-[#453E33]/10"
      style={{
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms, background-color 0.5s ease-out`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gold accent line on left edge */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
        style={{ 
          backgroundColor: GOLD,
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* 12-Column Grid Layout */}
      <div className="grid grid-cols-12 gap-y-4 md:gap-y-0 gap-x-4 md:gap-x-8 items-center py-8 md:py-10 px-4 md:px-6">
        
        {/* Number */}
        <div className="col-span-2 md:col-span-1 flex items-center">
          <span 
            className="text-xs md:text-sm tracking-[0.2em]"
            style={{ 
              color: isHovered ? GOLD : `${BODY}40`, 
              fontFamily: SANS,
              transition: 'color 0.4s ease-out'
            }}
          >
            {String(index).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-3">
          <h3 
            className="text-2xl md:text-3xl lg:text-4xl font-normal"
            style={{ 
              fontFamily: SERIF, 
              color: isHovered ? GOLD : INK,
              transition: 'color 0.4s ease-out'
            }}
          >
            {category.title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-6 md:pl-4">
          <p 
            className="text-sm md:text-[0.95rem] leading-relaxed"
            style={{ 
              color: isHovered ? BODY : `${BODY}80`, 
              fontFamily: SANS,
              transition: 'color 0.4s ease-out'
            }}
          >
            {category.description}
          </p>
        </div>

        {/* Meta & Arrow */}
        <div className="col-span-12 md:col-span-2 flex md:justify-end items-center gap-4 md:gap-6">
          <span 
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ 
              color: isHovered ? GOLD : `${BODY}50`, 
              fontFamily: SANS,
              transition: 'color 0.4s ease-out'
            }}
          >
            {category.count}
          </span>
          
          <div 
            className="w-9 h-9 rounded-full border flex items-center justify-center"
            style={{ 
              borderColor: isHovered ? GOLD : `${BODY}15`,
              backgroundColor: isHovered ? GOLD : 'transparent',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              style={{ 
                stroke: isHovered ? '#FFFFFF' : `${BODY}40`,
                transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}