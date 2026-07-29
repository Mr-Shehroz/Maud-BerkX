'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Mail, MapPin, Globe, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-container', start: 'top 90%' }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Wisdom', href: '/wisdom' },
    { name: 'Podcast', href: '/podcast' }
    { name: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  const socialLinks = [
    { icon: Globe, label: 'Website', href: '#' },
    { icon: Heart, label: 'Instagram', href: '#' },
    { icon: Star, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-[#282828] pt-20 pb-8 overflow-hidden"
    >
      {/* Subtle Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#583929] to-transparent"></div>

      <div className="footer-container relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
        
        {/* Main Footer Content - Better Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="footer-col lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <h2 
                className="text-[#F6F6F6] text-2xl tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Maud Berkx
              </h2>
            </a>
            <p 
              className="text-[#DDD9CE]/70 text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Helping women build a Kingdom legacy through faith, wisdom, and leadership.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col lg:col-span-1">
            <h3 
              className="text-[#DDD9CE]/60 text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#F6F6F6]/80 text-sm hover:text-[#DDD9CE] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col lg:col-span-1">
            <h3 
              className="text-[#DDD9CE]/60 text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#DDD9CE]/70 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                <Mail size={16} className="text-[#583929] mt-0.5 flex-shrink-0" />
                <span>hello@maudberkx.com</span>
              </li>
              <li className="flex items-start gap-3 text-[#DDD9CE]/70 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                <MapPin size={16} className="text-[#583929] mt-0.5 flex-shrink-0" />
                <span>Amsterdam, Netherlands<br/>Available for International Travel</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="footer-col lg:col-span-1">
            <h3 
              className="text-[#DDD9CE]/60 text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Follow the Journey
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-[#DDD9CE]/20 flex items-center justify-center text-[#DDD9CE]/70 hover:bg-[#583929] hover:border-[#583929] hover:text-[#F6F6F6] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col pt-8 border-t border-[#DDD9CE]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p 
            className="text-[#DDD9CE]/40 text-xs"
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            © {new Date().getFullYear()} Maud Berkx. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[#DDD9CE]/40 text-xs hover:text-[#DDD9CE]/70 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              >
                {link.name}
              </a>
            ))}
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="ml-4 w-9 h-9 rounded-full border border-[#DDD9CE]/20 flex items-center justify-center text-[#DDD9CE]/60 hover:bg-[#583929] hover:border-[#583929] hover:text-[#F6F6F6] transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}