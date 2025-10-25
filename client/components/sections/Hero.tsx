import React, { useEffect} from "react";
import { useHome } from "@/lib/api";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import OptimizedImage from "../ui/OptimizedImage";

export default function Hero() {
  const { data } = useHome();
  const fallback = [
    { id: 'f1', title: 'Handcrafted Textiles', subtitle: 'Rooted in Jaipur tradition', imageUrl: 'https://images.unsplash.com/photo-1514995669114-6f5f7bff5f3b?q=80&w=1800&auto=format&fit=crop' },
    { id: 'f2', title: 'Modern depth, timeless craft', subtitle: 'Presented with care', imageUrl: 'https://images.unsplash.com/photo-1520975698516-7f2a3d7c7b0a?q=80&w=1800&auto=format&fit=crop' },
  ];
  const slides = data?.hero?.length ? data.hero : fallback;

  // new code
  useEffect(() => {
    if (slides[0]?.imageUrl) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = slides[0].imageUrl;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [slides]);


  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2; // -1..1
    const py = (y / rect.height - 0.5) * 2;
    const tx = px * 28; // translate range
    const ty = py * 20;
    const rx = -py * 6; // rotateX
    const ry = px * 6; // rotateY
    el.style.setProperty("--tx", `${tx}px`);
    el.style.setProperty("--ty", `${ty}px`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <section className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="hero-slide relative h-[72vh] md:h-[80vh]" onPointerMove={handleMove} onPointerLeave={handleLeave}>
                <OptimizedImage
                  src={slide.imageUrl}
                  alt={slide.title}
                  objectFit="cover"
                  priority={index === 0} // Prioritize first slide
                  sizes="100vw"
                  // loading="lazy"
                  className="hero-image absolute inset-0 h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="hero-content absolute bottom-8 left-4 right-4 md:left-12 md:bottom-12 max-w-2xl" style={{color: "rgb(255 255 255 / 78%)"}}>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{color: "rgb(255 255 255 / 78%)"}}>{slide.title}</h2>
                  {slide.subtitle && <p className="mt-2 text-foreground/80 md:text-lg" style={{color: "rgb(255 255 255 / 78%)"}}>{slide.subtitle}</p>}
                  {slide.ctaHref && slide.ctaLabel && (
                    <a href={slide.ctaHref} className="mt-6 inline-block rounded-md bg-foreground px-6 py-3 text-xs font-semibold tracking-wide uppercase text-background">
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
