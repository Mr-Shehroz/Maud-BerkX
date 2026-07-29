'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Clock, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function PodcastSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.podcast-header', { 
        opacity: 0, 
        y: 40, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { trigger: '.podcast-header', start: 'top 85%' }
      });

      gsap.from('.featured-episode-card', { 
        opacity: 0, 
        x: -40, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { trigger: '.featured-episode-card', start: 'top 85%' }
      });

      gsap.from('.recent-episodes-header', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: { trigger: '.recent-episodes-header', start: 'top 90%' }
      });

      gsap.utils.toArray<HTMLElement>('.episode-item').forEach((item, i) => {
        gsap.from(item, { 
          opacity: 0, 
          x: 30, 
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 90%' }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredEpisode = {
    number: 'Episode 47',
    title: 'The Quiet Power of Kingdom Leadership',
    description: 'In this profound conversation, we explore what it means to lead with quiet confidence, rooted in faith and wisdom.',
    duration: '52 min',
    date: 'Jan 20, 2026',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'
  };

  const episodes = [
    {
      number: '46',
      title: 'From Ambition to Stewardship',
      duration: '45 min',
      date: 'Jan 13, 2026',
      category: 'Leadership',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      number: '45',
      title: 'Walking in Divine Timing',
      duration: '38 min',
      date: 'Jan 6, 2026',
      category: 'Faith & Wisdom',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      number: '44',
      title: 'Building Legacy Beyond Lifetime',
      duration: '41 min',
      date: 'Dec 30, 2025',
      category: 'Kingdom Impact',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      number: '43',
      title: 'Grace-Filled Decision Making',
      duration: '36 min',
      date: 'Dec 23, 2025',
      category: 'Wisdom',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const togglePlay = (index: number) => {
    setPlayingEpisode(playingEpisode === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#121212] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A065]/[0.05] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="podcast-header text-center mb-16 md:mb-20">
          <p className="text-[#C5A065] text-xs md:text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
            06 — The Podcast
          </p>
          <h2 
            className="text-white text-3xl md:text-5xl lg:text-6xl font-normal mb-6"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Voices of Influence
          </h2>
          <p 
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Faith, wisdom, and leadership conversations for women of influence.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT: Featured Episode */}
          <div className="lg:col-span-7">
            <div className="featured-episode-card group relative bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden hover:border-[#C5A065]/40 transition-all duration-500">
              
              {/* Image */}
              <div className="relative h-[300px] md:h-[400px]">
                <img 
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-[#C5A065] text-[#121212] text-xs font-semibold tracking-wider uppercase">
                    {featuredEpisode.number}
                  </span>
                </div>
                
                {/* Play Button - Featured */}
                <button 
                  onClick={() => togglePlay(0)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-500 hover:bg-[#C5A065] hover:scale-110"
                >
                  {playingEpisode === 0 ? (
                    <Pause size={32} className="text-[#121212] group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <Play size={32} className="text-[#121212] ml-1 group-hover:text-white transition-colors duration-300" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
                  {featuredEpisode.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-6">
                  {featuredEpisode.description}
                </p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {featuredEpisode.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {featuredEpisode.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Recent Episodes */}
          <div className="lg:col-span-5">
            <p className="recent-episodes-header text-[#C5A065] text-xs uppercase tracking-wider mb-6">
              Recent Episodes
            </p>

            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div 
                  key={index}
                  className="episode-item group flex items-center gap-4 bg-[#1a1a1a] border border-white/5 p-4 hover:border-[#C5A065]/30 transition-all duration-300 cursor-pointer"
                  onClick={() => togglePlay(index + 1)}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0 bg-[#2a2a2a] overflow-hidden rounded-sm">
                    <img 
                      src={episode.image}
                      alt={episode.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm mb-1 truncate group-hover:text-[#C5A065] transition-colors duration-300" style={{ fontFamily: 'var(--font-eb-garamond), serif' }}>
                      {episode.title}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {episode.duration} • {episode.date}
                    </p>
                  </div>

                  {/* Play Button - Episode List */}
                  <button className="w-10 h-10 rounded-full border border-[#C5A065]/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-[#C5A065] hover:border-[#C5A065] group/btn">
                    {playingEpisode === index + 1 ? (
                      <Pause size={16} className="text-[#C5A065] group-hover/btn:text-white transition-colors duration-300" />
                    ) : (
                      <Play size={16} className="text-[#C5A065] ml-0.5 group-hover/btn:text-white transition-colors duration-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-8 text-center">
              <a 
                href="/podcast"
                className="inline-flex items-center gap-2 text-[#C5A065] text-sm hover:text-white transition-colors"
              >
                <span>View All Episodes</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}