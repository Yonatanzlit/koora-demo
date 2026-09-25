import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-black pb-10 sm:min-h-[88svh] lg:min-h-screen lg:pb-16 lg:pt-40">
      <Image
        src="https://koorarentals.com/wp-content/uploads/2024/03/DJI_0868_websize.jpg"
        alt="Aerial view of Santa Teresa and the Pacific coastline"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45" />

      <div className="container-koora relative">
        <p className="eyebrow !text-white/70 animate-fade-up">Santa Teresa · Malpaís · Nicoya Peninsula</p>
        <h1 className="mt-4 max-w-5xl text-display uppercase text-white animate-fade-up [animation-delay:120ms]">
          Costa Rica villas, designed for living
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 animate-fade-up [animation-delay:240ms] lg:text-base lg:leading-7">
          Nine real Koora listings. Concierge, housekeeping and maintenance included — you just show up.
        </p>

        <div className="mt-8 animate-fade-up [animation-delay:360ms]">
          <SearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
}
