import React, { useState, useEffect, useRef, useMemo, type MouseEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export default function WorkshopBooking() {
  const images = ["/images/workshop/wb2.jpg", "/images/workshop/wb3.jpg", "/images/workshop/wb5.jpg"];

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);

  const [tilt, setTilt] = useState<{ index: number | null; rx: number; ry: number }>({ index: null, rx: 0, ry: 0 });
  const [contentTilt, setContentTilt] = useState({ rx: 0, ry: 0 });

  const availableTimes = useMemo(() => ["09:00", "11:00", "14:00", "16:00"], []);

  // controlled dialog open state
  const [open, setOpen] = useState(false);

  const imgRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);

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

  const submit = async (e?: FormEvent) => {
    e?.preventDefault?.();
    if (!name || !email || !selectedDate || !selectedTime) {
      alert("Please fill name, email and select a date and time slot.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, slotDate: selectedDate, slotTime: selectedTime, notes }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess("Thanks — your booking request has been received. We'll contact you to confirm.");
      setName("");
      setEmail("");
      setPhone("");
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
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
                    <img
                      src={src}
                      alt={`Workshop ${i + 1}`}
                      className="h-80 w-full object-scale-down transform-gpu transition-transform duration-500"
                      style={{
                        transform: tilt.index === i ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04)` : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                        willChange: "transform",
                      }}
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
                setOpen(true);
              }}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="rounded-md z-[9999] bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background transition-transform duration-400 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-lg pointer-events-auto relative"
              role="button"
              tabIndex={0}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
            >
              <span style={{ display: "inline-block", transform: "translateZ(12px)" }}>Visit Workshop</span>
            </button>
          </div>

          {open && typeof document !== "undefined" ? createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
                  <div className="relative w-full max-w-2xl mx-4 rounded-lg bg-background p-6 shadow-2xl z-60">
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute right-4 top-4 text-foreground/80 hover:text-foreground"
                      aria-label="Close dialog"
                    >
                      ×
                    </button>

                    <h3 className="text-lg font-semibold mb-2">Book an Appointment</h3>
                    <p className="text-sm text-foreground/70 mb-4">Select a date and time slot, and provide your contact details. We'll confirm availability shortly.</p>

                    {success && <div className="rounded-md bg-foreground/5 p-3 text-sm text-foreground mb-4">{success}</div>}

                    <form onSubmit={(e) => void submit(e as any)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} placeholder="Full name" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
                        <input required type="email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} placeholder="Email" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} placeholder="Phone" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
                        <input required value={selectedDate} onChange={(e) => setSelectedDate((e.target as HTMLInputElement).value)} type="date" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
                      </div>

                      <div>
                        <div className="mb-2 text-sm font-medium">Select time slot</div>
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map((t) => (
                            <label key={t} className={`cursor-pointer rounded-md border px-3 py-2 ${selectedTime === t ? "bg-foreground text-background" : "bg-background"}`}>
                              <input type="radio" name="slot" value={t} checked={selectedTime === t} onChange={() => setSelectedTime(t)} className="sr-only" />
                              <span className="text-sm">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <textarea value={notes} onChange={(e) => setNotes((e) => setNotes((e.target as HTMLTextAreaElement).value))} placeholder="Notes / what you'd like to learn" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none h-24" />

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button type="submit" disabled={loading} className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background hover:opacity-95">
                          {loading ? "Sending..." : "Request Booking"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>,
                document.body
              ) : null}
        </div>
      </div>
    </section>
  );
}
