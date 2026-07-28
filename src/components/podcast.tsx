'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

export default function PodcastSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo('.podcast-label', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.podcast-label', start: 'top 85%' } }
      );

      gsap.fromTo('.podcast-heading', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.podcast-heading', start: 'top 85%' }, delay: 0.1 }
      );

      gsap.fromTo('.featured-episode', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.featured-episode', start: 'top 80%' }, delay: 0.2 }
      );

      gsap.utils.toArray<HTMLElement>('.episode-item').forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.7,
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredEpisode = {
    title: 'The Quiet Power of Kingdom Leadership',
    description: 'In this profound conversation, we explore what it means to lead with quiet confidence, rooted in faith and wisdom.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'
  };

  const episodes = [
    {
      title: 'The Quiet Power of Kingdom Leadership',
      duration: '52 min',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      title: 'The Quiet Power of Kingdom Leadership',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      title: 'The Quiet Power of Kingdom Leadership',
      duration: '38 min',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    },
    {
      title: 'The Quiet Power of Kingdom Leadership',
      duration: '41 min',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const togglePlay = (index: number) => {
    setPlayingEpisode(playingEpisode === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#121212] py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="podcast-heading text-white text-3xl md:text-4xl lg:text-5xl font-normal mb-3"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
          >
            Voices of Influence
          </h2>
          <p 
            className="podcast-label text-white/50 text-xs md:text-sm leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            Faith, wisdom, and leadership conversations for women of influence.
          </p>
        </div>

        {/* Featured Episode */}
        <div className="featured-episode mb-10 md:mb-12">
          <div className="group relative bg-[#C5A065]/10 border border-[#C5A065]/30 rounded-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-[40%] relative h-[300px] md:h-[320px] overflow-hidden">
                <img 
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Play Button */}
                <button 
                  onClick={() => togglePlay(0)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/95 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  {playingEpisode === 0 ? (
                    <Pause size={28} className="text-[#121212]" />
                  ) : (
                    <Play size={28} className="text-[#121212] ml-1" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="md:w-[60%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-[#C5A065] text-xs uppercase tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                  Featured Episode
                </p>
                <h3 
                  className="text-white text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.2] mb-4"
                  style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                >
                  {featuredEpisode.title}
                </h3>
                <p 
                  className="text-white/60 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {featuredEpisode.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Episodes List */}
        <div>
          <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
            Recent Episodes
          </p>

          <div className="space-y-3 md:space-y-4">
            {episodes.map((episode, index) => (
              <div 
                key={index}
                className="episode-item group flex items-center gap-4 md:gap-6 bg-[#1a1a1a]/50 border border-white/5 rounded-sm p-4 md:p-5 hover:border-[#C5A065]/30 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-sm">
                  <img 
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h4 
                    className="text-white text-sm md:text-base font-normal truncate group-hover:text-[#C5A065] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                  >
                    {episode.title}
                  </h4>
                  <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    {episode.duration}
                  </p>
                </div>

                {/* Play Button */}
                <button 
                  onClick={() => togglePlay(index + 1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C5A065]/50 flex items-center justify-center flex-shrink-0 hover:bg-[#C5A065] hover:border-[#C5A065] transition-all duration-300"
                >
                  {playingEpisode === index + 1 ? (
                    <Pause size={16} className="text-[#C5A065] group-hover:text-white" />
                  ) : (
                    <Play size={16} className="text-[#C5A065] ml-0.5 group-hover:text-white" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}