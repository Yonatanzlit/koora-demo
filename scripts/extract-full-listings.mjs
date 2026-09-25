import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const slugs = [
  'casa-ficus',
  'casa-la-nina',
  'casa-la-onda-ultra-suite-casita-la-onda',
  'casa-la-onda-ultra-suite',
  'casa-loma',
  'la-kasbah-guest-house',
  'santa-teresa-tree-house-1',
  'santa-teresa-tree-house-4',
  'santa-teresa-tree-houses-2',
];

for (const slug of slugs) {
  const file = `/tmp/koora-${slug}.html`;
  if (!fs.existsSync(file)) continue;
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
  const doc = dom.window.document;
  const title = doc.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim();
  const price = doc.querySelector('.item-price')?.textContent?.replace(/\s+/g, ' ').trim();
  const guests = Number([...doc.querySelectorAll('.item-amenities li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()).find(t => /guests/i.test(t))?.replace(/\D/g, '')) || undefined;
  const bedrooms = Number([...doc.querySelectorAll('.item-amenities li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()).find(t => /bedrooms/i.test(t))?.replace(/\D/g, '')) || undefined;
  const baths = Number([...doc.querySelectorAll('.item-amenities li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()).find(t => /bathrooms/i.test(t))?.replace(/\D/g, '')) || undefined;
  const address = doc.querySelector('.item-address, .listing-address, address')?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const description = doc.querySelector('.property-description, .listing-description, .single-property-description, #description')?.textContent?.replace(/\s+/g, ' ').trim() || doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const amenities = [...new Set([...doc.querySelectorAll('li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()).filter(t => t && t.length < 45 && !/^\$|guests|bedrooms|bathrooms|sqft$/i.test(t)))] || [];
  const gallery = [...new Set([...doc.querySelectorAll('a[data-lazy], img')].map(el => el.getAttribute('data-lazy') || el.getAttribute('data-src') || el.getAttribute('src')).filter(src => src?.includes('/wp-content/uploads/')).map(src => src.replace(/^http:/, 'https:')).map(src => src.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '')))];
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  console.log(JSON.stringify({ slug, title, price, guests, bedrooms, baths, address, description, amenities, gallery: gallery.slice(0, 20), metaDescription }, null, 0));
}
