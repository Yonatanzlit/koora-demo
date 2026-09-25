'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Suspense } from 'react';
import VillaCard from '@/components/VillaCard';
import FadeUp from '@/components/FadeUp';
import { CITIES, VILLAS, type City } from '@/data/villas';

type SearchParams = {
  city?: string;
  arrive?: string;
  depart?: string;
  guests?: string;
  pets?: string;
};

function VillasPageContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') as City | null;
  const guests = Number(searchParams.get('guests')) || undefined;
  const pets = searchParams.get('pets') === '1';

  const filters: { label: string; href: string; active: boolean }[] = [
    { label: 'All villas', href: '/villas', active: !city && !pets },
    ...CITIES.map((c) => ({
      label: c.label,
      href: `/villas?city=${c.slug}`,
      active: city === c.slug,
    })),
    { label: 'Pet-friendly', href: '/villas?pets=1', active: pets },
  ];

  const results = useMemo(() => VILLAS.filter((v) => {
    if (city && v.city !== city) return false;
    if (guests && v.sleeps < guests) return false;
    if (pets && !v.amenities.some(a => /pet/i.test(a))) return false;
    return true;
  }), [city, guests, pets]);

  const summaryBits: string[] = [];
  if (city) summaryBits.push(CITIES.find((c) => c.slug === city)?.label ?? '');
  const arrive = searchParams.get('arrive');
  const depart = searchParams.get('depart');
  if (arrive || depart) summaryBits.push(`${arrive ?? '—'} → ${depart ?? '—'}`);
  if (guests) summaryBits.push(`${guests} guest${guests === 1 ? '' : 's'}`);
  if (pets) summaryBits.push('pets welcome');

  return (
    <div className="bg-white">
      <div className="container-koora pt-28 lg:pt-36">
        <FadeUp>
          <p className="eyebrow">The collection</p>
          <h1 className="sr-only">Find your villa</h1>
          <p className="mt-3 text-display-sm uppercase">Find your villa.</p>
          {summaryBits.length > 0 && (
            <p className="mt-4 text-sm text-muted">{summaryBits.filter(Boolean).join(' · ')}</p>
          )}
        </FadeUp>
      </div>

      {/* Filter strip — horizontal scroll on mobile */}
      <div className="sticky top-16 z-30 mt-6 border-y border-line bg-white/90 backdrop-blur-md lg:top-20">
        <div className="container-koora">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0">
            {filters.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  f.active
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {f.label}
              </Link>
            ))}
            <span className="ml-auto hidden shrink-0 self-center pl-4 text-sm text-muted lg:block">
              {results.length} {results.length === 1 ? 'villa' : 'villas'}
            </span>
          </div>
        </div>
      </div>

      <div className="container-koora pb-20 pt-10 lg:pb-28 lg:pt-14">
        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-2xl">Nothing matches those filters.</p>
            <p className="mt-3 text-sm text-muted">
              Try fewer guests, or{' '}
              <Link href="/contact" className="underline underline-offset-4">
                message us
              </Link>{' '}
              — we can often still help.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {results.map((v, i) => (
              <FadeUp key={v.slug} delay={(i % 3) * 0.06}>
                <VillaCard villa={v} />
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VillasPage() {
  return (
    <Suspense>
      <VillasPageContent />
    </Suspense>
  );
}
