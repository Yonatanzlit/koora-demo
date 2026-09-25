import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import VillaCard from '@/components/VillaCard';
import FadeUp from '@/components/FadeUp';
import { CITIES, EXPERIENCES, REVIEWS, VILLAS } from '@/data/villas';

const SERVICES = [
  { title: 'Concierge', body: 'Restaurant bookings, surf lessons, airport transfers, a chef at your villa — one message away.' },
  { title: 'Housekeeping', body: 'Mid-stay cleans, fresh linens, laundry. Arrive to a house that is ready, not just available.' },
  { title: 'Maintenance', body: 'Local crew on call. If the AC hiccups at 9pm, someone is there before it becomes your problem.' },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-b border-line">
        <div className="container-koora grid grid-cols-2 gap-8 py-8 lg:grid-cols-4 lg:py-10">
          {[
            ['09', 'Real listings'],
            ['02', 'Beach towns'],
            ['24/7', 'Concierge'],
            ['4.9★', 'Guest rating'],
          ].map(([value, label]) => (
            <FadeUp key={label}>
              <p className="text-3xl font-semibold tracking-tight lg:text-5xl">{value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">{label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="villas" className="bg-white">
        <div className="container-koora py-16 lg:py-24">
          <FadeUp>
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Current listings</p>
                <h2 className="mt-3 max-w-xl text-display-sm uppercase">Every Koora listing.</h2>
              </div>
              <Link href="/villas" className="text-xs font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
                View all villas
              </Link>
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {VILLAS.map((villa, i) => (
              <FadeUp key={villa.slug} delay={(i % 3) * 0.06}>
                <VillaCard villa={villa} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="bg-black text-white">
        <div className="container-koora pt-16 lg:pt-24">
          <FadeUp>
            <p className="eyebrow !text-white/50">Two towns, one peninsula</p>
            <h2 className="mt-3 max-w-2xl text-display-sm uppercase">Pick your pace.</h2>
          </FadeUp>
        </div>

        <div className="mt-10 grid lg:mt-14 lg:grid-cols-2">
          {CITIES.map((city, i) => (
            <FadeUp key={city.slug} delay={i * 0.1}>
              <Link href={`/villas?city=${city.slug}`} className="group relative block">
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
                  <Image
                    src={city.image}
                    alt={city.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                  <h3 className="text-2xl font-semibold uppercase tracking-[0.1em] lg:text-4xl">{city.label}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/70">{city.blurb}</p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    Explore {city.label} →
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-koora py-16 lg:py-24">
          <FadeUp>
            <p className="eyebrow">Things to do</p>
            <h2 className="mt-3 max-w-xl text-display-sm uppercase">More than a place to sleep.</h2>
          </FadeUp>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.map((experience, i) => (
              <FadeUp key={experience.label} delay={i * 0.06}>
                <div className="group relative overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={experience.image}
                      alt={experience.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{experience.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/70">{experience.blurb}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-wash">
        <div className="container-koora py-16 lg:py-24">
          <FadeUp>
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 max-w-xl text-display-sm uppercase">Everything under one roof.</h2>
          </FadeUp>
          <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
            {SERVICES.map((service) => (
              <FadeUp key={service.title}>
                <div className="h-full bg-white p-8 lg:p-10">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">{service.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{service.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-koora py-16 lg:py-24">
          <FadeUp>
            <p className="eyebrow">Guest reviews</p>
            <h2 className="mt-3 max-w-xl text-display-sm uppercase">Why guests return.</h2>
          </FadeUp>
          <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <FadeUp key={review.name}>
                <blockquote className="h-full bg-white p-8 lg:p-10">
                  <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                  <p className="mt-4 text-base leading-7">“{review.quote}”</p>
                  <footer className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {review.name} · {review.villa}
                  </footer>
                </blockquote>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
