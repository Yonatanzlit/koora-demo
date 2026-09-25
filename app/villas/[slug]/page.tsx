import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingPanel from '@/components/BookingPanel';
import FadeUp from '@/components/FadeUp';
import VillaCard from '@/components/VillaCard';
import VillaGallery from '@/components/VillaGallery';
import { CONTACT, getVilla, VILLAS } from '@/data/villas';

export function generateStaticParams() {
  return VILLAS.map(villa => ({ slug: villa.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const villa = getVilla(params.slug);
  if (!villa) return { title: 'Villa not found' };
  return {
    title: villa.name,
    description: `${villa.tagline} — ${villa.beds} bedrooms, sleeps ${villa.sleeps}, in ${villa.cityLabel}, Costa Rica.`,
    openGraph: {
      title: `${villa.name} · Koora Rentals`,
      description: villa.tagline,
      images: villa.images.slice(0, 1),
      type: 'article',
    },
  };
}

const FACTS = [
  { key: 'beds', label: 'Bedrooms' },
  { key: 'baths', label: 'Bathrooms' },
  { key: 'sleeps', label: 'Sleeps' },
] as const;

const POLICIES = [
  { title: 'Check-in', body: `From ${CONTACT.checkIn}. Message us your arrival time and we will have the house ready.` },
  { title: 'Check-out', body: `By ${CONTACT.checkOut}. Late checkout may be possible when the next arrival allows it.` },
  { title: 'Cleaning', body: 'Professional cleaning before arrival. Mid-stay cleaning available on request.' },
  { title: 'Concierge', body: 'Transfers, surf lessons, restaurant bookings, chefs, and childcare can all be arranged.' },
];

export default function VillaPage({ params }: { params: { slug: string } }) {
  const villa = getVilla(params.slug);
  if (!villa) notFound();

  const related = VILLAS.filter(v => v.slug !== villa.slug).slice(0, 3);
  const mapQuery = encodeURIComponent(villa.address || `${villa.cityLabel}, Costa Rica`);

  return (
    <article className="bg-white pb-28 lg:pb-0">
      <div className="container-koora pt-24 lg:pt-32">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/villas" className="hover:text-ink">Villas</Link>
          <span className="px-2">/</span>
          <span>{villa.name}</span>
        </nav>

        <header className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-display-sm uppercase">{villa.name}</h1>
            <p className="mt-2 text-sm text-muted">{villa.tagline} · {villa.cityLabel}, Costa Rica</p>
          </div>
          <p className="shrink-0 text-sm">
            <span aria-hidden>★</span>{' '}
            <span className="font-semibold">{villa.rating.toFixed(2)}</span>
            <span className="text-muted"> · {villa.reviewCount} reviews</span>
          </p>
        </header>
      </div>

      <div className="container-koora mt-6 lg:mt-8">
        <VillaGallery images={villa.images} name={villa.name} />
      </div>

      <div className="container-koora mt-10 lg:mt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div>
            <FadeUp>
              <div className="grid grid-cols-3 gap-4 border-y border-line py-5">
                {FACTS.map(fact => (
                  <div key={fact.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{fact.label}</p>
                    <p className="mt-1 text-2xl">{villa[fact.key]}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp>
              <section className="mt-10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">The villa</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{villa.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {villa.bestFor.map(tag => (
                    <span key={tag} className="border border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </FadeUp>

            <FadeUp>
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">Highlights</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {villa.highlights.map(highlight => (
                    <li key={highlight} className="border border-line px-4 py-3 text-sm text-muted">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeUp>

            <FadeUp>
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">Amenities</h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted sm:grid-cols-3">
                  {villa.amenities.map(amenity => (
                    <li key={amenity} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeUp>

            <FadeUp>
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">Good to know</h2>
                <dl className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
                  {POLICIES.map(policy => (
                    <div key={policy.title} className="bg-white p-5">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em]">{policy.title}</dt>
                      <dd className="mt-2 text-sm leading-6 text-muted">{policy.body}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </FadeUp>

            <FadeUp>
              <section className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">Location</h2>
                <p className="mt-2 text-sm text-muted">{villa.address || `${villa.cityLabel}, Nicoya Peninsula, Costa Rica`}</p>
                <div className="mt-5 overflow-hidden border border-line">
                  <iframe
                    title={`Map of ${villa.name}`}
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    loading="lazy"
                    className="h-[320px] w-full"
                  />
                </div>
              </section>
            </FadeUp>
          </div>

          <BookingPanel villa={villa} />
        </div>
      </div>

      <section className="container-koora mt-20 lg:mt-28">
        <h2 className="text-xs font-semibold uppercase tracking-[0.22em]">More Koora villas</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {related.map(v => <VillaCard key={v.slug} villa={v} />)}
        </div>
      </section>
    </article>
  );
}
