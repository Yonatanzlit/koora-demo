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

const getText = (el) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

for (const slug of slugs) {
  const file = `/tmp/koora-${slug}.html`;
  if (!fs.existsSync(file)) continue;
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'));
  const doc = dom.window.document;
  const title = doc.querySelector('h1.page-title, h1.title, h1')?.textContent?.trim();
  const address = getText(doc.querySelector('.item-address, .listing-address, address'));
  const price = getText(doc.querySelector('.item-price, .single-item-price, .listing-price'));
  const guests = Number(doc.querySelector('.total-guests')?.textContent?.replace(/\D/g, '')) || undefined;
  const bedrooms = Number([...doc.querySelectorAll('.item-amenities li, .listing-detail li')].map(li => getText(li)).find(t => /bedroom/i.test(t))?.replace(/\D/g, '')) || undefined;
  const bathrooms = Number([...doc.querySelectorAll('.item-amenities li, .listing-detail li')].map(li => getText(li)).find(t => /bathroom/i.test(t))?.replace(/\D/g, '')) || undefined;
  const images = [...new Set([...doc.querySelectorAll('.top-gallery a[data-lazy], .top-gallery img, .single-listing-gallery img, .single-featured img, img.wp-post-image')]
    .map(img => img.getAttribute('data-lazy') || img.getAttribute('data-src') || img.getAttribute('src'))
    .filter(src => src && src.includes('/wp-content/uploads/'))
    .map(src => src.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '').replace(/^http:/, 'https:')))];
  const description = getText(doc.querySelector('.property-description, .listing-description, .single-property-description, #description'));
  const amenities = [...new Set([...doc.querySelectorAll('.amenities li, .property-amenities li, .single-property-amenities li, .amenity-list li')].map(li => getText(li)).filter(Boolean))];
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  console.log(JSON.stringify({ slug, title, address, price, guests, bedrooms, bathrooms, imageCount: images.length, firstImages: images.slice(0,3), description: description.slice(0,240), metaDescription: metaDescription.slice(0,240), amenities }, null, 2));
}
