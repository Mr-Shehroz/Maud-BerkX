'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textItems = gsap.utils.toArray<HTMLElement>('.story-text-item');
      
      textItems.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f6f6f6] py-32 lg:py-48">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Image */}
          <div className="relative h-[600px] lg:h-[800px] sticky top-32">
            <div className="w-full h-full rounded-tl-[120px] rounded-br-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
                alt="Leadership and Faith" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 border border-[#475d66]/30 rounded-full"></div>
          </div>

          {/* Right: Scrolling Text Content */}
          <div className="space-y-32 lg:space-y-48 pt-20 lg:pt-40">
            <div className="story-text-item">
              <span className="font-dm-sans text-[10px] tracking-[0.3em] text-[#475d66] uppercase mb-6 block">Her Journey</span>
              <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[#282828] leading-[1.1] mb-8">
                From searching <span className="italic text-[#583929]">to finding.</span>
              </h2>
              <p className="font-dm-sans text-lg text-[#453e33] leading-relaxed max-w-lg">
                Maud's journey wasn't a straight line. It was a deep search for truth, identity, and purpose that eventually led her back to faith and a calling to empower women.
              </p>
            </div>

            <div className="story-text-item">
              <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[#282828] leading-[1.1] mb-8">
                Building a <span className="italic text-[#583929]">Kingdom Legacy.</span>
              </h2>
              <p className="font-dm-sans text-lg text-[#453e33] leading-relaxed max-w-lg">
                Today, she empowers women to step into their God-given identity, leading with wisdom, grace, and unwavering faith in every area of life.
              </p>
            </div>

            <div className="story-text-item">
              <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[#282828] leading-[1.1] mb-8">
                Faith, Wisdom <span className="italic text-[#583929]">& Leadership.</span>
              </h2>
              <p className="font-dm-sans text-lg text-[#453e33] leading-relaxed max-w-lg">
                It's not just about business. It's about building a life and a legacy that honors God and impacts generations to come.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}