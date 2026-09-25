import Link from 'next/link';
import { CONTACT } from '@/data/villas';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white/70">
      <div className="container-koora py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-3xl text-white">Koora</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Nine real Koora listings in Santa Teresa and Malpaís, on the Nicoya Peninsula.
              Concierge, housekeeping and maintenance included.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-white">
                Instagram
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-white">
                Facebook
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow !text-white/50">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/villas" className="hover:text-white">All villas</Link></li>
              <li><Link href="/#locations" className="hover:text-white">Locations</Link></li>
              <li><Link href="/about" className="hover:text-white">About Koora</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow !text-white/50">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`} className="hover:text-white">{CONTACT.phone1}</a></li>
              <li><a href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`} className="hover:text-white">{CONTACT.phone2}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
              <li className="pt-2 text-white/70">Check-in {CONTACT.checkIn}</li>
              <li className="text-white/70">Check-out {CONTACT.checkOut}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Koora Rentals. All rights reserved.</p>
          <p>Santa Teresa · Malpaís · Costa Rica</p>
        </div>
      </div>
    </footer>
  );
}
