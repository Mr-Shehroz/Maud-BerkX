'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // GSAP entrance animation for header elements
    const tl = gsap.timeline();
    tl.from('.header-btn', { 
      opacity: 0, 
      x: -30, 
      duration: 0.8, 
      ease: 'power3.out' 
    });
    tl.from('.header-logo', { 
      opacity: 0, 
      y: -20, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.6');
    tl.from('.header-menu', { 
      opacity: 0, 
      x: 30, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.6');

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = ['Journal', 'Podcast', 'Speaking', 'Wisdom', 'Inquiry'];

  return (
    <>
      {/* Full-Width Header */}
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#F6F6F6]/95 backdrop-blur-md shadow-md' 
            : 'bg-[#F6F6F6]'
        }`}
      >
        {/* Applied requested container sizing */}
        <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Left: Request Invitation Button */}
            <button 
              className="header-btn font-medium text-[#F6F6F6] bg-[#282828] px-6 md:px-8 py-3 rounded-full hover:bg-[#583929] transition-all duration-300 whitespace-nowrap text-xs md:text-sm hidden lg:block"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Request Invitation
            </button>

            {/* Center: Logo */}
            <a 
              href="/" 
              className="header-logo font-semibold tracking-[0.2em] text-[#282828] uppercase text-xl md:text-2xl lg:text-3xl"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Maud Berkx
            </a>

            {/* Right: Menu Button */}
            <button 
              className="header-menu flex items-center gap-3 font-medium tracking-[0.15em] text-[#282828] uppercase hover:text-[#583929] transition-colors duration-300 text-xs md:text-sm"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="hidden md:inline">Menu</span>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop (Click to close) */}
      <div 
        className={`fixed inset-0 bg-[#282828]/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-out Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#F6F6F6] shadow-2xl z-[60] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-[#282828]/10">
          <a 
            href="/" 
            className="font-semibold tracking-[0.2em] text-[#282828] uppercase text-xl"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Maud Berkx
          </a>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#282828]/5 transition-colors duration-300 text-[#282828]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col px-8 py-12 h-[calc(100vh-180px)] overflow-y-auto">
          <nav className="space-y-6 flex-1">
            {navItems.map((item, index) => (
              <a 
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block text-[#282828] hover:text-[#583929] transition-colors duration-300 text-4xl md:text-5xl"
                style={{ 
                  fontFamily: 'var(--font-eb-garamond), serif',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                  transition: `all 0.5s ease ${index * 0.1 + 0.2}s`
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Sidebar Footer / CTA */}
          <div 
            className="pt-8 border-t border-[#282828]/10"
            style={{ 
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.6s'
            }}
          >
            <button 
              className="w-full font-medium tracking-[0.2em] text-[#F6F6F6] bg-[#282828] px-8 py-4 rounded-full hover:bg-[#583929] transition-all duration-300 uppercase text-sm"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Invitation
            </button>
            
            <p className="text-center text-[#282828]/60 text-xs mt-6" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
              Helping women build a Kingdom legacy through faith, wisdom and leadership.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}