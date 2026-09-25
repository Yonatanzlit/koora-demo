import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import FadeUp from '@/components/FadeUp';
import { CONTACT, VILLAS } from '@/data/villas';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Message Koora Rentals about a villa in Santa Teresa or Malpaís.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container-koora pt-28 lg:pt-36">
        <FadeUp>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-2xl text-display-sm">Tell us your dates.</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Share where and when, how many of you, and anything that matters — pets, kids, surf
            boards. We will come back with the right villa.
          </p>
        </FadeUp>
      </div>

      <div className="container-koora mt-12 grid gap-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
        <FadeUp>
          <ContactForm villas={VILLAS.map((v) => v.name)} />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-8">
            <div>
              <p className="eyebrow">Direct</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className="hover:text-ink">{CONTACT.phone1}</a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`} className="hover:text-ink">{CONTACT.phone2}</a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">{CONTACT.email}</a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Find us</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Santa Teresa & Malpaís<br />
                Nicoya Peninsula, Puntarenas<br />
                Costa Rica
              </p>
            </div>

            <div>
              <p className="eyebrow">Check-in / out</p>
              <p className="mt-4 text-sm text-muted">
                In after {CONTACT.checkIn} · Out by {CONTACT.checkOut}
              </p>
            </div>

            <div className="overflow-hidden rounded-none border border-line">
              <iframe
                title="Map of Santa Teresa, Costa Rica"
                src="https://www.google.com/maps?q=Santa%20Teresa%2C%20Costa%20Rica&output=embed"
                loading="lazy"
                className="h-[280px] w-full"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
