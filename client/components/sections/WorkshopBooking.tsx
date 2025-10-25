
// import React, { useState, useEffect, useRef, type MouseEvent } from "react";
// import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

// export default function WorkshopBooking() {
//   const images = ["/images/workshop/wb1.jpg", "/images/workshop/wb3.jpg", "/images/workshop/wb4.jpg"];

//   const [api, setApi] = useState<CarouselApi | null>(null);
//   const [paused, setPaused] = useState(false);
//   const pauseRef = useRef(false);

//   const [tilt, setTilt] = useState<{ index: number | null; rx: number; ry: number }>({ index: null, rx: 0, ry: 0 });
//   const [contentTilt, setContentTilt] = useState({ rx: 0, ry: 0 });

//   const imgRefs = useRef<HTMLDivElement[]>([]);
//   const contentRef = useRef<HTMLDivElement | null>(null);
//   const setmoreButtonRef = useRef<HTMLAnchorElement | null>(null);

//   useEffect(() => {
//     pauseRef.current = paused;
//   }, [paused]);

//   // Load Setmore script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.id = 'setmore_script';
//     script.type = 'text/javascript';
//     script.src = 'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       const existingScript = document.getElementById('setmore_script');
//       if (existingScript) {
//         document.body.removeChild(existingScript);
//       }
//     };
//   }, []);

//   // autoplay
//   useEffect(() => {
//     if (!api) return;
//     let mounted = true;
//     const tick = () => {
//       if (!mounted || pauseRef.current) return;
//       try {
//         api.scrollNext();
//       } catch (e) {
//         // ignore
//       }
//     };

//     const id = window.setInterval(tick, 3500);
//     return () => {
//       mounted = false;
//       window.clearInterval(id);
//     };
//   }, [api]);

//   // scroll-driven 3D parallax effect
//   useEffect(() => {
//     let raf = 0;
//     const onScroll = () => {
//       if (raf) cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => {
//         imgRefs.current.forEach((el) => {
//           if (!el) return;
//           const rect = el.getBoundingClientRect();
//           const mid = rect.top + rect.height / 2;
//           const winMid = window.innerHeight / 2;
//           const diff = (mid - winMid) / winMid; // -1 .. 1
//           const translateY = diff * -12; // parallax
//           const rotateX = diff * 6;
//           el.style.transform = `translateY(${translateY}px) perspective(800px) rotateX(${rotateX}deg)`;
//         });

//         if (contentRef.current) {
//           const rect = contentRef.current.getBoundingClientRect();
//           const mid = rect.top + rect.height / 2;
//           const winMid = window.innerHeight / 2;
//           const diff = (mid - winMid) / winMid;
//           const ry = diff * -6;
//           contentRef.current.style.transform = `perspective(900px) rotateY(${ry}deg)`;
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     // initial call
//     onScroll();
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (raf) cancelAnimationFrame(raf);
//     };
//   }, []);

//   const onImgMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
//     const el = e.currentTarget as HTMLDivElement;
//     const rect = el.getBoundingClientRect();
//     const x = (e as any).clientX - rect.left;
//     const y = (e as any).clientY - rect.top;
//     const rx = -((y / rect.height - 0.5) * 10); // rotateX up to 10deg
//     const ry = (x / rect.width - 0.5) * 10; // rotateY up to 10deg
//     setTilt({ index, rx, ry });
//   };

//   const onImgLeave = () => setTilt({ index: null, rx: 0, ry: 0 });

//   const onContentMove = (e: MouseEvent<HTMLDivElement>) => {
//     const el = e.currentTarget as HTMLDivElement;
//     const rect = el.getBoundingClientRect();
//     const x = (e as any).clientX - rect.left;
//     const y = (e as any).clientY - rect.top;
//     const rx = -((y / rect.height - 0.5) * 6); // milder
//     const ry = (x / rect.width - 0.5) * 6;
//     setContentTilt({ rx, ry });
//   };
//   const onContentLeave = () => setContentTilt({ rx: 0, ry: 0 });

//   const openSetmoreBooking = () => {
//     if (setmoreButtonRef.current) {
//       setmoreButtonRef.current.click();
//     }
//   };

//   return (
//     <section className="container py-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//         <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
//           <Carousel opts={{ loop: true }} setApi={setApi}>
//             <CarouselContent>
//               {images.map((src, i) => (
//                 <CarouselItem key={i} className="md:basis-full">
//                   <div
//                     ref={(el) => {
//                       if (!el) return;
//                       imgRefs.current[i] = el;
//                     }}
//                     className="overflow-hidden rounded-md transition-transform duration-500 will-change-transform"
//                     onMouseMove={(e) => onImgMove(e, i)}
//                     onMouseLeave={onImgLeave}
//                     style={{ transformStyle: "preserve-3d", perspective: 1000 }}
//                   >
//                     <img
//                       src={src}
//                       alt={`Workshop ${i + 1}`}
//                       className="h-80 w-full object-scale-down transform-gpu transition-transform duration-500"
//                       style={{
//                         transform: tilt.index === i ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04)` : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
//                         willChange: "transform",
                        
//                       }}
//                     />
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             {/* arrows intentionally removed */}
//           </Carousel>
//         </div>

//         <div
//           ref={contentRef}
//           className="py-2 pointer-events-auto relative z-10"
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => {
//             setPaused(false);
//             onContentLeave();
//           }}
//           onMouseMove={onContentMove}
//           style={{ transformStyle: "preserve-3d", perspective: 900 }}
//         >
//           <div
//             className="rounded-md p-4 transition-transform duration-300 will-change-transform"
//             style={{ transform: `perspective(900px) rotateX(${contentTilt.rx}deg) rotateY(${contentTilt.ry}deg)` }}
//           >
//             <h3 className="text-xl font-semibold transform-gpu transition-transform duration-300">Hands-on Workshop</h3>
//             <p className="text-foreground/80 mt-2 mb-4">Join our hands-on atelier workshops where you'll learn traditional applique techniques and make your own piece to take home. Sessions are small and interactive.</p>
//             <ul className="mb-4 list-disc pl-5 text-foreground/80">
//               <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Duration: 3 hours</li>
//               <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Group size: up to 8 people</li>
//               <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Materials included</li>
//             </ul>
//           </div>

//           <div className="mt-4">
//             <button
//               onPointerDown={(e) => {
//                 e.stopPropagation();
//                 console.info("Visit Workshop pointerdown");
//               }}
//               onTouchStart={(e) => {
//                 e.stopPropagation();
//                 console.info("Visit Workshop touchstart");
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.info("Visit Workshop clicked");
//                 openSetmoreBooking();
//               }}
//               className="rounded-md z-[9999] bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background transition-transform duration-400 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-lg pointer-events-auto relative"
//               role="button"
//               tabIndex={0}
//               style={{ transformStyle: "preserve-3d", perspective: 800 }}
//             >
//               <span style={{ display: "inline-block", transform: "translateZ(12px)" }}>Visit Workshop</span>
//             </button>

//             {/* Hidden Setmore button that gets triggered programmatically */}
//             <a
//               ref={setmoreButtonRef}
//               style={{ display: "none" }}
//               id="Setmore_button_iframe"
//               href='https://theapplique.setmore.com'
//             >
//               Book Appointment
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect, useRef, type MouseEvent } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function WorkshopBooking() {
  const images = ["/images/workshop/wb1.jpg", "/images/workshop/wb3.jpg", "/images/workshop/wb4.jpg"];

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);

  const [tilt, setTilt] = useState<{ index: number | null; rx: number; ry: number }>({ index: null, rx: 0, ry: 0 });
  const [contentTilt, setContentTilt] = useState({ rx: 0, ry: 0 });

  const imgRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const setmoreButtonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);

  // Load Setmore script
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'setmore_script';
    script.type = 'text/javascript';
    script.src = 'https://assets.setmore.com/integration/static/setmoreIframeLive.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('setmore_script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // autoplay
  useEffect(() => {
    if (!api) return;
    let mounted = true;
    const tick = () => {
      if (!mounted || pauseRef.current) return;
      try {
        api.scrollNext();
      } catch (e) {
        // ignore
      }
    };

    const id = window.setInterval(tick, 3500);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, [api]);

  // scroll-driven 3D parallax effect
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        imgRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          const winMid = window.innerHeight / 2;
          const diff = (mid - winMid) / winMid; // -1 .. 1
          const translateY = diff * -12; // parallax
          const rotateX = diff * 6;
          el.style.transform = `translateY(${translateY}px) perspective(800px) rotateX(${rotateX}deg)`;
        });

        if (contentRef.current) {
          const rect = contentRef.current.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          const winMid = window.innerHeight / 2;
          const diff = (mid - winMid) / winMid;
          const ry = diff * -6;
          contentRef.current.style.transform = `perspective(900px) rotateY(${ry}deg)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initial call
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onImgMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = (e as any).clientX - rect.left;
    const y = (e as any).clientY - rect.top;
    const rx = -((y / rect.height - 0.5) * 10); // rotateX up to 10deg
    const ry = (x / rect.width - 0.5) * 10; // rotateY up to 10deg
    setTilt({ index, rx, ry });
  };

  const onImgLeave = () => setTilt({ index: null, rx: 0, ry: 0 });

  const onContentMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = (e as any).clientX - rect.left;
    const y = (e as any).clientY - rect.top;
    const rx = -((y / rect.height - 0.5) * 6); // milder
    const ry = (x / rect.width - 0.5) * 6;
    setContentTilt({ rx, ry });
  };
  const onContentLeave = () => setContentTilt({ rx: 0, ry: 0 });

  const openSetmoreBooking = () => {
    if (setmoreButtonRef.current) {
      setmoreButtonRef.current.click();
    }
  };

  return (
    <section className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Carousel opts={{ loop: true }} setApi={setApi}>
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={i} className="md:basis-full">
                  <div
                    ref={(el) => {
                      if (!el) return;
                      imgRefs.current[i] = el;
                    }}
                    className="overflow-hidden rounded-md transition-transform duration-500 will-change-transform"
                    onMouseMove={(e) => onImgMove(e, i)}
                    onMouseLeave={onImgLeave}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  >
                    <OptimizedImage
                      src={src}
                      alt={`Workshop ${i + 1}`}
                      className="h-80 w-full"
                      objectFit="scale-down"
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* arrows intentionally removed */}
          </Carousel>
        </div>

        <div
          ref={contentRef}
          className="py-2 pointer-events-auto relative z-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            onContentLeave();
          }}
          onMouseMove={onContentMove}
          style={{ transformStyle: "preserve-3d", perspective: 900 }}
        >
          <div
            className="rounded-md p-4 transition-transform duration-300 will-change-transform"
            style={{ transform: `perspective(900px) rotateX(${contentTilt.rx}deg) rotateY(${contentTilt.ry}deg)` }}
          >
            <h3 className="text-xl font-semibold transform-gpu transition-transform duration-300">Hands-on Workshop</h3>
            <p className="text-foreground/80 mt-2 mb-4">Join our hands-on atelier workshops where you'll learn traditional applique techniques and make your own piece to take home. Sessions are small and interactive.</p>
            <ul className="mb-4 list-disc pl-5 text-foreground/80">
              <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Duration: 3 hours</li>
              <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Group size: up to 8 people</li>
              <li className="transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1">Materials included</li>
            </ul>
          </div>

          <div className="mt-4">
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                console.info("Visit Workshop pointerdown");
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                console.info("Visit Workshop touchstart");
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.info("Visit Workshop clicked");
                openSetmoreBooking();
              }}
              className="rounded-md z-[9999] bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background transition-transform duration-400 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-lg pointer-events-auto relative"
              role="button"
              tabIndex={0}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
            >
              <span style={{ display: "inline-block", transform: "translateZ(12px)" }}>Visit Workshop</span>
            </button>

            {/* Hidden Setmore button that gets triggered programmatically */}
            <a
              ref={setmoreButtonRef}
              style={{ display: "none" }}
              id="Setmore_button_iframe"
              href='https://theapplique.setmore.com'
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}