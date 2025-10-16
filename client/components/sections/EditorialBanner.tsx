import { useHome } from "@/lib/api";

export default function EditorialBanner() {
  const { data } = useHome();
  const banner = data?.banners?.[0];
  if (!banner) return null;
  const imgSrc = banner.imageUrl || 'https://images.unsplash.com/photo-1520975698516-7f2a3d7c7b0a?q=80&w=1600&auto=format&fit=crop';
  return (
    <section className="container py-12 md:py-16">
      <a href="#about" className="group relative block overflow-hidden rounded-md">
        <img src={imgSrc} alt={banner.title} className="h-[360px] md:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h3 className="text-2xl md:text-3xl " style={{color: "rgb(255 255 255 / 78%)"}}>{banner.title}</h3>
          {banner.subtitle && (
            <p className="mt-1 text-sm md:text-base " style={{color: "rgb(255 255 255 / 78%)"}}>{banner.subtitle}</p>
          )}
        </div>
      </a>
    </section>
  );
}
