import React from "react";
import { Link } from "react-router-dom";
import { useHome } from "@/lib/api";

export default function CollectionsGrid() {
  const { data } = useHome();

  if (!data?.collections?.length) return null;

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <h3 className="text-xl md:text-2xl font-semibold tracking-wide uppercase">Collections</h3>
        <Link to="/collections" className="text-sm text-foreground/70 hover:text-foreground">View collections</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.collections.map((c: any) => (
          <Link key={c.id} to={`/collections/${c.id}`} className="group relative block overflow-hidden rounded-md">
            <img src={c.imageUrl} alt={c.title} className="h-72 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-lg font-medium">{c.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
