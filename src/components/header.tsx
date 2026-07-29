'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

// Updated Gold color to match the reference image's metallic gold accent
const GOLD = '#C5A065'; 

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const requestBtnRef = useRef<HTMLButtonElement>(null);
  const menuIconRef = useRef<HTMLSpanElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const sidebarCtaRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['About', 'Journal', 'Wisdom', 'Podcast','Contact'];

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Entrance sequence ----------
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(logoRef.current, {
      opacity: 0,
      x: -24,
      duration: 1,
    })
      .from(
        '.header-cta-group',
        {
          opacity: 0,
          x: 24,
          duration: 1,
        },
        '-=0.7'
      );

    // Scroll state
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      tl.kill();
    };
  }, [prefersReducedMotion]);

  // ---------- Magnetic "Request Invitation" button ----------
  useEffect(() => {
    const btn = requestBtnRef.current;
    if (!btn || prefersReducedMotion) return;

    const quickX = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const quickY = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(relX * 0.25);
      quickY(relY * 0.4);
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion]);

  // ---------- Menu icon morph (hamburger <-> close) ----------
  useEffect(() => {
    if (!menuIconRef.current) return;
    gsap.to(menuIconRef.current, {
      rotate: mobileMenuOpen ? 90 : 0,
      duration: 0.5,
      ease: 'back.out(2)',
    });
  }, [mobileMenuOpen]);

  // Establish the sidebar's closed position through GSAP itself
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.set(sidebarRef.current, { xPercent: 100 });
    }
  }, []);

  // ---------- Sidebar open/close timeline ----------
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const backdrop = backdropRef.current;
    if (!sidebar || !backdrop) return;

    const links = navLinksRef.current.filter(Boolean);

    if (mobileMenuOpen) {
      gsap.set(backdrop, { pointerEvents: 'auto' });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(backdrop, { opacity: 1, duration: 0.5 }, 0)
        .to(sidebar, { xPercent: 0, duration: 0.85 }, 0)
        .fromTo(
          links,
          { x: 36, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 },
          0.25
        )
        .fromTo(
          sidebarCtaRef.current,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          '-=0.35'
        );
    } else {
      gsap.to(sidebar, { xPercent: 100, duration: 0.6, ease: 'power3.in' });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => gsap.set(backdrop, { pointerEvents: 'none' }),
      });
    }
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Full-Width Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
            }`}
          >
            {/* Left: Logo */}
            <a
              ref={logoRef}
              href="/"
              className="header-logo group relative inline-flex flex-col items-start leading-none"
            >
              <span
                className="font-serif font-medium tracking-[0.15em] text-white uppercase text-xl md:text-2xl lg:text-3xl transition-colors duration-300 group-hover:text-[#C5A065]"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Maud Berkx
              </span>
            </a>

            {/* Right: CTA Group (Request Button + Menu Toggle) */}
            <div className="header-cta-group flex items-center gap-4 md:gap-6">
              {/* Request Invitation Button - Desktop Only */}
              {/* <button
                ref={requestBtnRef}
                className="hidden md:block relative font-serif font-medium text-[#C5A065] bg-transparent border border-[#C5A065] px-6 md:px-8 py-2.5 rounded-none transition-all duration-300 whitespace-nowrap lg:text-base text-sm hover:bg-[#C5A065] hover:text-[#121212]"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                Request Invitation
              </button> */}

              {/* Menu Toggle Button */}
              <button
                className="header-menu flex items-center text-white hover:text-[#C5A065] transition-colors duration-300"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <span ref={menuIconRef} className="inline-flex">
                  <Menu size={24} strokeWidth={1.5} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 opacity-0"
        style={{ pointerEvents: 'none' }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-out Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#121212] shadow-2xl z-[60] border-l border-white/5"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-white/5">
          <a
            href="/"
            className="font-serif font-medium tracking-[0.15em] text-white uppercase text-xl"
            style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Maud Berky
          </a>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 text-white hover:bg-white/5"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col px-8 py-12 h-[calc(100vh-180px)]">
          <nav className="space-y-8 flex-1 flex flex-col">
            {navItems.map((item, index) => (
              <a
                key={item}
                ref={(el) => { navLinksRef.current[index] = el }}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="group relative inline-block text-white text-3xl md:text-4xl transition-colors duration-300 hover:text-[#C5A065]"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
                <span
                  className="absolute left-0 -bottom-1 h-px w-0 transition-all duration-400 ease-out group-hover:w-full"
                  style={{ backgroundColor: GOLD }}
                />
              </a>
            ))}
          </nav>

          {/* Sidebar Footer / CTA */}
          <div ref={sidebarCtaRef} className="pt-8 border-t border-white/5">
            <button
              className="w-full font-serif font-medium text-[#121212] bg-[#C5A065] px-8 py-4 rounded-none transition-all duration-300 uppercase text-sm hover:bg-white hover:text-[#121212]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Invitation
            </button>

            <p
              className="text-center text-white/40 text-xs mt-6 font-sans"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Helping women build a Kingdom legacy through faith, wisdom and leadership.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}