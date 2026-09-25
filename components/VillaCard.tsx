'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Villa } from '@/data/villas';

export default function VillaCard({ villa }: { villa: Villa }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [villa.slug]);

  const go = (next: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: next * (el.clientWidth || 0), behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <article className="group flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden bg-wash">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {villa.images.map((src, i) => (
            <Link
              key={src}
              href={`/villas/${villa.slug}`}
              className="relative block aspect-[4/3] w-full shrink-0 snap-center"
            >
              <Image
                src={src}
                alt={`${villa.name} — photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>

        <span className="pointer-events-none absolute left-0 top-0 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
          {villa.cityLabel}
        </span>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white text-ink opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white text-ink opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        >
          ›
        </button>

        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {villa.images.map((_, i) => (
            <span key={i} className={`h-1 transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`} />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col border border-t-0 border-line bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
          <Link href={`/villas/${villa.slug}`} className="hover:underline">
            {villa.name}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-muted">
          {villa.beds} beds · {villa.baths} baths · sleeps {villa.sleeps}
        </p>
        <p className="mt-4 text-sm text-muted">
          From <span className="font-semibold text-ink">${villa.pricePerNight}</span> / night
        </p>
      </div>
    </article>
  );
}
