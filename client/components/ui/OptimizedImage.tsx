import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  onLoad?: () => void;
  sizes?: string;
  aspectRatio?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  objectFit = "cover",
  onLoad,
  sizes,
  aspectRatio,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "150px",
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const generateSrcSet = (originalSrc: string) => {
    const baseSrc = originalSrc.split("?")[0];
    const sizes = [320, 640, 768, 1024, 1280, 1536];
    return sizes
      .map((size) => `${baseSrc}?w=${size}&q=70&auto=format ${size}w`)
      .join(", ");
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const getAspectRatio = () => {
    if (aspectRatio) return aspectRatio;
    if (width && height) return `${width} / ${height}`;
    return undefined;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-muted/20", className)}
      style={{
        aspectRatio: getAspectRatio(),
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/30 via-muted/15 to-muted/30" />
        </div>
      )}

      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          srcSet={generateSrcSet(src)}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          className={cn(
            "w-full h-full transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "scale-down" && "object-scale-down",
            objectFit === "none" && "object-none"
          )}
          style={{
            objectPosition: "center",
          }}
        />
      )}

      {priority && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-3 border-foreground/10 border-t-foreground/50" />
        </div>
      )}
    </div>
  );
}