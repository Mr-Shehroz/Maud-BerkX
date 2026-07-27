'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.test-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.test-label', start: 'top 85%' } }
      );

      gsap.fromTo('.test-heading', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.test-heading', start: 'top 85%' }, delay: 0.1 }
      );

      gsap.fromTo('.test-swiper-container', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.test-swiper-container', start: 'top 80%' }, delay: 0.3 }
      );

      gsap.fromTo('.test-footer', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.test-footer', start: 'top 90%' }, delay: 0.5 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Maud's mentorship didn't just change my business; it transformed my entire approach to leadership. She helped me align my professional ambitions with my faith, creating a legacy that truly matters.",
      name: "Elena Rostova",
      role: "Founder, Lumina Enterprises",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "In a world of fleeting trends, Maud offers timeless wisdom. Her guidance gave me the courage to lead with grace and the strategic clarity to build an enduring impact for my community.",
      name: "Dr. Sarah Jenkins",
      role: "Executive Director, Global Hope Initiative",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Working with Maud was a profound experience. She sees the potential in you that you often cannot see in yourself. Her faith-driven approach is both deeply comforting and incredibly empowering.",
      name: "Amara Okafor",
      role: "CEO, Heritage & Grace Consulting",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle Background Glow for Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#583929]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p 
            className="test-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            05 — Voices of Influence
          </p>
          <h2 
            className="test-heading text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Stories of Transformation
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="test-swiper-container relative max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            speed={1000}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            onInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className="!pb-16"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center px-4 md:px-12 py-8">
                  
                  {/* Elegant Large Typographic Quote Mark */}
                  <div className="mb-4 md:mb-8 select-none">
                    <span 
                      className="text-[#583929]/40 text-8xl md:text-9xl leading-none"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      “
                    </span>
                  </div>

                  {/* Quote Text */}
                  <blockquote 
                    className="text-[#F6F6F6] text-2xl md:text-3xl lg:text-4xl leading-[1.3] md:leading-[1.4] font-normal mb-12 max-w-4xl"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {item.quote}
                  </blockquote>

                  {/* Author Info - Refined Horizontal Layout */}
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-[#DDD9CE]/20 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="text-left">
                      <h4 
                        className="text-[#F6F6F6] text-base md:text-lg font-semibold tracking-wide"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {item.name}
                      </h4>
                      <p 
                        className="text-[#DDD9CE]/60 text-sm md:text-base mt-0.5"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Minimal Navigation & Pagination */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <button 
              ref={prevRef}
              className="w-12 h-12 rounded-full border border-[#DDD9CE]/20 flex items-center justify-center text-[#DDD9CE] hover:bg-[#DDD9CE] hover:text-[#282828] transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-300 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div className="swiper-pagination-custom flex gap-2"></div>
            
            <button 
              ref={nextRef}
              className="w-12 h-12 rounded-full border border-[#DDD9CE]/20 flex items-center justify-center text-[#DDD9CE] hover:bg-[#DDD9CE] hover:text-[#282828] transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer: Signature & CTA */}
        <div className="test-footer flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 mt-16 border-t border-[#DDD9CE]/10">
          <p 
            className="text-[#DDD9CE] text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-signature), cursive' }}
          >
            Maud Berkx
          </p>

          <a 
            href="/community"
            className="group flex items-center gap-3 text-[#F6F6F6] text-sm md:text-base hover:text-[#DDD9CE] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b border-[#F6F6F6]/50 group-hover:border-[#DDD9CE] transition-colors duration-300 pb-1">
              Join the Community
            </span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: #DDD9CE;
          opacity: 0.3;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .swiper-pagination-bullet-active-custom {
          opacity: 1;
          width: 32px;
          border-radius: 4px;
          background: #583929;
        }
      `}</style>
    </section>
  );
}