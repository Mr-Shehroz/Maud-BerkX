'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animations
      gsap.fromTo('.journal-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.journal-label', start: 'top 85%' } }
      );

      gsap.fromTo('.journal-heading', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.journal-heading', start: 'top 85%' }, delay: 0.1 }
      );

      // Featured article animation
      gsap.fromTo('.featured-article', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.featured-article', start: 'top 80%' }, delay: 0.2 }
      );

      // Card stack animations
      gsap.utils.toArray<HTMLElement>('.journal-card').forEach((card, i) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 80,
            rotateX: 15,
            scale: 0.95
          },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: card, 
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.15
          }
        );

        // Hover effect with GSAP
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -12,
            rotateX: -5,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

      // CTA animation
      gsap.fromTo('.journal-cta', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.journal-cta', start: 'top 90%' }, delay: 0.6 }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredArticle = {
    category: 'Featured Essay',
    title: 'The Quiet Leadership That Builds an Enduring Kingdom Legacy',
    excerpt: 'Exploring how faith-rooted wisdom transforms not just organizations, but generations. A deep dive into stewarding influence with grace and purpose.',
    date: 'January 15, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200'
  };

  const articles = [
    {
      category: 'Leadership',
      title: 'From Ambition to Stewardship: Redefining Success',
      excerpt: 'What happens when we shift from climbing ladders to building legacies? The transformation begins with a single question.',
      date: 'January 8, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
    },
    {
      category: 'Faith & Wisdom',
      title: 'Walking in Divine Timing: When to Act and When to Wait',
      excerpt: 'In our rush to achieve, we often miss the sacred pauses. Learning to discern God\'s timing in leadership decisions.',
      date: 'December 28, 2025',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1507692049790-de58290a43d4?auto=format&fit=crop&q=80&w=600'
    },
    {
      category: 'Kingdom Impact',
      title: 'Building Legacy Beyond Your Lifetime',
      excerpt: 'True leadership isn\'t about what you accomplish, but what you leave behind. Creating structures that outlast you.',
      date: 'December 15, 2025',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F6F6] via-[#DDD9CE]/20 to-[#F6F6F6] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p 
            className="journal-label text-[#475D66] text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            06 — Journal & Essays
          </p>
          <h2 
            className="journal-heading text-[#282828] text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Latest Insights
          </h2>
        </div>

        {/* Featured Article */}
        <div className="featured-article mb-20 md:mb-28">
          <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/60 via-transparent to-transparent lg:bg-gradient-to-r"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-2 bg-[#F6F6F6]/95 text-[#282828] text-xs tracking-[0.2em] uppercase rounded-sm"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-4 mb-6 text-[#453E33]/60 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {featuredArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h3 
                className="text-[#282828] text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] mb-6 group-hover:text-[#583929] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {featuredArticle.title}
              </h3>

              <p 
                className="text-[#453E33]/80 text-base md:text-lg leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {featuredArticle.excerpt}
              </p>

              <a 
                href="/journal/featured"
                className="group inline-flex items-center gap-3 text-[#282828] text-sm tracking-wide hover:text-[#583929] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                <span className="border-b-2 border-[#282828]/30 group-hover:border-[#583929] transition-colors duration-300 pb-1">
                  Read the Essay
                </span>
                <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Card Stack - Recent Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {articles.map((article, index) => (
            <article 
              key={index}
              className="journal-card group relative bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 transform-gpu"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/80 via-[#282828]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-3 py-1.5 bg-[#F6F6F6]/95 text-[#282828] text-[10px] tracking-[0.2em] uppercase rounded-sm"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Hover Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 text-[#F6F6F6] text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    Read Article <ChevronRight size={16} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-[#453E33]/60 text-xs" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 
                  className="text-[#282828] text-xl md:text-2xl font-normal leading-[1.3] mb-4 group-hover:text-[#583929] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  {article.title}
                </h3>

                <p 
                  className="text-[#453E33]/70 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {article.excerpt}
                </p>
              </div>

              {/* Decorative Border Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#583929] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="journal-cta text-center mt-20 md:mt-28">
          <a 
            href="/journal"
            className="group inline-flex items-center gap-4 text-[#282828] text-base md:text-lg hover:text-[#583929] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b-2 border-[#282828]/30 group-hover:border-[#583929] transition-colors duration-300 pb-1">
              View All Articles
            </span>
            <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}