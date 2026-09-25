'use client';

import { useState } from 'react';

// Phase 1: stub. Weekends flagged as blocked so the UI is real.
// Phase 2: replace `isBlocked` with Beds24 availability for this villa.
function isBlocked(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AvailabilityCalendar() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const shift = (dir: 1 | -1) => setCursor(new Date(year, month + dir, 1));

  return (
    <div className="rounded-none border border-line p-5">
      <div className="flex items-center justify-between">
        <p className="text-lg">
          {MONTHS[month]} {year}
        </p>
        <div className="flex gap-1">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="flex h-9 w-9 items-center justify-center border border-line hover:bg-ink/5">
            ‹
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex h-9 w-9 items-center justify-center border border-line hover:bg-ink/5">
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-ink/45">
        {DOW.map((d, i) => <span key={i}>{d}</span>)}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const past = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const blocked = !past && isBlocked(date);
          return (
            <span
              key={i}
              className={`flex aspect-square items-center justify-center rounded-none text-sm ${
                past
                  ? 'text-ink/25'
                  : blocked
                    ? 'bg-ink/8 text-ink/35 line-through'
                    : 'text-ink hover:bg-ink/10'
              }`}
            >
              {date.getDate()}
            </span>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 border-t border-line pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 bg-ink/20" /> Booked</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 border border-ink/25 bg-white" /> Available</span>
      </div>
    </div>
  );
}
