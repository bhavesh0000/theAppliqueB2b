import { useHome } from "@/lib/api";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Hero() {
  const { data } = useHome();
  if (!data?.hero?.length) return null;
  return (
    <section className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {data.hero.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[72vh] md:h-[80vh]">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-4 right-4 md:left-12 md:bottom-12 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{slide.title}</h2>
                  {slide.subtitle && (
                    <p className="mt-2 text-foreground/80 md:text-lg">{slide.subtitle}</p>
                  )}
                  {slide.ctaHref && slide.ctaLabel && (
                    <a
                      href="#contact"
                      className="mt-6 inline-block rounded-md bg-foreground px-6 py-3 text-xs font-semibold tracking-wide uppercase text-background"
                    >
                      Enquire Now
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
