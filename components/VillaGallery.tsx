'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function VillaGallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, step]);

  const openAt = (i: number) => {
    setActive(i);
    setOpen(true);
  };

  return (
    <>
      {/* Mobile: swipe strip */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 lg:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="relative aspect-[4/3] w-[85%] shrink-0 snap-center overflow-hidden rounded-none"
          >
            <Image src={src} alt={`${name} — photo ${i + 1}`} fill sizes="85vw" priority={i === 0} className="object-cover" />
          </button>
        ))}
      </div>

      {/* Desktop: hero + grid */}
      <div className="hidden gap-2 lg:grid lg:grid-cols-4 lg:grid-rows-2">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-l-none"
        >
          <Image src={images[0]} alt={`${name} — photo 1`} fill priority sizes="50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </button>
        {images.slice(1, 5).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i + 1)}
            className={`relative aspect-[4/3] overflow-hidden ${i === 3 ? 'rounded-br-none' : ''} ${i === 1 ? 'rounded-tr-none' : ''}`}
          >
            <Image src={src} alt={`${name} — photo ${i + 2}`} fill sizes="25vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
            {i === 3 && (
              <span className="absolute inset-0 bg-ink-deep/50 text-sm font-medium text-white">
                <span className="absolute bottom-4 right-4">Show all {images.length} photos</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-black/70 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <span className="text-sm">{active + 1} / {images.length}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1">
            <Image src={images[active]} alt={`${name} — photo ${active + 1}`} fill sizes="100vw" className="object-contain" />
          </div>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => step(-1)}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/10"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => step(1)}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/10"
          >
            ›
          </button>

          <div className="no-scrollbar safe-bottom flex gap-2 overflow-x-auto px-5 pb-4">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-none ring-2 transition-opacity ${
                  i === active ? 'ring-ink' : 'ring-transparent opacity-60'
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
