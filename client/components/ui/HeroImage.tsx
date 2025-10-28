import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
}

/**
 * HeroImage - Optimized image component for carousel slides
 * Features:
 * - Aggressive preloading for smooth transitions
 * - No lazy loading to prevent buffering
 * - Fade-in animation when loaded
 * - Optimized for hero/carousel use
 */
export default function HeroImage({
  src,
  alt,
  priority = false,
  className,
  onLoad,
}: HeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Preload image aggressively
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    
    // If image is already cached, set loaded immediately
    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => {
        setIsLoaded(true);
      };
      img.onerror = () => {
        setHasError(true);
      };
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Loading placeholder with shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
               style={{ animation: "shimmer 2s infinite linear" }} />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-muted-foreground text-sm">Failed to load image</div>
        </div>
      )}

      {/* Actual image - always eager loading for carousel */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager" // Always eager for carousel
        decoding="async"
        fetchPriority={priority ? "high" : "high"} // High priority for all carousel images
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "absolute inset-0 w-full h-full object-cover object-center",
          "transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          willChange: isLoaded ? "auto" : "opacity",
        }}
      />
    </div>
  );
}