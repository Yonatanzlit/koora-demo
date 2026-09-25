'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/villas', label: 'Villas' },
  { href: '/#locations', label: 'Locations' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? 'border-b border-line bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container-koora flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`text-lg font-semibold uppercase tracking-[0.24em] lg:text-xl ${solid ? 'text-ink' : 'text-white'}`}
          >
            Koora
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  solid ? 'text-muted hover:text-ink' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/villas" className={`hidden px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors lg:inline-flex ${solid ? 'bg-ink text-white hover:bg-ink/80' : 'bg-white text-ink hover:bg-white/90'}`}>
              Book now
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`flex h-10 w-10 items-center justify-center lg:hidden ${solid ? 'text-ink' : 'text-white'}`}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 top-16 z-40 bg-white transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <nav className="container-koora flex flex-col py-10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 text-lg font-semibold uppercase tracking-[0.12em]"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/villas" onClick={() => setOpen(false)} className="mt-8 bg-ink px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Book now
          </Link>
        </nav>
      </div>
    </>
  );
}
