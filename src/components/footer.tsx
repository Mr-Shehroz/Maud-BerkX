'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Mail, MapPin, Globe, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';

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
          stagger: 0.15, 
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
    { name: 'Podcast', href: '/podcast' },
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
      className="relative bg-[#1a1a1a] pt-24 pb-10 overflow-hidden"
    >
      {/* Elegant Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A065]/50 to-transparent"></div>

      <div className="footer-container relative z-10 max-w-[1500px] mx-auto px-8 md:px-12 lg:px-16">
        
        {/* Main Footer Content - Strictly Equal Columns & Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start mb-20">
          
          {/* Column 1: Brand */}
          <div className="footer-col space-y-6">
            <a href="/" className="inline-block">
              <h2 
                className="text-white text-3xl tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Maud Berkx
              </h2>
            </a>
            <p 
              className="text-gray-400 text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Helping women build a Kingdom legacy through faith, wisdom, and leadership.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col ml-[25%]">
            <h3 
              className="text-[#C5A065] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Explore
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 text-base hover:text-[#C5A065] transition-colors duration-300 inline-block"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="footer-col ml-[-15%]">
            <h3 
              className="text-[#C5A065] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C5A065]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={18} className="text-[#C5A065]" />
                </div>
                <div>
                  <p className="text-gray-300 text-base" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    hello@maudberkx.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C5A065]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-[#C5A065]" />
                </div>
                <div>
                  <p className="text-gray-300 text-base" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    Amsterdam, Netherlands
                  </p>
                  <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                    Available for International Travel
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="footer-col">
            <h3 
              className="text-[#C5A065] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Follow the Journey
            </h3>
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-[#C5A065]/40 flex items-center justify-center text-[#C5A065] hover:bg-[#C5A065] hover:text-[#1a1a1a] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
              Join our community of women building lasting legacies.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <p 
              className="text-gray-500 text-sm"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              © {new Date().getFullYear()} Maud Berkx. All rights reserved.
            </p>

            <div className="flex items-center gap-8">
              {legalLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-[#C5A065] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Back to Top Button */}
              <button 
                onClick={scrollToTop}
                className="ml-4 w-11 h-11 rounded-full border border-[#C5A065]/40 flex items-center justify-center text-[#C5A065] hover:bg-[#C5A065] hover:text-[#1a1a1a] transition-all duration-300"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}