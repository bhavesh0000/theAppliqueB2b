// import React, { useEffect, useState } from "react";
// import { useHome } from "@/lib/api";
// import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
// import OptimizedImage from "@/components/ui/OptimizedImage";

// export default function Hero() {
//   const { data } = useHome();
//   const [api, setApi] = useState<CarouselApi>();
//   const [current, setCurrent] = useState(0);

//   const fallback = [
//     { id: 'f1', title: 'Handcrafted Textiles', subtitle: 'Rooted in Jaipur tradition', imageUrl: 'https://images.unsplash.com/photo-1514995669114-6f5f7bff5f3b?q=80&w=1800&auto=format&fit=crop' },
//     { id: 'f2', title: 'Modern depth, timeless craft', subtitle: 'Presented with care', imageUrl: 'https://images.unsplash.com/photo-1520975698516-7f2a3d7c7b0a?q=80&w=1800&auto=format&fit=crop' },
//   ];
//   const slides = data?.hero?.length ? data.hero : fallback;

//   // Preload first hero image
//   useEffect(() => {
//     if (slides[0]?.imageUrl) {
//       const link = document.createElement("link");
//       link.rel = "preload";
//       link.as = "image";
//       link.href = slides[0].imageUrl;
//       document.head.appendChild(link);

//       return () => {
//         document.head.removeChild(link);
//       };
//     }
//   }, [slides]);

//   // Auto-scroll carousel every 5 seconds
//   useEffect(() => {
//     if (!api) return;

//     const interval = setInterval(() => {
//       api.scrollNext();
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval);
//   }, [api]);

//   // Track current slide
//   useEffect(() => {
//     if (!api) return;

//     const onSelect = () => {
//       setCurrent(api.selectedScrollSnap());
//     };

//     api.on("select", onSelect);
//     return () => {
//       api.off("select", onSelect);
//     };
//   }, [api]);

//   const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     const el = e.currentTarget;
//     const rect = el.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const px = (x / rect.width - 0.5) * 2;
//     const py = (y / rect.height - 0.5) * 2;
//     const tx = px * 28;
//     const ty = py * 20;
//     const rx = -py * 6;
//     const ry = px * 6;
//     el.style.setProperty("--tx", `${tx}px`);
//     el.style.setProperty("--ty", `${ty}px`);
//     el.style.setProperty("--rx", `${rx}deg`);
//     el.style.setProperty("--ry", `${ry}deg`);
//   };

//   const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
//     const el = e.currentTarget;
//     el.style.setProperty("--tx", `0px`);
//     el.style.setProperty("--ty", `0px`);
//     el.style.setProperty("--rx", `0deg`);
//     el.style.setProperty("--ry", `0deg`);
//   };

//   return (
//     <section className="relative">
//       <Carousel 
//         className="w-full" 
//         opts={{ loop: true }}
//         setApi={setApi}
//       >
//         <CarouselContent>
//           {slides.map((slide, index) => (
//             <CarouselItem key={slide.id}>
//               <div 
//                 className="hero-slide relative h-[60vh] md:h-[75vh] lg:h-[80vh]" 
//                 onPointerMove={handleMove} 
//                 onPointerLeave={handleLeave}
//               >
//                 <OptimizedImage
//                   src={slide.imageUrl}
//                   alt={slide.title}
//                   className="hero-image absolute inset-0 h-full w-full"
//                   objectFit="cover"
//                   priority={index === 0}
//                   sizes="100vw"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//                 <div className="hero-content absolute bottom-6 left-4 right-4 md:left-12 md:bottom-12 lg:bottom-16 max-w-2xl" style={{color: "rgb(255 255 255 / 85%)"}}>
//                   <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight animate-fadeInUp" style={{color: "rgb(255 255 255 / 90%)"}}>{slide.title}</h2>
//                   {slide.subtitle && (
//                     <p className="mt-2 md:mt-3 text-sm md:text-base lg:text-lg animate-fadeInUp" style={{color: "rgb(255 255 255 / 80%)", animationDelay: "0.1s"}}>
//                       {slide.subtitle}
//                     </p>
//                   )}
//                   {slide.ctaHref && slide.ctaLabel && (
//                     <a 
//                       href={slide.ctaHref} 
//                       className="mt-4 md:mt-6 inline-block rounded-md bg-foreground px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold tracking-wide uppercase text-background hover:bg-foreground/90 transition-all duration-300 animate-fadeInUp"
//                       style={{animationDelay: "0.2s"}}
//                     >
//                       {slide.ctaLabel}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Slide indicators */}
//         {slides.length > 1 && (
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => api?.scrollTo(index)}
//                 className={`
//                   h-2 rounded-full transition-all duration-300
//                   ${index === current 
//                     ? 'w-8 bg-white' 
//                     : 'w-2 bg-white/50 hover:bg-white/75'
//                   }
//                 `}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </Carousel>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { useHome } from "@/lib/api";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function Hero() {
  const { data } = useHome();
  const [api, setApi] = useState<CarouselApi>();
  
  const fallback = [
    { id: 'f1', title: 'Handcrafted Textiles', subtitle: 'Rooted in Jaipur tradition', imageUrl: 'https://images.unsplash.com/photo-1514995669114-6f5f7bff5f3b?q=80&w=1800&auto=format&fit=crop' },
    { id: 'f2', title: 'Modern depth, timeless craft', subtitle: 'Presented with care', imageUrl: 'https://images.unsplash.com/photo-1520975698516-7f2a3d7c7b0a?q=80&w=1800&auto=format&fit=crop' },
  ];
  const slides = data?.hero?.length ? data.hero : fallback;

  // Preload first hero image for faster initial render
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

  // Auto-play carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api]);

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
      <Carousel 
        className="w-full" 
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="hero-slide relative h-[72vh] md:h-[80vh]" onPointerMove={handleMove} onPointerLeave={handleLeave}>
                <OptimizedImage
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="hero-image absolute inset-0 h-full w-full"
                  objectFit="cover"
                  priority={index === 0} // Prioritize first slide
                  sizes="100vw"
                  useResponsiveVariants={false} // Disable for ALL hero images
                  adaptiveObjectFit={false} 
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="hero-content absolute bottom-8 left-4 right-4 md:left-12 md:bottom-12 max-w-2xl" style={{color: "rgb(255 255 255 / 78%)"}}>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight animate-fade-in-up" style={{color: "rgb(255 255 255 / 78%)"}}>{slide.title}</h2>
                  {slide.subtitle && <p className="mt-2 text-foreground/80 md:text-lg animate-fade-in-up animation-delay-200 hidden md:block" style={{color: "rgb(255 255 255 / 78%)"}}>{slide.subtitle}</p>}
                  {slide.ctaHref && slide.ctaLabel && (
                    <a href={slide.ctaHref} className="mt-6 inline-block rounded-md bg-foreground px-6 py-3 text-xs font-semibold tracking-wide uppercase text-background animate-fade-in-up animation-delay-400 hover:scale-105 transition-transform">
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