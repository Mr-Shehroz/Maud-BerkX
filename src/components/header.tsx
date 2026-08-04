'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const GOLD = '#C5A065';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const sidebarCtaRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  const pathname = usePathname();

  const navItems = ['About', 'Journal', 'Podcast', 'Contact'];

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isActive = (itemName: string) => {
    const itemPath = `/${itemName.toLowerCase().replace(' ', '-')}`;
    return pathname === itemPath;
  };

  /* =========================================================
     HEADER ENTRANCE + SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          x: -30,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.2,
        }
      ).fromTo(
        menuButtonRef.current,
        {
          opacity: 0,
          x: 30,
          scale: 0.85,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
        },
        '-=0.8'
      );
    }, headerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  /* =========================================================
     MENU BUTTON HOVER
  ========================================================= */

  useEffect(() => {
    const button = menuButtonRef.current;

    if (!button || prefersReducedMotion) return;

    const handleEnter = () => {
      gsap.to(button, {
        y: -2,
        scale: 1.04,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    const handleLeave = () => {
      gsap.to(button, {
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    button.addEventListener('mouseenter', handleEnter);
    button.addEventListener('mouseleave', handleLeave);

    return () => {
      button.removeEventListener('mouseenter', handleEnter);
      button.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion]);

  /* =========================================================
     SIDEBAR INITIAL STATE
  ========================================================= */

  useEffect(() => {
    if (!sidebarRef.current || !sidebarInnerRef.current) return;

    gsap.set(sidebarRef.current, {
      clipPath: 'inset(0 0 0 100%)',
      opacity: 0,
    });

    gsap.set(sidebarInnerRef.current, {
      x: 35,
      opacity: 0,
    });
  }, []);

  /* =========================================================
     SIDEBAR OPEN / CLOSE
  ========================================================= */

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const sidebarInner = sidebarInnerRef.current;
    const backdrop = backdropRef.current;

    if (!sidebar || !sidebarInner || !backdrop) return;

    const links = navLinksRef.current.filter(
      Boolean
    ) as HTMLAnchorElement[];

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      gsap.set(backdrop, {
        pointerEvents: 'auto',
      });

      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      tl.set(sidebar, {
        opacity: 1,
      })

        /* Backdrop */
        .fromTo(
          backdrop,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          0
        )

        /* Sidebar reveal */
        .fromTo(
          sidebar,
          {
            clipPath: 'inset(0 0 0 100%)',
          },
          {
            clipPath: 'inset(0 0 0 0%)',
            duration: 0.9,
            ease: 'expo.inOut',
          },
          0
        )

        /* Inner content */
        .to(
          sidebarInner,
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          0.3
        )

        /* Links */
        .fromTo(
          links,
          {
            y: 35,
            opacity: 0,
            filter: 'blur(7px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.75,
            stagger: 0.09,
            ease: 'power3.out',
          },
          0.42
        )

        /* CTA */
        .fromTo(
          sidebarCtaRef.current,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.inOut',
        },
        onComplete: () => {
          gsap.set(backdrop, {
            pointerEvents: 'none',
          });
        },
      });

      tl.to(
        links,
        {
          y: 20,
          opacity: 0,
          filter: 'blur(5px)',
          duration: 0.3,
          stagger: 0.035,
        },
        0
      )
        .to(
          sidebarInner,
          {
            x: 25,
            opacity: 0,
            duration: 0.4,
          },
          0
        )
        .to(
          sidebar,
          {
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.7,
            ease: 'expo.inOut',
          },
          0.1
        )
        .to(
          backdrop,
          {
            opacity: 0,
            duration: 0.45,
          },
          0.15
        );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* =========================================================
     ESCAPE
  ========================================================= */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  /* =========================================================
     ICON STATE
     
     CLOSED + NORMAL  = MENU
     CLOSED + HOVER   = X
     
     OPEN + NORMAL    = X
     OPEN + HOVER     = MENU
  ========================================================= */

  const showMenuIcon =
    (!mobileMenuOpen && !menuHovered) ||
    (mobileMenuOpen && menuHovered);

  const showCloseIcon =
    (!mobileMenuOpen && menuHovered) ||
    (mobileMenuOpen && !menuHovered);

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
          scrolled
            ? 'bg-[#121212]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.12)]'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`max-w-[1500px] mx-auto px-6 md:px-8 flex items-center justify-between transition-all duration-700 ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
          }`}
        >
          {/* LOGO */}

          <a
            ref={logoRef}
            href="/"
            className="group relative font-medium tracking-[0.15em] text-white uppercase text-xl md:text-2xl lg:text-3xl"
            style={{
              fontFamily: 'var(--font-eb-garamond), serif',
            }}
          >
            Maud Berkx

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C5A065] transition-all duration-500 group-hover:w-full" />
          </a>

          {/* =================================================
              MENU / CLOSE BUTTON
          ================================================= */}

          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            aria-label={
              mobileMenuOpen ? 'Close menu' : 'Open menu'
            }
            aria-expanded={mobileMenuOpen}
            className="group relative w-14 h-14 flex items-center justify-center"
          >
            {/* Outer ring */}

            <span
              className="
                absolute
                inset-1
                rounded-full
                border
                border-transparent
                scale-75
                opacity-0
                transition-all
                duration-500
                ease-out
                group-hover:scale-100
                group-hover:opacity-100
                group-hover:border-[#C5A065]/30
              "
            />

            {/* Soft glow */}

            <span
              className="
                absolute
                w-8
                h-8
                rounded-full
                bg-[#C5A065]/0
                blur-xl
                transition-all
                duration-500
                group-hover:bg-[#C5A065]/10
              "
            />

            {/* ICON HOLDER */}

            <span className="relative z-10 w-7 h-7 flex items-center justify-center">

              {/* MENU */}

              <span
                className={`
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  ease-[cubic-bezier(.16,1,.3,1)]
                  ${
                    showMenuIcon
                      ? 'opacity-100 scale-100 rotate-0'
                      : 'opacity-0 scale-75 rotate-90'
                  }
                `}
              >
                <Menu
                  size={24}
                  strokeWidth={1.25}
                  className="text-white transition-colors duration-300 group-hover:text-[#C5A065]"
                />
              </span>

              {/* CLOSE */}

              <span
                className={`
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  ease-[cubic-bezier(.16,1,.3,1)]
                  ${
                    showCloseIcon
                      ? 'opacity-100 scale-100 rotate-0'
                      : 'opacity-0 scale-75 -rotate-90'
                  }
                `}
              >
                <X
                  size={24}
                  strokeWidth={1.25}
                  className="text-white transition-colors duration-300 group-hover:text-[#C5A065]"
                />
              </span>

            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/75 backdrop-blur-[2px] z-50 opacity-0"
        style={{
          pointerEvents: 'none',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        ref={sidebarRef}
        className="
          fixed
          top-0
          right-0
          h-full
          w-[88%]
          max-w-[460px]
          bg-[#121212]
          z-[60]
          border-l
          border-white/[0.07]
          shadow-[-30px_0_100px_rgba(0,0,0,0.35)]
          overflow-hidden
        "
      >
        {/* Gold vertical accent */}

        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent,
              ${GOLD}55,
              transparent
            )`,
          }}
        />

        {/* Ambient glow */}

        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{
            background: `${GOLD}10`,
          }}
        />

        <div
          ref={sidebarInnerRef}
          className="relative z-10 h-full flex flex-col"
        >
          {/* =================================================
              SIDEBAR HEADER
          ================================================= */}

          <div className="flex items-center justify-between px-8 md:px-10 py-8 border-b border-white/[0.06]">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-medium tracking-[0.15em] text-white uppercase text-xl"
              style={{
                fontFamily: 'var(--font-eb-garamond), serif',
              }}
            >
              Maud Berkx
            </a>

            {/* Close button */}

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="
                group
                relative
                w-11
                h-11
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                hover:border-[#C5A065]/40
                transition-all
                duration-500
              "
            >
              {/* X */}

              <span
                className="
                  absolute
                  w-5
                  h-px
                  bg-white
                  rotate-45
                  transition-all
                  duration-500
                  group-hover:rotate-0
                  group-hover:bg-[#C5A065]
                "
              />

              <span
                className="
                  absolute
                  w-5
                  h-px
                  bg-white
                  -rotate-45
                  transition-all
                  duration-500
                  group-hover:rotate-0
                  group-hover:bg-[#C5A065]
                "
              />

              {/* Small menu hint on hover */}

              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-[#C5A065]/0
                  group-hover:border-[#C5A065]/20
                  group-hover:scale-110
                  transition-all
                  duration-500
                "
              />
            </button>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="flex flex-col px-8 md:px-10 py-12 flex-1">
            <nav className="flex flex-col gap-8 flex-1">
              {navItems.map((item, index) => {
                const active = isActive(item);

                return (
                  <a
                    key={item}
                    ref={(el) => {
                      navLinksRef.current[index] = el;
                    }}
                    href={`/${item
                      .toLowerCase()
                      .replace(' ', '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      nav-link
                      group
                      relative
                      w-fit
                      text-4xl
                      md:text-5xl
                      leading-[1.05]
                      py-1
                      pr-4
                      transition-colors
                      duration-500
                      ${
                        active
                          ? 'text-[#C5A065]'
                          : 'text-white hover:text-[#C5A065]'
                      }
                    `}
                    style={{
                      fontFamily:
                        'var(--font-eb-garamond), serif',
                    }}
                  >
                    {/* Actual text */}

                    <span
                      className="
                        relative
                        z-10
                        inline-block
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover:translate-x-2
                      "
                    >
                      {item}
                    </span>

                    {/* Underline */}
                    <span
                      className={`
                        absolute
                        left-0
                        bottom-0
                        h-px
                        bg-[#C5A065]
                        transition-all
                        duration-700
                        ease-[cubic-bezier(.16,1,.3,1)]
                        ${
                          active
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        }
                      `}
                    />

                    {/* Gold light sweep */}

                    <span
                      className="
                        absolute
                        left-[-120%]
                        top-0
                        h-full
                        w-[70%]
                        pointer-events-none
                        bg-gradient-to-r
                        from-transparent
                        via-[#C5A065]/10
                        to-transparent
                        skew-x-[-20deg]
                        transition-all
                        duration-700
                        ease-out
                        group-hover:left-[130%]
                      "
                    />
                  </a>
                );
              })}
            </nav>

            {/* =================================================
                CTA
            ================================================= */}

            <div
              ref={sidebarCtaRef}
              className="pt-8 border-t border-white/[0.07]"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  px-8
                  py-4
                  bg-[#C5A065]
                  text-[#121212]
                  uppercase
                  text-sm
                  tracking-[0.15em]
                  transition-all
                  duration-500
                "
                style={{
                  fontFamily:
                    'var(--font-eb-garamond), serif',
                }}
              >
                <span className="relative z-10">
                  Request Invitation
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    bg-white
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(.16,1,.3,1)]
                  "
                />
              </button>

              <p
                className="text-center text-white/35 text-xs mt-6 leading-relaxed"
                style={{
                  fontFamily:
                    'var(--font-hanken), sans-serif',
                }}
              >
                Helping women build a Kingdom legacy
                through faith, wisdom and leadership.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}