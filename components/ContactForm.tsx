'use client';

import { useState } from 'react';

export default function ContactForm({ villas }: { villas: string[] }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    dates: '',
    guests: '',
    villa: '',
    message: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="rounded-none border border-line bg-white p-8 lg:p-10">
        <p className="eyebrow">Thank you</p>
        <h2 className="mt-3 text-2xl">We have your dates.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Koora will come back to you shortly with the right villa. For anything urgent, WhatsApp is
          fastest.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-ink underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-none border border-line bg-white p-6 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="eyebrow">Name</span>
          <input
            required
            value={form.name}
            onChange={set('name')}
            className="mt-2 w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
            placeholder="Your name"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            className="mt-2 w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="eyebrow">Dates</span>
          <input
            value={form.dates}
            onChange={set('dates')}
            className="mt-2 w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
            placeholder="e.g. 12–19 Feb"
          />
        </label>

        <label className="block">
          <span className="eyebrow">Guests</span>
          <input
            value={form.guests}
            onChange={set('guests')}
            className="mt-2 w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
            placeholder="e.g. 4 adults"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow">Villa of interest</span>
          <select
            value={form.villa}
            onChange={set('villa')}
            className="mt-2 w-full rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
          >
            <option value="">No preference — recommend one</option>
            {villas.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow">Message</span>
          <textarea
            value={form.message}
            onChange={set('message')}
            rows={4}
            className="mt-2 w-full resize-none rounded-none border border-line bg-white px-4 py-3 text-base outline-none focus:border-ink"
            placeholder="Pets, kids, surf boards, anything that matters."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-ink px-6 py-3.5 text-base font-medium text-white transition hover:bg-black/70"
      >
        Send enquiry
      </button>
    </form>
  );
}
