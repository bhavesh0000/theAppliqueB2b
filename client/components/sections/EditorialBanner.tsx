import { useHome } from "@/lib/api";

export default function EditorialBanner() {
  const { data } = useHome();
  const banner = data?.banners?.[0];
  if (!banner) return null;
  return (
    <section className="container py-12 md:py-16">
      <a href="#about" className="group relative block overflow-hidden rounded-md">
        <img src={banner.imageUrl} alt={banner.title} className="h-[360px] md:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h3 className="text-2xl md:text-3xl font-semibold">{banner.title}</h3>
          {banner.subtitle && (
            <p className="mt-1 text-sm md:text-base text-foreground/80">{banner.subtitle}</p>
          )}
        </div>
      </a>
    </section>
  );
}
