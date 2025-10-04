import { useHome } from "@/lib/api";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { useHome } from "@/lib/api";

export default function FeaturedCarousel() {
  const { data } = useHome();
  const [open, setOpen] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  if (!data?.featured?.length) return null;

  function openFeatured(p: any) {
    setGalleryTitle(p.title);
    setGalleryImages([p.imageUrl, "/placeholder.svg"]);
    setOpen(true);
  }

  function openAllCollections() {
    const imgs = data.featured.map((p: any) => p.imageUrl);
    setGalleryTitle("All featured");
    setGalleryImages(imgs);
    setOpen(true);
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="text-xl md:text-2xl font-semibold tracking-wide uppercase">Featured</h3>
        <button onClick={openAllCollections} className="text-sm text-foreground/70 hover:text-foreground">View collections</button>
      </div>
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {data.featured.map((p) => (
              <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="group block">
                  <div className="overflow-hidden rounded-md cursor-pointer" onClick={() => openFeatured(p)}>
                    <img src={p.imageUrl} alt={p.title} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <h4 className="text-sm md:text-base">{p.title}</h4>
                    <a href="#contact" className="text-sm text-foreground/80 underline">Enquire</a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex border-foreground/30 text-foreground/80 hover:text-foreground hover:border-foreground/50 bg-background/70" />
          <CarouselNext className="hidden md:flex border-foreground/30 text-foreground/80 hover:text-foreground hover:border-foreground/50 bg-background/70" />
        </Carousel>
      </div>

      {open && typeof document !== "undefined" ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-3xl mx-4 rounded-lg bg-background p-6 shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-foreground/80 hover:text-foreground">×</button>
            <h3 className="text-lg font-semibold mb-3">{galleryTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {galleryImages.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-md">
                  <img src={src} alt={`${galleryTitle} ${i + 1}`} className="w-full object-cover h-48" />
                </div>
              ))}
            </div>
          </div>
        </div>, document.body) : null}
    </section>
  );
}
