import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useHome } from "@/lib/api";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Link } from "react-router-dom";

export default function FeaturedCarousel() {
  const { data } = useHome();
  if (!data?.featured?.length) return null;

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <AnimatedHeading level={3} className="text-xl md:text-2xl font-semibold tracking-wide uppercase">Featured</AnimatedHeading>
        <Link to="/collections" className="text-sm text-foreground/70 hover:text-foreground">View collections</Link>
      </div>
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {data.featured.map((p) => (
              <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="group block">
                  <Link to={p.collectionId ? `/collections/${p.collectionId}` : '/collections'} className="overflow-hidden rounded-md media-card cursor-pointer interactive block">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500" />
                  </Link>
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
    </section>
  );
}
