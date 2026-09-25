export type City = 'santa-teresa' | 'malpais';

export interface Villa {
  slug: string; name: string; city: City; cityLabel: string; address: string;
  tagline: string; description: string; beds: number; baths: number; sleeps: number;
  pricePerNight: number; rating: number; reviewCount: number; amenities: string[]; highlights: string[];
  bestFor: string[]; images: string[]; featured: boolean; latitude: number; longitude: number;
}

export const VILLAS: Villa[] = [
  {
    slug: "casa-ficus",
    name: "Casa Ficus",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "santa teresa costa rica",
    tagline: "Couples · Beach lifestyle · Walkable stays",
    description: "Welcome to Casa Ficus Casa Ficus is the perfect getaway to experience the ultimate beach lifestyle. Ideally located in the heart of vibrant Santa Teresa, it’s just off the main road yet tucked away on a quiet street, offering total privacy and tranquility. This spacious, airy home is designed for vacation living, flooded with natural",
    beds: 1, baths: 1, sleeps: 2,
    pricePerNight: 120,
    rating: 4.7, reviewCount: 18,
    amenities: ["Air Conditioning","Laundry","Swimming Pool","Wi-Fi","Farmacy","Free Parking","Markets","Shops"],
    highlights: ["Heart of Santa Teresa","Air conditioning","Laundry","Free parking"], bestFor: ["Couples","Beach lifestyle","Walkable stays"],
    images: ["/images/villas/casa-ficus-1.jpg","/images/villas/casa-ficus-2.jpg","/images/villas/casa-ficus-3.jpg","/images/villas/casa-ficus-4.jpg","/images/villas/casa-ficus-5.jpg","/images/villas/casa-ficus-6.jpg"], featured: true,
    latitude: 9.648, longitude: -85.054,
  },
  {
    slug: "casa-la-nina",
    name: "Casa La Niña",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "Santa Teresa, Cóbano, Cantón Puntarenas, Puntarenas Province, 60111, Costa Rica",
    tagline: "Small families · Ocean views · Beach trips",
    description: "Casa La NIÑA is next to Villa Riviera, an incredible ocean view house with a private pool. Located just 5 minutes from one of the most popular beaches of Santa Teresa. Its 2 bedrooms perfectly accommodate 4 people, and it has what it takes to spend an impressive vacation with your family or friends. In",
    beds: 1, baths: 1, sleeps: 2,
    pricePerNight: 120,
    rating: 4.73, reviewCount: 24,
    amenities: ["Air Conditioning","Barbecue Area","Laundry","Swimming Pool","Wi-Fi","Free Parking","Security"],
    highlights: ["Ocean view","Private pool access","BBQ area","Security"], bestFor: ["Small families","Ocean views","Beach trips"],
    images: ["/images/villas/casa-la-nina-1.jpg","/images/villas/casa-la-nina-2.jpg","/images/villas/casa-la-nina-3.jpg","/images/villas/casa-la-nina-4.jpg","/images/villas/casa-la-nina-5.jpg","/images/villas/casa-la-nina-6.jpg"], featured: true,
    latitude: 9.648, longitude: -85.054,
  },
  {
    slug: "casa-la-onda-ultra-suite-casita-la-onda",
    name: "Casa La Onda + Ultra Suite + Casita La Onda",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "Calle La Cala, Santa Teresa, Cóbano, Puntarenas, 60111, Costa Rica",
    tagline: "Groups · Ocean-view retreats · Surf trips",
    description: "Perched atop the existing 3-bdrm Casa la Onda villa sits the newly-constructed Casa la Onda Ultra, featuring breathtaking ocean and jungle views from the spacious bedroom and living room. Now add a well-equipped kitchen, bathroom and luxurious furnishings and you may never wish to leave! El espacio Welcome to Casa La Onda Ultra. With this",
    beds: 2, baths: 1, sleeps: 5,
    pricePerNight: 450,
    rating: 4.76, reviewCount: 31,
    amenities: ["Air Conditioning","Barbecue Area","Laundry","Swimming Pool","Wi-Fi","Free Parking","Security"],
    highlights: ["Ocean and jungle views","Modern kitchen","Hillside terrace","Wi-Fi"], bestFor: ["Groups","Ocean-view retreats","Surf trips"],
    images: ["/images/villas/casa-la-onda-ultra-suite-casita-la-onda-1.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-2.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-3.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-4.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-5.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-6.jpeg"], featured: true,
    latitude: 9.642, longitude: -85.058,
  },
  {
    slug: "casa-la-onda-ultra-suite",
    name: "Casa La Onda + Ultra Suite",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "Calle La Cala, Santa Teresa, Cóbano, Puntarenas, 60111, Costa Rica",
    tagline: "Families · Groups · Long stays",
    description: "Perched atop the existing 3-bdrm Casa la Onda villa sits the newly-constructed Casa la Onda Ultra, featuring breathtaking ocean and jungle views from the spacious bedroom and living room. Now add a well-equipped kitchen, bathroom and luxurious furnishings and you may never wish to leave! El espacio Welcome to Casa La Onda Ultra. With this",
    beds: 3, baths: 1, sleeps: 6,
    pricePerNight: 900,
    rating: 4.79, reviewCount: 35,
    amenities: ["Air Conditioning","Barbecue Area","Laundry","Swimming Pool","Wi-Fi","Free Parking","Security"],
    highlights: ["Complete La Onda collection","Ocean view","Modern kitchen","Hillside terrace"], bestFor: ["Families","Groups","Long stays"],
    images: ["/images/villas/casa-la-onda-ultra-suite-1.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-1.jpeg","/images/villas/casa-la-onda-ultra-suite-2.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-2.jpeg","/images/villas/casa-la-onda-ultra-suite-3.jpeg","/images/villas/casa-la-onda-ultra-suite-casita-la-onda-3.jpeg"], featured: true,
    latitude: 9.642, longitude: -85.058,
  },
  {
    slug: "casa-loma",
    name: "Casa Loma",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "santa teresa",
    tagline: "Luxury travelers · Families · Private groups",
    description: "Casa Loma es una lujosa villa de 3 (5-6) dormitorios en una comunidad privada de la selva costarricense, que ofrece vistas al mar y que abarca 5000 pies cuadrados. Su elegante diseño combina espacios interiores y exteriores sin problemas, con muebles de madera de teca de origen local y grandes ventanales para luz natural y",
    beds: 3, baths: 1, sleeps: 6,
    pricePerNight: 900,
    rating: 4.82, reviewCount: 27,
    amenities: ["Air Conditioning","Barbecue Area","Laundry","Swimming Pool","Wi-Fi","Free Parking"],
    highlights: ["Private community","Approx. 5,000 sq ft","Ocean view","Indoor-outdoor living"], bestFor: ["Luxury travelers","Families","Private groups"],
    images: ["/images/villas/casa-loma-1.jpg","/images/villas/casa-loma-2.jpg","/images/villas/casa-loma-3.jpg","/images/villas/casa-loma-4.jpg","/images/villas/casa-loma-5.jpg","/images/villas/casa-loma-6.jpg"], featured: false,
    latitude: 9.645, longitude: -85.056,
  },
  {
    slug: "la-kasbah-guest-house",
    name: "La Kasbah Guest house",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "las delicias shortcut",
    tagline: "Couples · Budget stays · Quiet escapes",
    description: "",
    beds: 1, baths: 1, sleeps: 2,
    pricePerNight: 120,
    rating: 4.85, reviewCount: 15,
    amenities: ["Air Conditioning","Laundry","Wi-Fi","Free Parking"],
    highlights: ["Private guest house","Quiet location","Easy beach access","Wi-Fi"], bestFor: ["Couples","Budget stays","Quiet escapes"],
    images: ["/images/villas/la-kasbah-guest-house-1.jpg","/images/villas/la-kasbah-guest-house-2.jpg","/images/villas/la-kasbah-guest-house-3.jpg","/images/villas/la-kasbah-guest-house-4.jpg","/images/villas/la-kasbah-guest-house-5.jpg","/images/villas/la-kasbah-guest-house-6.jpg"], featured: false,
    latitude: 9.639, longitude: -85.06,
  },
  {
    slug: "santa-teresa-tree-house-1",
    name: "Santa Teresa Tree House #1",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "C. La Cala",
    tagline: "Nature lovers · Couples · Remote workers",
    description: "Welcome to our brand-new studio, perfect for two guests, nestled right in the heart of nature. The property consists of four unique wooden cabins, designed with a treehouse-inspired style, surrounded by lush jungle and peaceful forest vibes. Here you can enjoy silence, privacy, and total relaxation. This studio is the perfect choice if you’re looking",
    beds: 3, baths: 1, sleeps: 6,
    pricePerNight: 380,
    rating: 4.88, reviewCount: 21,
    amenities: ["Air Conditioning","Wi-Fi","Free Parking","Security"],
    highlights: ["Treehouse design","Jungle setting","Modern studio layout","Wi-Fi"], bestFor: ["Nature lovers","Couples","Remote workers"],
    images: ["/images/villas/santa-teresa-tree-house-1-1.jpg","/images/villas/santa-teresa-tree-house-1-2.jpg","/images/villas/santa-teresa-tree-house-1-3.jpg","/images/villas/santa-teresa-tree-house-1-4.jpg","/images/villas/santa-teresa-tree-house-1-5.jpg","/images/villas/santa-teresa-tree-house-1-6.jpg"], featured: false,
    latitude: 9.642, longitude: -85.058,
  },
  {
    slug: "santa-teresa-tree-house-4",
    name: "Santa Teresa Tree House #4",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "C. La Cala",
    tagline: "Nature lovers · Small groups · Digital nomads",
    description: "Welcometo our brand-new studio, perfect for two guests, nestled right in the heart of nature. The property consists of four unique wooden cabins, designed with a treehouse-inspired style, surrounded by lush jungle and peaceful forest vibes. Here you can enjoy silence, privacy, and total relaxation. This studio is the perfect choice if you’re looking for",
    beds: 3, baths: 1, sleeps: 6,
    pricePerNight: 320,
    rating: 4.91, reviewCount: 19,
    amenities: ["Air Conditioning","Wi-Fi","Free Parking","Security"],
    highlights: ["Treehouse design","Jungle setting","Modern cabin layout","Wi-Fi"], bestFor: ["Nature lovers","Small groups","Digital nomads"],
    images: ["/images/villas/santa-teresa-tree-house-4-1.jpg","/images/villas/santa-teresa-tree-house-4-2.jpg","/images/villas/santa-teresa-tree-house-4-3.jpg","/images/villas/santa-teresa-tree-house-4-4.jpg","/images/villas/santa-teresa-tree-house-4-5.jpg","/images/villas/santa-teresa-tree-house-4-6.jpg"], featured: false,
    latitude: 9.642, longitude: -85.058,
  },
  {
    slug: "santa-teresa-tree-houses-2",
    name: "Santa Teresa Tree Houses #2",
    city: 'santa-teresa', cityLabel: 'Santa Teresa',
    address: "C. La Cala",
    tagline: "Nature lovers · Couples · Quiet retreats",
    description: "Welcometo our brand-new studio, perfect for two guests, nestled right in the heart of nature. The property consists of four unique wooden cabins, designed with a treehouse-inspired style, surrounded by lush jungle and peaceful forest vibes. Here you can enjoy silence, privacy, and total relaxation. This studio is the perfect choice if you’re looking for",
    beds: 3, baths: 1, sleeps: 6,
    pricePerNight: 380,
    rating: 4.94, reviewCount: 23,
    amenities: ["Air Conditioning","Wi-Fi","Free Parking","Security"],
    highlights: ["Treehouse design","Jungle setting","Modern cabin layout","Wi-Fi"], bestFor: ["Nature lovers","Couples","Quiet retreats"],
    images: ["/images/villas/santa-teresa-tree-houses-2-1.jpg","/images/villas/santa-teresa-tree-houses-2-2.jpg","/images/villas/santa-teresa-tree-houses-2-3.jpg","/images/villas/santa-teresa-tree-houses-2-4.jpg","/images/villas/santa-teresa-tree-houses-2-5.jpg","/images/villas/santa-teresa-tree-houses-2-6.jpg"], featured: false,
    latitude: 9.642, longitude: -85.058,
  },
];

export const CITIES = [
  {
    slug: "santa-teresa",
    label: "Santa Teresa",
    blurb: "A jungle-backed beach town with year-round waves, great restaurants, and a relaxed Pacific-coast scene.",
    image: "https://koorarentals.com/wp-content/uploads/2024/03/DJI_0868_websize.jpg"
  },
  {
    slug: "malpais",
    label: "Malpaís",
    blurb: "Rocky coves, seductive swells, and quiet coastline stretching toward Cabo Blanco Nature Reserve.",
    image: "https://koorarentals.com/wp-content/uploads/2025/08/DSC09432.jpg"
  }
];

export const EXPERIENCES = [
  {
    label: "Shopping",
    blurb: "Boutiques and local makers on the main road.",
    image: "https://koorarentals.com/wp-content/uploads/2025/11/Studio-1-001-HDR.jpg"
  },
  {
    label: "Explore",
    blurb: "Waterfalls, Cabo Blanco, hidden beaches.",
    image: "https://koorarentals.com/wp-content/uploads/2025/02/Casa-Ficus-47.jpg"
  },
  {
    label: "Local Food",
    blurb: "Sodas, ceviche, wood-fired pizza, sunset cocktails.",
    image: "https://koorarentals.com/wp-content/uploads/2025/11/Studio-2-001-HDR.jpg"
  },
  {
    label: "Surf",
    blurb: "Consistent waves for every level, lessons arranged.",
    image: "https://koorarentals.com/wp-content/uploads/2024/03/DJI_0868_websize.jpg"
  }
];

export const REVIEWS = [
  {
    name: "Marta L.",
    villa: "Casa Ficus",
    quote: "The location was perfect and the team was responsive from booking to checkout.",
    rating: 5
  },
  {
    name: "Ben & Zoe",
    villa: "Casa La Onda Ultra Suite",
    quote: "Quiet, breezy, and an amazing view. Five minutes from everything but you would never know it.",
    rating: 5
  },
  {
    name: "The Hartmans",
    villa: "Casa Loma",
    quote: "Beautiful space, easy check-in, and the concierge arranged everything we needed.",
    rating: 5
  }
];

export const CONTACT = {
  phone1: "+506 8512 5020",
  phone2: "+506 8494 5273",
  whatsapp: "+50685125020",
  email: "info@koorarentals.com",
  checkIn: "12:00 PM",
  checkOut: "10:00 AM",
  instagram: "https://instagram.com/koorarentals",
  facebook: "https://facebook.com/koorarentals"
};

export function getVilla(slug: string): Villa | undefined { return VILLAS.find(v => v.slug === slug); }
export function villasByCity(city: City): Villa[] { return VILLAS.filter(v => v.city === city); }
