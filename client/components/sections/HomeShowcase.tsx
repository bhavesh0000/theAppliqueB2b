import React, { useEffect, useRef } from "react";

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
      heading: 'Handcrafted textiles — Rooted in tradition',
      text: 'Each piece is carved, printed and finished by skilled hands. As you scroll, layers of craft come forward with motion to tell the making story.',
      img: '/images/slider/hm1.jpg?q=80&w=1800&auto=format&fit=crop'
    },
    {
      heading: 'Modern presentation, timeless craft',
      text: 'We present printed textiles with modern depth — large imagery and subtle motion that invites you in.',
      img: '/images/slider/hm2.jpg?q=90&w=1800&auto=format&fit=crop'
    }
    // {
    //   heading: 'Design that invites touch',
    //   text: 'Full-screen imagery and layered reveals help the story pop as you scroll.',
    //   img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1800&auto=format&fit=crop'
    // }
  ];

  return (
    <section ref={ref} className="showcase container py-16 md:py-24">
      <div className="grid gap-12">
        {showcases.map((s, i) => (
          <div key={i} className="showcase-reveal reveal opacity-0 transform translate-y-10 transition duration-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <div className="overflow-hidden rounded-md">
                  <img src={s.img} alt={s.heading} loading="lazy" className="w-full h-64 md:h-[420px] object-cover" />
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
