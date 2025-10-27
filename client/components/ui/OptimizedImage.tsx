import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  onLoad?: () => void;
  sizes?: string;
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
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
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
        rootMargin: "50px", // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate srcset for responsive images
  const generateSrcSet = (originalSrc: string) => {
    // Remove query parameters and get base path
    const baseSrc = originalSrc.split("?")[0];
    
    // Remove file extension
    const lastDot = baseSrc.lastIndexOf(".");
    const baseWithoutExt = lastDot > 0 ? baseSrc.substring(0, lastDot) : baseSrc;
    const ext = lastDot > 0 ? baseSrc.substring(lastDot) : ".webp";
    
    // Use .webp extension if available, otherwise keep original
    const webpExt = ext.toLowerCase().includes(".webp") ? ext : ".webp";
    
    // Define responsive variants matching compression script output
    const variants = [
      { suffix: "-mobile", width: 400 },
      { suffix: "-sm", width: 640 },
      { suffix: "-md", width: 768 },
      { suffix: "-lg", width: 1024 },
      { suffix: "-xl", width: 1280 },
      { suffix: "-2xl", width: 1600 },
    ];
    
    // Build srcset with responsive variants
    const srcsetEntries = variants.map(
      (variant) => `${baseWithoutExt}${variant.suffix}${webpExt} ${variant.width}w`
    );
    
    // Add original image as fallback
    srcsetEntries.push(`${baseWithoutExt}${webpExt} 2000w`);
    
    return srcsetEntries.join(", ");
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/50 to-muted" />
      )}

      {/* Actual image - only load when in view or priority */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          srcSet={generateSrcSet(src)}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          className={cn(
            "w-full h-full transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            objectFit === "cover" && "object-cover object-center",
            objectFit === "contain" && "object-contain object-center",
            objectFit === "fill" && "object-fill",
            objectFit === "scale-down" && "object-scale-down object-center"
          )}
          style={{
            objectPosition: "center",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      )}

      {/* Loading spinner for priority images */}
      {priority && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground/60" />
        </div>
      )}
    </div>
  );
}