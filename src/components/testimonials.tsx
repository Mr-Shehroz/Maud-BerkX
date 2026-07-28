'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';

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
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.test-swiper-container', start: 'top 80%' }, delay: 0.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const swiperInstance = document.querySelector('.test-swiper') as any;
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.swiper.params.navigation.prevEl = prevRef.current;
      swiperInstance.swiper.params.navigation.nextEl = nextRef.current;
      swiperInstance.swiper.navigation.init();
      swiperInstance.swiper.navigation.update();
    }
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
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
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

        {/* Swiper Carousel */}
        <div className="test-swiper-container relative px-4 md:px-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            speed={1000}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="test-swiper !pb-20"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <div className="group h-full bg-white rounded-sm overflow-hidden hover:shadow-[0_20px_60px_rgba(197,160,101,0.15)] transition-all duration-700">
                    
                    {/* Gold top border */}
                    <div className="h-1 bg-gradient-to-r from-transparent via-[#C5A065] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="p-8 md:p-10 lg:p-12 h-full flex flex-col">
                      
                      {/* Quote Icon with gold background */}
                      <div className="mb-8">
                        <div className="w-14 h-14 rounded-full bg-[#C5A065]/10 flex items-center justify-center group-hover:bg-[#C5A065]/20 transition-colors duration-500">
                          <Quote size={24} className="text-[#C5A065]" />
                        </div>
                      </div>

                      {/* Quote Text */}
                      <blockquote 
                        className="text-[#453E33]/80 text-sm md:text-base leading-relaxed mb-8 flex-grow"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {item.quote}
                      </blockquote>

                      {/* Divider */}
                      <div className="w-12 h-px bg-[#C5A065]/40 mb-6 group-hover:w-16 transition-all duration-500"></div>

                      {/* Author Info */}
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C5A065]/20 group-hover:border-[#C5A065]/50 transition-colors duration-500">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <div>
                          <h4 
                            className="text-[#282828] text-base font-semibold tracking-wide"
                            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                          >
                            {item.name}
                          </h4>
                          <p 
                            className="text-[#C5A065] text-xs mt-1 tracking-wide"
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

          {/* Custom Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              ref={prevRef}
              className="w-14 h-14 rounded-full border border-[#C5A065]/30 flex items-center justify-center text-[#C5A065] hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all duration-500 group"
              aria-label="Previous testimonial"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:-translate-x-1">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div className="swiper-pagination-custom flex gap-3"></div>
            
            <button 
              ref={nextRef}
              className="w-14 h-14 rounded-full border border-[#C5A065]/30 flex items-center justify-center text-[#C5A065] hover:bg-[#C5A065] hover:text-white hover:border-[#C5A065] transition-all duration-500 group"
              aria-label="Next testimonial"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #C5A065;
          opacity: 0.25;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 36px;
          border-radius: 5px;
          background: #C5A065;
        }
        .test-swiper {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}