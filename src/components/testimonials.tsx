'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.test-label', { 
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.test-label', start: 'top 85%' }
      });

      gsap.from('.test-heading', { 
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.test-heading', start: 'top 85%' }, delay: 0.1
      });

      gsap.from('.test-swiper-container', { 
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.test-swiper-container', start: 'top 80%' }, delay: 0.2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "Maud's mentorship didn't just change my business; it transformed my entire approach to leadership. She helped me align my professional ambitions with my faith.",
      name: "Elena Rostova",
      role: "Founder, Lumina Enterprises",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "In a world of fleeting trends, Maud offers timeless wisdom. Her guidance gave me the courage to lead with grace and the strategic clarity to build an enduring impact.",
      name: "Dr. Sarah Jenkins",
      role: "Executive Director, Global Hope Initiative",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "Working with Maud was a profound experience. She sees the potential in you that you often cannot see in yourself. Her faith-driven approach is deeply empowering.",
      name: "Amara Okafor",
      role: "CEO, Heritage & Grace Consulting",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "Maud combines spiritual depth with practical strategy in a way I've never experienced. She helped me build a legacy that will impact generations to come.",
      name: "Catherine Williams",
      role: "President, Williams Foundation",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "The transformation I experienced under Maud's guidance was remarkable. She helped me discover my true voice as a leader rooted in faith and purpose.",
      name: "Rachel Thompson",
      role: "Founder, Grace & Growth Co.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
    },
    {
      quote: "Maud's wisdom and insight helped me navigate the most challenging season of my leadership journey. Her mentorship is a gift I will always treasure.",
      name: "Victoria Chen",
      role: "CEO, Ascend International",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#C5A065]/10 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#C5A065]/10 rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Header with Navigation Arrows - Top Right */}
        <div className="relative mb-16 md:mb-20">
          {/* Header Content */}
          <div className="text-center">
            <p 
              className="test-label text-[#C5A065] text-xs md:text-sm tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              05 — Testimonials
            </p>
            <h2 
              className="test-heading text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal mb-6"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Stories of Transformation
            </h2>
            {/* Gold accent line */}
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#C5A065]/40"></span>
              <span className="w-2 h-2 rounded-full bg-[#C5A065]"></span>
              <span className="h-px w-12 bg-[#C5A065]/40"></span>
            </div>
          </div>

          {/* Navigation Arrows - Top Right */}
          <div className="absolute top-[13vh] right-0 flex items-center gap-3">
            <button 
              ref={prevRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#282828]/20 flex items-center justify-center text-gray-600 hover:bg-[#C5A065] hover:border-[#C5A065] hover:text-white transition-all duration-500 group"
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              ref={nextRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#282828]/20 flex items-center justify-center text-gray-600 hover:bg-[#C5A065] hover:border-[#C5A065] hover:text-white transition-all duration-500 group"
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="test-swiper-container relative px-4 md:px-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={800}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            // FIX: Use onBeforeInit to attach navigation elements reliably
            onBeforeInit={(swiper: any) => {
              if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            className="test-swiper !pb-20"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <div className="group h-full bg-white border border-[#282828]/10 rounded-sm p-8 md:p-10 transition-all duration-500 hover:border-[#C5A065]/40 hover:shadow-[0_20px_60px_-15px_rgba(197,160,101,0.15)]">
                    
                    {/* Large decorative editorial quote mark */}
                    <div className="absolute top-6 left-8 text-[#C5A065]/20 text-8xl font-serif leading-none select-none pointer-events-none">
                      "
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Quote Text */}
                      <blockquote 
                        className="text-[#453E33]/80 text-lg md:text-xl leading-relaxed mb-8 flex-grow italic"
                        style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                      >
                        {item.quote}
                      </blockquote>

                      {/* Subtle Divider */}
                      <div className="w-12 h-px bg-[#C5A065]/40 mb-6 group-hover:w-16 transition-all duration-500"></div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C5A065]/20 group-hover:border-[#C5A065]/50 transition-colors duration-500">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <div>
                          <h4 
                            className="text-[#282828] text-sm font-semibold tracking-wide"
                            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                          >
                            {item.name}
                          </h4>
                          <p 
                            className="text-[#C5A065] text-xs mt-0.5"
                            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                          >
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots - Centered Below */}
          <div className="swiper-pagination-custom flex justify-center gap-3 mt-8"></div>
        </div>

      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #C5A065;
          opacity: 0.25;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 4px;
          background: #C5A065;
        }
        .test-swiper {
          overflow: hidden !important;
        }
      `}</style>
    </section>
  );
}