import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useHome } from "@/lib/api";

export default function CollectionsGrid() {
  const { data } = useHome();
  const [open, setOpen] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  if (!data?.collections?.length) return null;

  function openCollection(c: any) {
    const imgs = [c.imageUrl, "/placeholder.svg", "/placeholder.svg"];
    setGalleryTitle(c.title);
    setGalleryImages(imgs);
    setOpen(true);
  }

  function openAllCollections() {
    const imgs = data.collections.map((c: any) => c.imageUrl);
    setGalleryTitle("All Collections");
    setGalleryImages(imgs);
    setOpen(true);
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="text-xl md:text-2xl font-semibold tracking-wide uppercase">Collections</h3>
        <button onClick={openAllCollections} className="text-sm text-foreground/70 hover:text-foreground">View collections</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.collections.map((c) => (
          <div
            key={c.id}
            onClick={() => openCollection(c)}
            role="button"
            tabIndex={0}
            className="group relative block overflow-hidden rounded-md cursor-pointer"
          >
            <img src={c.imageUrl} alt={c.title} className="h-72 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-lg font-medium">{c.title}</h4>
            </div>
          </div>
        ))}
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
        </div>,
        document.body
      ) : null}
    </section>
  );
}
