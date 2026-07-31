'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C5A065';
const INK = '#282828';
const MUTED = '#453E33';

const TOPICS = ['Mentorship', 'Speaking Engagement', 'Media & Press', 'Something Else'];

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.cfm-label',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );

      gsap.fromTo(
        '.cfm-info',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(
        '.cfm-corner',
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2.2)', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(
        '.cfm-form-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.utils.toArray<HTMLElement>('.cfm-field').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 + i * 0.07, scrollTrigger: { trigger: '.cfm-form-panel', start: 'top 82%' } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sent');
  };

  const boxStyle = (name: string) => ({
    borderColor: focused === name ? GOLD : 'rgba(40, 40, 40, 0.1)',
    backgroundColor: focused === name ? 'rgba(197, 160, 101, 0.04)' : '#FAFAFA',
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F6F6] py-[60px] md:py-[90px] lg:py-[110px] overflow-hidden"
    >
      {/* Subtle light theme ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 85% 0%, rgba(197,160,101,0.08), transparent 65%),
                       radial-gradient(ellipse 50% 40% at 10% 100%, rgba(88,57,41,0.06), transparent 70%)`,
        }}
      />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(rgba(40,40,40,0.06) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto xl:px-10 md:px-6 px-4">

        <div className="cfm-label flex items-center gap-4 mb-14 md:mb-16">
          <span
            className="text-xs md:text-sm tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
          >
            02 — Send a Message
          </span>
          <span className="h-px flex-1" style={{ background: `linear-gradient(to right, rgba(197,160,101,0.4), transparent)` }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT: info panel */}
          <div className="cfm-info lg:col-span-4">
            <h2
              className="text-[#282828] text-3xl md:text-4xl lg:text-[2.6rem] font-normal mb-6 leading-[1.2]"
              style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
            >
              Reach Maud{' '}
              <span className="italic" style={{ color: GOLD }}>directly.</span>
            </h2>
            <p
              className="text-[#453E33]/70 text-sm md:text-base leading-relaxed mb-10"
              style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
            >
              Every inquiry is reviewed personally. For mentorship applications,
              share a little about where you are and what you&apos;re building —
              it helps shape a thoughtful reply.
            </p>

            <div className="space-y-6 pt-8 mb-10" style={{ borderTop: `1px solid rgba(40,40,40,0.08)` }}>
              {[
                { label: 'Email', value: 'hello@maudberkx.com', href: 'mailto:hello@maudberkx.com' },
                { label: 'Location', value: 'Amsterdam, Netherlands' },
                { label: 'Availability', value: 'Available for International Travel' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                  <div>
                    <p
                      className="text-[0.75rem] tracking-[0.2em] uppercase mb-1"
                      style={{ color: 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif' }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg transition-colors duration-300 hover:text-[#C5A065]"
                        style={{ color: '#282828', fontFamily: 'var(--font-eb-garamond), serif' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg" style={{ color: '#282828', fontFamily: 'var(--font-eb-garamond), serif' }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: form panel */}
          <div className="lg:col-span-8">
            <div className="cfm-form-panel relative px-6 py-10 md:px-12 md:py-14 bg-white border border-[#282828]/10 rounded-sm shadow-[0_20px_60px_-20px_rgba(40,40,40,0.08)]">
              <span className="cfm-corner absolute -top-1 -left-1 w-9 h-9 border-t-2 border-l-2" style={{ borderColor: GOLD }} />
              <span className="cfm-corner absolute -top-1 -right-1 w-9 h-9 border-t-2 border-r-2" style={{ borderColor: GOLD }} />
              <span className="cfm-corner absolute -bottom-1 -left-1 w-9 h-9 border-b-2 border-l-2" style={{ borderColor: GOLD }} />
              <span className="cfm-corner absolute -bottom-1 -right-1 w-9 h-9 border-b-2 border-r-2" style={{ borderColor: GOLD }} />

              <form onSubmit={handleSubmit} className="relative">
                <p
                  className="text-[0.65rem] tracking-[0.25em] uppercase mb-8"
                  style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}
                >
                  Your Details
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="cfm-field">
                    <label
                      className="block text-[0.65rem] tracking-[0.2em] uppercase mb-2.5"
                      style={{ color: focused === 'name' ? GOLD : 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif', transition: 'color 0.3s' }}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={focused === 'name' ? GOLD : 'rgba(69, 62, 51, 0.3)'} strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange('name')}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        className="w-full border pl-11 pr-4 py-3.5 text-[#282828] placeholder-[#282828]/30 focus:outline-none transition-colors duration-300 rounded-sm"
                        style={{ ...boxStyle('name'), fontFamily: 'var(--font-hanken), sans-serif' }}
                      />
                    </div>
                  </div>

                  <div className="cfm-field">
                    <label
                      className="block text-[0.65rem] tracking-[0.2em] uppercase mb-2.5"
                      style={{ color: focused === 'email' ? GOLD : 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif', transition: 'color 0.3s' }}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={focused === 'email' ? GOLD : 'rgba(69, 62, 51, 0.3)'} strokeWidth="1.5">
                        <path d="M4 4h16v16H4z" opacity="0" />
                        <path d="M4 6h16v12H4z" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="you@email.com"
                        className="w-full border pl-11 pr-4 py-3.5 text-[#282828] placeholder-[#282828]/30 focus:outline-none transition-colors duration-300 rounded-sm"
                        style={{ ...boxStyle('email'), fontFamily: 'var(--font-hanken), sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="cfm-field mb-6">
                  <label
                    className="block text-[0.65rem] tracking-[0.2em] uppercase mb-3.5"
                    style={{ color: 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    What brings you here?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {TOPICS.map((topic) => {
                      const isActive = form.topic === topic;
                      return (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => setForm((prev) => ({ ...prev, topic }))}
                          className="px-5 py-2.5 rounded-full border text-xs uppercase tracking-[0.1em] transition-all duration-300"
                          style={
                            isActive
                              ? { backgroundColor: GOLD, borderColor: GOLD, color: '#FFFFFF', fontFamily: 'var(--font-hanken), sans-serif' }
                              : { borderColor: 'rgba(40,40,40,0.15)', color: 'rgba(40,40,40,0.6)', fontFamily: 'var(--font-hanken), sans-serif', backgroundColor: 'transparent' }
                          }
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="cfm-field mb-8">
                  <label
                    className="block text-[0.65rem] tracking-[0.2em] uppercase mb-2.5"
                    style={{ color: focused === 'message' ? GOLD : 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif', transition: 'color 0.3s' }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Share a little about where you are, and what you're hoping for..."
                    className="w-full border px-5 py-4 text-[#282828] placeholder-[#282828]/30 focus:outline-none transition-colors duration-300 resize-none rounded-sm"
                    style={{ ...boxStyle('message'), fontFamily: 'var(--font-hanken), sans-serif' }}
                  />
                </div>

                <div className="cfm-field flex items-center justify-between gap-6 flex-wrap pt-2" style={{ borderTop: `1px solid rgba(40,40,40,0.08)` }}>
                  <p
                    className="text-[0.7rem]"
                    style={{ color: 'rgba(69, 62, 51, 0.5)', fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    Typically replies within 2–3 business days.
                  </p>
                  <button
                    type="submit"
                    className="group relative px-10 py-4 text-xs md:text-sm uppercase tracking-[0.22em] font-medium overflow-hidden rounded-sm text-white"
                    style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
                  >
                    <span className="absolute inset-0" style={{ backgroundColor: GOLD }} />
                    <span
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                      style={{ backgroundColor: '#282828' }}
                    />
                    <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                      Send Message
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </div>
                {status === 'sent' && (
                  <p className="mt-6 text-sm font-medium" style={{ color: GOLD, fontFamily: 'var(--font-hanken), sans-serif' }}>
                    Thank you — your message has been received.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}