import { Header } from "./Header";
import { Footer } from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Add enter classes to animate page content on route change
    el.classList.remove("page-enter-active");
    el.classList.add("page-enter");
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.classList.add("page-enter-active");
    const t = window.setTimeout(() => {
      el.classList.remove("page-enter", "page-enter-active");
      // el.classList.remove("page-enter-active");
    }, 700);
    return () => clearTimeout(t);
  }, [loc.pathname]);

  // Global reveal observer for elements with .reveal or .showcase-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );

    const nodes = Array.from(document.querySelectorAll('.reveal, .showcase-reveal, .interactive'));
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, []);

  // subtle global pointer parallax affecting the page container
  // useEffect(() => {
  //   let raf = 0;
  //   const onPointer = (e: PointerEvent) => {
  //     if (raf) cancelAnimationFrame(raf);
  //     raf = requestAnimationFrame(() => {
  //       const w = window.innerWidth;
  //       const h = window.innerHeight;
  //       const gx = (e.clientX / w - 0.5) * 2; // -1..1
  //       const gy = (e.clientY / h - 0.5) * 2;
  //       document.documentElement.style.setProperty('--gx', String(gx.toFixed(3)));
  //       document.documentElement.style.setProperty('--gy', String(gy.toFixed(3)));
  //     });
  //   };
  //   window.addEventListener('pointermove', onPointer);
  //   return () => {
  //     window.removeEventListener('pointermove', onPointer);
  //     if (raf) cancelAnimationFrame(raf);
  //   };
  // }, []);
  useEffect(() => {
    let raf = 0;
    const onPointer = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const gx = ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3);
        const gy = ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3);
        document.documentElement.style.setProperty('--gx', gx);
        document.documentElement.style.setProperty('--gy', gy);
      });
    };
    window.addEventListener('pointermove', onPointer);
    return () => {
      window.removeEventListener('pointermove', onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main ref={containerRef} className="flex-1 page-transition">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
