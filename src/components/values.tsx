'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.from('.values-label', { opacity: 0, y: 20, duration: 0.8 })
        .from('.values-heading-line', { yPercent: 110, duration: 1.2 }, '-=0.6')
        .from('.values-intro', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
        .from('.values-swiper-container', { opacity: 0, y: 40, duration: 1 }, '-=0.6')
        .from('.values-signature', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
        .from('.values-cta', { opacity: 0, x: 20, duration: 0.8 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Initialize Swiper navigation after mount
  useEffect(() => {
    const swiperEl = document.querySelector('.values-swiper') as any;
    if (swiperEl && prevRef.current && nextRef.current) {
      swiperEl.swiper.params.navigation.prevEl = prevRef.current;
      swiperEl.swiper.params.navigation.nextEl = nextRef.current;
      swiperEl.swiper.navigation.init();
      swiperEl.swiper.navigation.update();
    }
  }, []);

  const values = [
    {
      title: 'Integrity & Honor',
      description: 'Serving with an unwavering commitment to trust, discretion, and the highest ethical standards in every engagement.',
    },
    {
      title: 'Visionary Stewardship',
      description: 'Developing enduring strategies that generate positive, lasting change for organizations and the communities they serve.',
    },
    {
      title: 'Generational Impact',
      description: 'Empowering others with empathy, wisdom, and a vision for common good that spans across generations.',
    },
    {
      title: 'Innovative Stewardship',
      description: 'Finding creative, forward-thinking solutions while respectfully managing resources and legacy with profound care.',
    },
    {
      title: 'Professional Excellence',
      description: 'A relentless dedication to mastery, precision, and uncompromising quality in every facet of our work and execution.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-section-label="Core Values"
      className="relative bg-[#121212] py-[50px] md:py-[80px] lg:py-[100px] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-30 blur-[120px]"
        style={{ background: `radial-gradient(circle, ${GOLD}15, transparent 70%)` }}
      />

      <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4 relative z-10">

        {/* Header with Navigation */}
        <div className="relative mb-16 md:mb-20">
          {/* Heading */}
          <div className="values-heading text-center max-w-3xl mx-auto">
            <p
              className="values-label text-[#C5A065] text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Core Values
            </p>
            <h2
              className="text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              <span className="block overflow-hidden">
                <span className="values-heading-line block">The Principles That</span>
              </span>
              <span className="block overflow-hidden">
                <span className="values-heading-line block italic text-[#C5A065]">Steady the Work.</span>
              </span>
            </h2>
            <p
              className="values-intro text-gray-400 text-sm md:text-base leading-relaxed mt-6 max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Five commitments that shape every program, every conversation, and
              every client relationship — not aspirations, but the standard.
            </p>
          </div>

          {/* Navigation Arrows - Aligned with heading */}
          {/* <div className="absolute top-0 right-0 md:top-4 lg:top-[23vh] flex items-center gap-3">
            <button 
              ref={prevRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C5A065] hover:border-[#C5A065] hover:text-[#121212] transition-all duration-500 group"
              aria-label="Previous value"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              ref={nextRef}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C5A065] hover:border-[#C5A065] hover:text-[#121212] transition-all duration-500 group"
              aria-label="Next value"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform transition-transform duration-500 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div> */}
        </div>

        {/* Premium Carousel */}
        <div className="values-swiper-container relative px-4 md:px-0">
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
              el: '.values-swiper-pagination',
            }}
            className="values-swiper !pb-16 flex"
          >
            {values.map((value, i) => (
              <SwiperSlide key={value.title}>
                <div className="h-full">
                  <div className="value-card group relative h-full bg-[#1a1a1a] border border-white/5 rounded-sm p-8 md:p-10 transition-all duration-500 hover:border-[#C5A065]/40 hover:shadow-[0_20px_60px_-15px_rgba(197,160,101,0.15)] hover:cursor-grab">
                    
                    {/* Animated top gold line on hover */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A065] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                    {/* Glow behind the number */}
                    <div
                      className="absolute top-6 right-6 w-20 h-20 rounded-full pointer-events-none opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-700"
                      style={{ backgroundColor: `${GOLD}30` }}
                    />

                    {/* Number */}
                    <span
                      className="relative block text-5xl md:text-6xl mb-6 font-normal transition-colors duration-500 group-hover:text-[#C5A065]"
                      style={{ color: `${GOLD}60`, fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      0{i + 1}
                    </span>

                    {/* Title */}
                    <h3
                      className="relative text-white text-xl md:text-2xl leading-snug mb-4 transition-colors duration-300 group-hover:text-[#C5A065]"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="relative text-gray-400 text-sm md:text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-300"
                      style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {value.description}
                    </p>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots - Centered Below */}
          <div className="values-swiper-pagination flex justify-center gap-3"></div>
        </div>

        {/* Signature and CTA */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 md:pt-20 border-t border-white/5 mt-16">
          <p
            className="values-signature text-[#C5A065] text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-signature), cursive' }}
          >
            Maud Berkx
          </p>

          <a
            href="/values"
            className="values-cta group flex items-center gap-3 text-gray-300 text-sm md:text-base transition-colors duration-300 hover:text-[#C5A065]"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b border-gray-600 pb-0.5 transition-colors duration-300 group-hover:border-[#C5A065]">
              Learn More about Our Approach
            </span>
            <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div> */}
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .values-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #C5A065;
          opacity: 0.25;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .values-swiper-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 4px;
          background: #C5A065;
        }
        .values-swiper {
          overflow: hidden !important;
        }
      `}</style>
    </section>
  );
}