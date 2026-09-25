'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CITIES } from '@/data/villas';

type Props = {
  variant?: 'hero' | 'plain';
  className?: string;
};

export default function SearchBar({ variant = 'plain', className = '' }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [guests, setGuests] = useState('2');
  const [pets, setPets] = useState(false);

  const summary = [city ? CITIES.find((c) => c.slug === city)?.label : 'Any location', arrive || 'Add dates', `${guests} guests`]
    .filter(Boolean)
    .join(' · ');

  const submit = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (arrive) params.set('arrive', arrive);
    if (depart) params.set('depart', depart);
    if (guests) params.set('guests', guests);
    if (pets) params.set('pets', '1');
    router.push(`/villas?${params.toString()}`);
    setOpen(false);
  };

  const shell = variant === 'hero' ? 'bg-white shadow-xl shadow-black/20' : 'bg-white shadow-sm ring-1 border border-line';

  return (
    <>
      {/* Desktop inline bar */}
      <div className={`hidden w-full max-w-3xl p-2 lg:flex ${shell} ${className}`}>
        <label className="flex flex-1 flex-col justify-center px-5 py-2 hover:bg-ink/5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">Location</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
          >
            <option value="">Anywhere</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </label>

        <span className="my-2 w-px bg-ink/10" />

        <label className="flex flex-1 flex-col justify-center px-5 py-2 hover:bg-ink/5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">Arrive</span>
          <input
            type="date"
            value={arrive}
            onChange={(e) => setArrive(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
          />
        </label>

        <span className="my-2 w-px bg-ink/10" />

        <label className="flex flex-1 flex-col justify-center px-5 py-2 hover:bg-ink/5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">Depart</span>
          <input
            type="date"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
          />
        </label>

        <span className="my-2 w-px bg-ink/10" />

        <label className="flex flex-1 flex-col justify-center px-5 py-2 hover:bg-ink/5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">Guests</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent text-sm text-ink outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </label>

        <button type="button" onClick={submit} aria-label="Search villas" className="ml-1 flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-white transition-colors hover:bg-ink/80">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile pill -> full-screen modal */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full max-w-3xl items-center gap-3 p-2 pl-5 text-left lg:hidden ${shell} ${className}`}
      >
        <span className="flex-1 truncate text-sm text-ink">{summary}</span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="text-xl">Find a villa</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close search" className="flex h-9 w-9 items-center justify-center text-ink hover:bg-ink/5">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
            <div>
              <p className="eyebrow mb-2">Location</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setCity('')} className={`rounded-none border px-4 py-3 text-sm ${city === '' ? 'border-ink bg-ink/10 text-ink' : 'border-line'}`}>
                  Anywhere
                </button>
                {CITIES.map((c) => (
                  <button key={c.slug} type="button" onClick={() => setCity(c.slug)} className={`rounded-none border px-4 py-3 text-sm ${city === c.slug ? 'border-ink bg-ink/10 text-ink' : 'border-line'}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="eyebrow mb-2 block">Arrive</span>
                <input type="date" value={arrive} onChange={(e) => setArrive(e.target.value)} className="w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink" />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Depart</span>
                <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink" />
              </label>
            </div>

            <div>
              <p className="eyebrow mb-2">Guests</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <button key={n} type="button" onClick={() => setGuests(String(n))} className={`h-11 w-11 border text-sm ${guests === String(n) ? 'border-ink bg-ink text-white' : 'border-line'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between rounded-none border border-line px-4 py-3">
              <span className="text-sm">Travelling with pets</span>
              <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} className="h-5 w-5 accent-ink" />
            </label>
          </div>

          <div className="safe-bottom border-t border-line px-5 py-4">
            <button type="button" onClick={submit} className="btn-primary w-full">
              Search villas
            </button>
          </div>
        </div>
      )}
    </>
  );
}
