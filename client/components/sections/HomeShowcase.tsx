// import React, { useEffect, useRef } from "react";

// export default function HomeShowcase() {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("in-view");
//           }
//         });
//       },
//       { threshold: 0.15 }
//     );

//     el.querySelectorAll(".showcase-reveal").forEach((n) => obs.observe(n));

//     return () => obs.disconnect();
//   }, []);


//   const showcases = [
//     {
//       heading: 'Handcrafted textiles — Rooted in tradition',
//       text: 'Each piece is carved, printed and finished by skilled hands. As you scroll, layers of craft come forward with motion to tell the making story.',
//       img: '/images/slider/hm1.jpg?q=80&w=1800&auto=format&fit=crop'
//     },
//     {
//       heading: 'Modern presentation, timeless craft',
//       text: 'We present printed textiles with modern depth — large imagery and subtle motion that invites you in.',
//       img: '/images/slider/hm2.jpg?q=90&w=1800&auto=format&fit=crop'
//     }
//     // {
//     //   heading: 'Design that invites touch',
//     //   text: 'Full-screen imagery and layered reveals help the story pop as you scroll.',
//     //   img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1800&auto=format&fit=crop'
//     // }
//   ];

//   return (
//     <section ref={ref} className="showcase container py-16 md:py-24">
//       <div className="grid gap-12">
//         {showcases.map((s, i) => (
//           <div key={i} className="showcase-reveal reveal opacity-0 transform translate-y-10 transition duration-800">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
//               <div className="md:col-span-7">
//                 <div className="overflow-hidden rounded-md">
//                   <img src={s.img} alt={s.heading} loading="lazy" className="w-full h-64 md:h-[420px] object-cover" />
//                 </div>
//               </div>

//               <div className="md:col-span-5">
//                 <h3 className="text-2xl font-semibold mb-3">{s.heading}</h3>
//                 <p className="text-foreground/80">{s.text}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function HomeShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    el.querySelectorAll(".showcase-reveal").forEach((n) => obs.observe(n));

    return () => obs.disconnect();
  }, []);


  const showcases = [
    {
      heading: 'The Art of Handblock Printing — Crafted by Tradition, Perfected by Hand.',
      text: 'Step into the world of authentic Indian hand block printing, where every fabric is a masterpiece of color, culture, and craftsmanship At The Applique, we blend centuries-old Sanganeri block printing techniques with modern design sensibilities and global quality standards, creating textiles that inspire fashion designers, boutiques, and décor brands worldwide. Our master artisans hand-carve wooden printing blocks, mix natural dyes, and stamp each pattern by hand, producing eco-friendly, luxurious, and sustainable fabrics loved across international markets.',
      img: '/images/slider/hm11.webp'
    },
    {
      heading: 'From Fabric to Finish — Custom Manufacturing You Can Trust.',
      text: 'Whether you’re a boutique owner, designer, retailer, or global brand, The Applique helps turn your creative vision into reality. From block-printed cottons and linens to stitched garments and home décor items, we provide end-to-end textile manufacturing — including printing, sampling, stitching, finishing, quality control, and packaging — all handled by skilled professionals in India. With custom designs, flexible MOQs, and worldwide export support, we’ve become a trusted B2B textile manufacturing partner for brands across the USA, UK, Europe, and beyond.',
      img: '/images/slider/hm4.webp'
    },
    {
      heading: 'Learn. Print. Create. — Join Our Handblock Printing Workshops',
      text: 'Immerse yourself in the heritage of Indian textile art with our hand block printing workshops in Rajasthan. Experience every stage of this ancient craft — from block carving and natural dye preparation to printing your own fabric alongside local artisans. Perfect for artists, travelers, design students, and creative teams, our workshops are an unforgettable textile art experience that connects culture, creativity, and sustainability.',
      img: '/images/slider/hm23.webp'
    },
    {
      heading: 'Sustainable Craft. Global Impact. — Handmade With Heart',
      text: 'At The Applique, sustainability meets craftsmanship. We use eco-friendly dyes, organic cotton, and zero-waste printing methods, ensuring every creation respects both people and the planet. By supporting our artisans, you’re helping preserve India’s centuries-old textile traditions while promoting fair trade and ethical production.We believe in fashion and décor that tell a story — crafted responsibly, cherished globally.',
      img: '/images/slider/hm3.webp'
    },
  ];

  return (
    <section ref={ref} className="showcase container py-16 md:py-24">
      <div className="grid gap-12">
        {showcases.map((s, i) => (
          <div key={i} className="showcase-reveal reveal opacity-0 transform translate-y-10 transition duration-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <div className="overflow-hidden rounded-md">
                  <OptimizedImage
                    src={s.img}
                    alt={s.heading}
                    className="w-full h-64 md:h-[420px]"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-2xl font-semibold mb-3">{s.heading}</h3>
                <p className="text-foreground/80">{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
