'use client';

import { useMemo, useState } from 'react';
import { CONTACT, type Villa } from '@/data/villas';

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const d = (new Date(b).getTime() - new Date(a).getTime()) / 86_400_000;
  return d > 0 ? Math.round(d) : 0;
}

export default function BookingPanel({ villa }: { villa: Villa }) {
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => nightsBetween(arrive, depart), [arrive, depart]);
  const subtotal = nights * villa.pricePerNight;
  const cleaning = 65;
  const total = nights > 0 ? subtotal + cleaning : 0;

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi Koora, I'd like to book ${villa.name}${arrive ? ` from ${arrive}` : ''}${depart ? ` to ${depart}` : ''} for ${guests} guests.`
  )}`;

  return (
    <>
      {/* Mobile: sticky bottom bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <div>
            <p className="text-base font-medium">
              ${villa.pricePerNight}
              <span className="text-sm font-normal text-muted"> / night</span>
            </p>
            <p className="text-xs text-muted">
              {nights > 0 ? `${nights} nights · $${total} total` : `Sleeps ${villa.sleeps}`}
            </p>
          </div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Reserve
          </a>
        </div>
      </div>

      {/* Desktop: right rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-none border border-line bg-white p-6 shadow-sm">
          <p className="text-2xl">
            ${villa.pricePerNight}
            <span className="text-sm font-sans text-muted"> / night</span>
          </p>

          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-none border border-line">
            <label className="border-r border-line p-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Arrive</span>
              <input type="date" value={arrive} onChange={(e) => setArrive(e.target.value)} className="mt-1 w-full bg-transparent text-base outline-none" />
            </label>
            <label className="p-3">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Depart</span>
              <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="mt-1 w-full bg-transparent text-base outline-none" />
            </label>
          </div>

          <label className="mt-3 block rounded-none border border-line p-3">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Guests</span>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full bg-transparent text-base outline-none">
              {Array.from({ length: villa.sleeps }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </label>

          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
            Reserve
          </a>
          <p className="mt-3 text-center text-xs text-muted">You won&apos;t be charged yet</p>

          {nights > 0 && (
            <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">${villa.pricePerNight} × {nights} nights</dt>
                <dd>${subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Cleaning fee</dt>
                <dd>${cleaning}</dd>
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-3 font-medium">
                <dt>Total</dt>
                <dd>${total}</dd>
              </div>
            </dl>
          )}

          <div className="mt-5 space-y-1 text-xs text-muted">
            <p>Check-in after {CONTACT.checkIn}</p>
            <p>Check-out by {CONTACT.checkOut}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
