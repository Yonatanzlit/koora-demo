import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { CONTACT } from '@/data/villas';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Booking, check-in, pets and payment questions for Koora villas.',
};

const FAQS = [
  {
    q: 'How do I book?',
    a: 'Pick your villa and dates, then message us on WhatsApp. We confirm availability and send a secure payment link. A deposit holds the reservation; the balance is due before arrival.',
  },
  {
    q: 'What are the check-in and check-out times?',
    a: `Check-in is after ${CONTACT.checkIn} and check-out is by ${CONTACT.checkOut}. Early check-in and late check-out are often possible — just ask.`,
  },
  {
    q: 'Is there a minimum stay?',
    a: 'Three nights in low season, five nights over Christmas, New Year and Easter.',
  },
  {
    q: 'Can I bring my pet?',
    a: 'Pet policies differ by listing. Tell us your dates and the pet in advance, and we will confirm which Koora homes can accept it.',
  },
  {
    q: 'What is included?',
    a: 'Concierge, mid-stay housekeeping, linens and towels, Wi-Fi, and a local maintenance contact. A villa-specific cleaning fee is added at checkout.',
  },
  {
    q: 'Do you have a car? Do I need one?',
    a: 'We recommend a 4x4 — the roads around Santa Teresa and Malpaís are unpaved. We can arrange a rental or airport transfer for you.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Full refund up to 30 days before arrival. 50% up to 14 days. Inside 14 days the booking is non-refundable. We strongly recommend travel insurance.',
  },
  {
    q: 'How far are you from the airport?',
    a: 'About 4–5 hours from San José (SJO) including the ferry, or a 25-minute domestic flight to Tambor from San José.',
  },
];

export default function FaqPage() {
  return (
    <div className="bg-white">
      <div className="container-koora pt-28 lg:pt-36">
        <FadeUp>
          <p className="eyebrow">Questions</p>
          <h1 className="mt-3 max-w-2xl text-display-sm">Everything you asked us.</h1>
        </FadeUp>

        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={Math.min(i * 0.04, 0.24)}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl marker:content-none">
                  {f.q}
                  <span className="relative h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current" />
                    <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-14 max-w-3xl rounded-none border border-line bg-wash/50 px-8 py-10">
            <h2 className="text-2xl">Still not sure?</h2>
            <p className="mt-2 text-sm text-muted">
              Message us and a real person answers — usually within a couple of hours.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className="btn-ghost">{CONTACT.phone1}</a>
              <Link href="/contact" className="btn-primary">Send a message</Link>
            </div>
          </div>
        </FadeUp>
      </div>
      <div className="pb-20 lg:pb-28" />
    </div>
  );
}
