'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Clock, Calendar, Headphones, ArrowRight, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PodcastSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animations
      gsap.fromTo('.podcast-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.podcast-label', start: 'top 85%' } }
      );

      gsap.fromTo('.podcast-heading', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.podcast-heading', start: 'top 85%' }, delay: 0.1 }
      );

      // Featured episode animation
      gsap.fromTo('.featured-podcast', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.featured-podcast', start: 'top 80%' }, delay: 0.2 }
      );

      // Episode list animations
      gsap.utils.toArray<HTMLElement>('.episode-item').forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: item, 
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        );
      });

      // CTA animation
      gsap.fromTo('.podcast-cta', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.podcast-cta', start: 'top 90%' }, delay: 0.6 }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredEpisode = {
    number: 'Episode 47',
    title: 'The Quiet Power of Kingdom Leadership',
    guest: 'With Special Guest Dr. Sarah Mitchell',
    description: 'In this profound conversation, we explore what it means to lead with quiet confidence, rooted in faith and wisdom. Discover how to steward your influence with grace and build a legacy that echoes through generations.',
    duration: '52 min',
    date: 'January 20, 2026',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200'
  };

  const episodes = [
    {
      number: 'Ep 46',
      title: 'From Ambition to Stewardship: A New Paradigm',
      duration: '45 min',
      date: 'January 13, 2026',
      category: 'Leadership'
    },
    {
      number: 'Ep 45',
      title: 'Walking in Divine Timing: When to Act and When to Wait',
      duration: '38 min',
      date: 'January 6, 2026',
      category: 'Faith & Wisdom'
    },
    {
      number: 'Ep 44',
      title: 'Building Legacy Beyond Your Lifetime',
      duration: '41 min',
      date: 'December 30, 2025',
      category: 'Kingdom Impact'
    },
    {
      number: 'Ep 43',
      title: 'The Art of Grace-Filled Decision Making',
      duration: '36 min',
      date: 'December 23, 2025',
      category: 'Wisdom'
    }
  ];

  const togglePlay = (index: number) => {
    setPlayingEpisode(playingEpisode === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#282828] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#583929]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p 
            className="podcast-label text-[#DDD9CE]/60 text-xs md:text-sm tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            07 — The Podcast
          </p>
          <h2 
            className="podcast-heading text-[#F6F6F6] text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Voices of Influence
          </h2>
          <p 
            className="mt-6 text-[#DDD9CE]/70 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Conversations on faith, wisdom, and leadership with women shaping the world.
          </p>
        </div>

        {/* Featured Episode */}
        <div className="featured-podcast mb-20 md:mb-28">
          <div className="group relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center bg-[#453E33]/20 border border-[#DDD9CE]/10 rounded-sm overflow-hidden hover:border-[#DDD9CE]/30 transition-all duration-500">
            
            {/* Image */}
            <div className="lg:col-span-2 relative h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src={featuredEpisode.image}
                alt={featuredEpisode.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#282828] via-transparent to-transparent lg:bg-gradient-to-r"></div>
              
              {/* Play Button Overlay */}
              <button 
                onClick={() => togglePlay(0)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F6F6F6]/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl"
              >
                {playingEpisode === 0 ? (
                  <Pause size={32} className="text-[#282828]" />
                ) : (
                  <Play size={32} className="text-[#282828] ml-1" />
                )}
              </button>

              {/* Episode Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-2 bg-[#583929] text-[#F6F6F6] text-xs tracking-[0.2em] uppercase rounded-sm"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {featuredEpisode.number}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-4 mb-6 text-[#DDD9CE]/60 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {featuredEpisode.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featuredEpisode.duration}
                </span>
              </div>

              <h3 
                className="text-[#F6F6F6] text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] mb-4 group-hover:text-[#DDD9CE] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {featuredEpisode.title}
              </h3>

              <p 
                className="text-[#583929] text-base md:text-lg mb-6 italic"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {featuredEpisode.guest}
              </p>

              <p 
                className="text-[#DDD9CE]/70 text-base md:text-lg leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {featuredEpisode.description}
              </p>

              {/* Audio Player Bar */}
              <div className="bg-[#282828]/50 border border-[#DDD9CE]/10 rounded-sm p-4 flex items-center gap-4">
                <button 
                  onClick={() => togglePlay(0)}
                  className="w-12 h-12 rounded-full bg-[#583929] flex items-center justify-center hover:bg-[#453E33] transition-colors duration-300 flex-shrink-0"
                >
                  {playingEpisode === 0 ? (
                    <Pause size={20} className="text-[#F6F6F6]" />
                  ) : (
                    <Play size={20} className="text-[#F6F6F6] ml-0.5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="h-1 bg-[#DDD9CE]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#583929] rounded-full" style={{ width: playingEpisode === 0 ? '35%' : '0%' }}></div>
                  </div>
                </div>

                <Volume2 size={18} className="text-[#DDD9CE]/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Episodes List */}
        <div className="mb-16">
          <h3 
            className="text-[#F6F6F6] text-2xl md:text-3xl mb-8"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Recent Episodes
          </h3>

          <div className="space-y-4">
            {episodes.map((episode, index) => (
              <div 
                key={index}
                className="episode-item group bg-[#453E33]/20 border border-[#DDD9CE]/10 rounded-sm p-6 md:p-8 hover:border-[#DDD9CE]/30 hover:bg-[#453E33]/30 transition-all duration-500 cursor-pointer"
                onClick={() => togglePlay(index + 1)}
              >
                <div className="flex items-center gap-6 md:gap-8">
                  {/* Play Button */}
                  <button className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#DDD9CE]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#583929] group-hover:bg-[#583929] transition-all duration-300">
                    {playingEpisode === index + 1 ? (
                      <Pause size={24} className="text-[#F6F6F6]" />
                    ) : (
                      <Play size={24} className="text-[#DDD9CE] ml-1 group-hover:text-[#F6F6F6]" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className="text-[#583929] text-xs tracking-[0.15em] uppercase font-semibold"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {episode.number}
                      </span>
                      <span className="text-[#DDD9CE]/40">•</span>
                      <span 
                        className="text-[#DDD9CE]/60 text-xs"
                        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                      >
                        {episode.category}
                      </span>
                    </div>

                    <h4 
                      className="text-[#F6F6F6] text-lg md:text-xl font-normal leading-[1.3] group-hover:text-[#DDD9CE] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                    >
                      {episode.title}
                    </h4>
                  </div>

                  {/* Meta Info */}
                  <div className="hidden md:flex items-center gap-6 text-[#DDD9CE]/60 text-sm flex-shrink-0" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {episode.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {episode.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="podcast-cta text-center">
          <a 
            href="/podcast"
            className="group inline-flex items-center gap-4 text-[#F6F6F6] text-base md:text-lg hover:text-[#DDD9CE] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            <span className="border-b-2 border-[#F6F6F6]/30 group-hover:border-[#DDD9CE] transition-colors duration-300 pb-1">
              Listen to All Episodes
            </span>
            <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}