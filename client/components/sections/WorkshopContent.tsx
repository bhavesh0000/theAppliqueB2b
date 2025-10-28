import React, { useEffect, useRef } from "react";
import OptimizedImage from "../ui/OptimizedImage";
import PageHero from "@/components/ui/PageHero";

export default function WorkshopContent() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );

    el.querySelectorAll('.reveal').forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const blocks = [
    {
      title: 'Experience the Art of Hand Block Printing',
      img: '/images/workshop/wbm1.webp',
      content: (
        <>
          <p className="mb-2">At Applique, we don’t just create fabrics — we celebrate the story behind them. Our Hand Block Printing Workshop invites you to step into the heart of Jaipur’s artistic heritage and experience the age-old process of textile printing that has inspired designers and craftsmen for centuries.</p>
          <p>Whether you’re a buyer, designer, or craft enthusiast, this immersive workshop offers a rare opportunity to witness how each piece of fabric comes to life — from the first carved block to the final printed yard.</p>
        </>
      ),
    },
    {
      title: 'Discover the Magic Behind Every Print',
      img: '/images/workshop/wbm2.webp',
      content: (
        <>
          <ul className="text-foreground/80 leading-relaxed list-disc pl-5 mb-3">
            <li>Intricate wooden blocks are hand-carved with precision and traditional motifs.</li>
            <li>Natural and eco-friendly dyes are mixed to achieve perfect color balance.</li>
            <li>Fabric is carefully printed, washed, and dried to reveal stunning, layered patterns.</li>
            <li>The right color palettes and patterns are chosen to create unique fabric stories.</li>
          </ul>
          <p className="text-foreground/80">This hands-on experience lets you not only observe but also try your hand at printing your own fabric, giving you a tangible connection to the art form.</p>
        </>
      ),
    },
    {
      title: 'A Creative Collaboration Between Buyer & Artisan',
      img: '/images/workshop/wbm4.jpg',
      content: (
        <>
          <p className="text-foreground/80 mb-2">At Applique, we believe creativity thrives when people connect with craftsmanship. Through our workshop, international buyers and designers can collaborate directly with artisans — understanding the nuances of design, scale, and pattern repetition that influence final collections.</p>
          <p className="text-foreground/80">This experience often inspires visiting designers to develop custom prints, apparel lines, or home décor concepts that blend traditional Indian aesthetics with their own creative vision.</p>
        </>
      ),
    },
  ];

  return (
    <section ref={ref} className="container" style={{ paddingTop: "0rem" , paddingBottom: "3rem"}}>
      <div className="reveal mb-8">
        <PageHero
          videoUrl="/images/workshop/wbv1.mp4"
          imageUrl="/images/workshop/wbv1.webp?q=80&w=1800&auto=format&fit=crop"
          title={<span>Experience the Art of Hand Block Printing – Applique Workshop</span>}
          subtitle={<p className=" leading-relaxed max-w-2xl" >At Applique, we don’t just create fabrics — we celebrate the story behind them. Our Hand Block Printing Workshop invites you to step into the heart of Jaipur’s artistic heritage and experience the age-old process of textile printing. Want to join? <a href="/contact" className="underline">Contact us</a> or see related <a href="/collections" className="underline">Collections</a>.</p>}
        />
      </div>

      <div className="grid gap-16">
        {blocks.map((b, i) => (
          <div key={i} className="reveal opacity-0 transform translate-y-8 transition duration-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="overflow-hidden rounded-md media-card">
                  <OptimizedImage src={b.img} alt={b.title}  className="w-full" objectFit="contain" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>

              <div className={`md:col-span-6 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-2xl font-semibold mb-4">{b.title}</h3>
                <div className="text-foreground/80 leading-relaxed">{b.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
