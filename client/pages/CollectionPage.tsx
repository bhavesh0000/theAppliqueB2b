import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCollection, useHome } from "@/lib/api";
import Layout from "@/components/layout/Layout";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function CollectionPage() {
  const { id } = useParams();
  const { data: meta } = useHome();
  const { data, isLoading } = useCollection(id);

  const collection = meta?.collections?.find((c: any) => c.id === id);

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <AnimatedHeading level={2} className="text-2xl font-semibold tracking-wide">{collection?.title ?? "Collection"}</AnimatedHeading>
          <Link to="/collections" className="text-sm text-foreground/70 hover:text-foreground">Back to collections</Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-md overflow-hidden bg-background border border-border">
                <div className="media-card bg-muted animate-pulse" aria-hidden="true" />
                <div className="p-3">
                  <div className="h-3 bg-muted w-3/4 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.products?.map((p: any) => (
            <div key={p.id} className="rounded-md overflow-hidden bg-background border border-border reveal interactive">
              <div className="media-card overflow-hidden">
                <img src={p.imageUrl} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && data?.products?.length === 0 && <div className="mt-6 text-foreground/70">No products found in this collection.</div>}
      </section>
    </Layout>
  );
}
