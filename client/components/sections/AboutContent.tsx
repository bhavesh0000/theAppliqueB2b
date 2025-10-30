// import React, { useEffect, useRef } from "react";
// import AnimatedHeading from "@/components/ui/AnimatedHeading";
// import { Link } from "react-router-dom";
// import PageHero from "@/components/ui/PageHero";
// import OptimizedImage from "../ui/OptimizedImage";

// function useReveal() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("in-view");
//           }
//         });
//       },
//       { threshold: 0.25 }
//     );

//     el.querySelectorAll('.reveal').forEach((child) => obs.observe(child));

//     return () => obs.disconnect();
//   }, []);

//   return containerRef;
// }

// export default function AboutContent() {
//   const ref = useReveal();

//   const items = [
//     {
//       id: "journey",
//       title: "Our Journey",
//       img: "/images/about/Ab2.webp",
//       content: (
//         <>
//           <p className="mb-2">Our journey began in 2020 when our founder — born into a traditional weaver community — decided to transform a lifelong passion for colors, fabrics, and artistry into a purpose-driven business. After six years of experience in the aviation industry, they returned to their roots to revive the timeless legacy of Indian block printing and showcase it to the world.</p>
//           <p>
//             What began as a small setup with just three artisans has evolved into a thriving production unit of over 50 skilled artisans. Every stage of our work — from designing, carving wooden blocks, and hand printing to dyeing, quality checking, and stitching — is handled with precision, dedication, and care.
//           </p>
//         </>
//       ),
//     },
//     {
//       id: "expertise",
//       title: "Our Expertise",
//       img: "/images/about/Ab1.webp",
//       content: (
//         <>
//           <p className="mb-2">We specialize in hand block printed home décor fabrics, apparel textiles, and customized designs for global designers and retailers. Our collections merge tradition with innovation, offering diverse options for interior designers, boutiques, and fashion labels.</p>
//           <p>We take pride in using eco-friendly dyes, sustainable production methods, and ethically sourced materials. Every fabric we produce carries a minimal environmental footprint and supports a fair livelihood for local artisans.</p>
//         </>
//       ),
//     },
//     {
//       id: "vision",
//       title: "Global Collaborations & Vision",
//       img: "/images/about/Ab5.webp",
//       content: (
//         <>
//           <p className="mb-2">As a trusted Jaipur textile exporter, The Applique has built strong collaborations with boutiques, fashion designers, and retailers across India as well as globally. Our hand block printed fabrics are cherished by clients who appreciate authentic craftsmanship, slow fashion values, and cultural artistry.</p>
//           <p>Our vision is to bridge the gap between Indian textile craftsmanship and global design innovation.</p>
//         </>
//       ),
//     },
//     {
//       id: "workshop",
//       title: "Experience & Workshop",
//       img: "/images/workshop/wbm2.webp",
//       content: (
//         <>
//           <p className="mb-2">Experience the art of hand block printing through our immersive workshops — step into Jaipur’s artistic heritage and witness the process from carved block to final print. Bookings are open year-round for buyers, designers, and craft enthusiasts.</p>
//           <p>For bookings and enquiries, <Link to="/workshop" className="underline">visit the workshop page</Link> or <Link to="/contact" className="underline">contact us</Link> directly</p>
//         </>
//       ),
//     },
//     {
//       id: "collabs",
//       title: "Design Partnerships",
//       // img: "/images/about/Ab6.jpg?q=80&w=1400&auto=format&fit=crop",
//       img: "/images/about/Ab6.jpg",
//       content: <p>We partner with boutiques, designers and global brands to co-create collections with integrity and craft.</p>,
//     },
//     {
//       id: "sustain",
//       title: "Sustainability",
//       img: "/images/about/Ab7.webp",
//       content: <p>Eco-friendly dyes, ethical sourcing and minimal waste are core to our process.</p>,
//     },
//   ];


//   React.useEffect(() => {
//     const cards = Array.from(document.querySelectorAll<HTMLElement>('.mosaic-card'));
//     if (!cards.length) return;

//     const update = () => {
//       const mid = window.innerHeight / 2;
//       cards.forEach((el) => {
//         const r = el.getBoundingClientRect();
//         const center = r.top + r.height / 2;
//         const rel = (mid - center) / mid; // -1..1
//         const sy = Math.max(-18, Math.min(18, rel * 18));
//         el.style.setProperty('--sy', `${sy}px`);
//       });
//     };

//     update();
//     window.addEventListener('scroll', update, { passive: true });
//     window.addEventListener('resize', update);
//     return () => {
//       window.removeEventListener('scroll', update);
//       window.removeEventListener('resize', update);
//     };
//   }, []);

//   return (
//     <section ref={ref} className="container py-12 md:py-16 " style={{ paddingTop: "0rem" , paddingBottom: "3rem"}}>
//       <div className="reveal mb-8">
//         <PageHero
//         className="container "
//           imageUrl="/images/about/Abm1.webp"
//           title={<AnimatedHeading level={3} className="text-3xl md:text-4xl font-extrabold">About The Applique – The Art of Handcrafted Perfection</AnimatedHeading>}
//           subtitle={<p className="mt-3  leading-relaxed max-w-2xl">At The Applique, we believe every fabric tells a story — a story of craftsmanship, culture, and creativity. Rooted in the vibrant textile heritage of Jaipur, India, we are a leading hand block printing manufacturer and exporter, dedicated to preserving India’s age-old printing traditions while meeting the dynamic demands of modern global markets.</p>}
//         />
//       </div>

//       <div className="grid gap-16">
//         {items.map((it, i) => (
//           <div key={it.id} className="reveal opacity-0 transform translate-y-8 transition duration-700">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
//               <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
//                 <div className="overflow-hidden rounded-md media-card" >
//                 {/* <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100"> */}
//                   <OptimizedImage src={it.img} alt={it.title}  className=" w-full " sizes="(max-width: 768px) 100vw, 50vw" objectFit="cover" />
//                 </div>
//               </div>

//               <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
//                 <AnimatedHeading level={3} className="text-2xl font-semibold mb-4">{it.title}</AnimatedHeading>
//                 <div className="text-foreground/80 leading-relaxed">
//                   {it.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// }


import React, { useEffect, useRef } from "react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";

function useReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.25 }
    );

    el.querySelectorAll('.reveal').forEach((child) => obs.observe(child));

    return () => obs.disconnect();
  }, []);

  return containerRef;
}

export default function AboutContent() {
  const ref = useReveal();

  const items = [
    {
      id: "journey",
      title: "Our Journey",
      img: "/images/about/Ab2.webp",
      content: (
        <>
          <p className="mb-2">Our journey began in 2020 when our founder — born into a traditional weaver community — decided to transform a lifelong passion for colors, fabrics, and artistry into a purpose-driven business. After six years of experience in the aviation industry, they returned to their roots to revive the timeless legacy of Indian block printing and showcase it to the world.</p>
          <p>
            What began as a small setup with just three artisans has evolved into a thriving production unit of over 50 skilled artisans. Every stage of our work — from designing, carving wooden blocks, and hand printing to dyeing, quality checking, and stitching — is handled with precision, dedication, and care.
          </p>
        </>
      ),
    },
    {
      id: "expertise",
      title: "Our Expertise",
      img: "/images/about/Ab1.webp",
      content: (
        <>
          <p className="mb-2">We specialize in hand block printed home décor fabrics, apparel textiles, and customized designs for global designers and retailers. Our collections merge tradition with innovation, offering diverse options for interior designers, boutiques, and fashion labels.</p>
          <p>We take pride in using eco-friendly dyes, sustainable production methods, and ethically sourced materials. Every fabric we produce carries a minimal environmental footprint and supports a fair livelihood for local artisans.</p>
        </>
      ),
    },
    {
      id: "vision",
      title: "Global Collaborations & Vision",
      img: "/images/about/Ab5.webp",
      content: (
        <>
          <p className="mb-2">As a trusted Jaipur textile exporter, The Applique has built strong collaborations with boutiques, fashion designers, and retailers across India as well as globally. Our hand block printed fabrics are cherished by clients who appreciate authentic craftsmanship, slow fashion values, and cultural artistry.</p>
          <p>Our vision is to bridge the gap between Indian textile craftsmanship and global design innovation.</p>
        </>
      ),
    },
    {
      id: "workshop",
      title: "Experience & Workshop",
      img: "/images/workshop/wbm2.webp",
      content: (
        <>
          <p className="mb-2">Experience the art of hand block printing through our immersive workshops — step into Jaipur's artistic heritage and witness the process from carved block to final print. Bookings are open year-round for buyers, designers, and craft enthusiasts.</p>
          <p>For bookings and enquiries, <Link to="/workshop" className="underline">visit the workshop page</Link> or <Link to="/contact" className="underline">contact us</Link> directly</p>
        </>
      ),
    },
    // {
    //   id: "collabs",
    //   title: "Design Partnerships",
    //   img: "/images/about/Ab6.webp",
    //   content: <p>We partner with boutiques, designers and global brands to co-create collections with integrity and craft.</p>,
    // },
    // {
    //   id: "sustain",
    //   title: "Sustainability",
    //   img: "/images/about/Ab7.webp",
    //   content: <p>Eco-friendly dyes, ethical sourcing and minimal waste are core to our process.</p>,
    // },
  ];


  React.useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.mosaic-card'));
    if (!cards.length) return;

    const update = () => {
      const mid = window.innerHeight / 2;
      cards.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const rel = (mid - center) / mid; // -1..1
        const sy = Math.max(-18, Math.min(18, rel * 18));
        el.style.setProperty('--sy', `${sy}px`);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section ref={ref} className="container py-12 md:py-16 " style={{ paddingTop: "0rem" , paddingBottom: "3rem"}}>
      <div className="reveal mb-8">
        <PageHero
        className="container "
          imageUrl="/images/about/Abm1.webp"
          title={<AnimatedHeading level={3} className="text-2xl md:text-3xl font-extrabold">About The Applique – The Art of Handcrafted Perfection</AnimatedHeading>}
          subtitle={<p className="mt-3  leading-relaxed max-w-2xl hidden md:block">At The Applique, we believe every fabric tells a story — a story of craftsmanship, culture, and creativity. Rooted in the vibrant textile heritage of Jaipur, India, we are a leading hand block printing manufacturer and exporter, dedicated to preserving India's age-old printing traditions while meeting the dynamic demands of modern global markets.</p>}
        />
      </div>

      <div className="grid gap-16">
        {items.map((it, i) => (
          <div key={it.id} className="reveal opacity-0 transform translate-y-8 transition duration-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="overflow-hidden rounded-md aspect-[4/3]">
                  <OptimizedImage 
                    src={it.img}
                    alt={it.title}
                    className="w-full h-full"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <AnimatedHeading level={3} className="text-2xl font-semibold mb-4">{it.title}</AnimatedHeading>
                <div className="text-foreground/80 leading-relaxed">
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}