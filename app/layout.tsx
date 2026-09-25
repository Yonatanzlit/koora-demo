import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Koora Rentals — Villas in Santa Teresa & Malpaís, Costa Rica',
    template: '%s · Koora Rentals',
  },
  description:
    'Nine real Koora listings in Santa Teresa and Malpaís on the Nicoya Peninsula. Concierge, housekeeping and maintenance included.',
  openGraph: {
    title: 'Koora Rentals',
    description: 'Villas in Santa Teresa & Malpaís, Costa Rica.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C2B1A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
