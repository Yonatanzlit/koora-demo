import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who Koora is and how we look after nine real listings on the Nicoya Peninsula.',
};

const SERVICES = [
  { title: 'Concierge', body: 'One WhatsApp thread. Restaurant bookings, surf lessons, transfers, a chef at your villa.' },
  { title: 'Housekeeping', body: 'Mid-stay cleans and fresh linens. You arrive to a house that is ready.' },
  { title: 'Maintenance', body: 'A local crew on call, so a broken AC is our problem, not yours.' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative flex min-h-[50svh] items-end overflow-hidden pb-12 pt-32 lg:min-h-[60svh] lg:pb-20">
        <Image
          src="https://koorarentals.com/wp-content/uploads/2024/03/DJI_0868_websize.jpg"
          alt="Beach on the Nicoya Peninsula"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/30" />
        <div className="container-koora relative">
          <p className="eyebrow !text-white/70">About</p>
          <h1 className="mt-3 max-w-2xl text-display text-white">
            Small on purpose.
          </h1>
        </div>
      </section>

      <section className="container-koora py-16 lg:py-24">
        <FadeUp>
          <div className="mx-auto max-w-2xl">
            <p className="text-2xl leading-snug lg:text-3xl">
              Koora started with one house in Santa Teresa and a simple frustration: renting a
              villa in Costa Rica too often means a group chat and a lot of guessing.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              We manage every home with the same care. That is not a growth ceiling — it is the point. Every
              property is one we would stay in ourselves, in a location we know street by street,
              looked after by people who live there year-round.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              When you book, you get a real person on WhatsApp, a house that is actually ready, and
              a list of the places worth your time — not a booking confirmation and silence.
            </p>
          </div>
        </FadeUp>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 lg:grid-cols-3 lg:gap-12">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-16 rounded-none bg-ink px-8 py-12 text-center text-white lg:px-16 lg:py-16">
            <h2 className="text-3xl lg:text-4xl">Come see for yourself.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
              Nine listings, two towns, one peninsula. We will help you pick.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/villas" className="btn-primary">Browse villas</Link>
              <Link href="/contact" className="btn-light">Talk to us</Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
