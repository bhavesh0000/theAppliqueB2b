import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "auto";
  onLoad?: () => void;
  sizes?: string;
  maxHeight?: string;
  adaptiveObjectFit?: boolean;
  useResponsiveVariants?: boolean; // New: Enable/disable responsive variants
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  objectFit = "auto",
  onLoad,
  sizes,
  maxHeight,
  adaptiveObjectFit = true,
  useResponsiveVariants = true, // Default to true for backwards compatibility
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isPortrait, setIsPortrait] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
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
        rootMargin: "50px",
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
    // If responsive variants are disabled, return empty string
    if (!useResponsiveVariants) {
      return "";
    }

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
    setHasError(false);
    
    // Detect if image is portrait
    if (imgRef.current && adaptiveObjectFit) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const aspectRatio = naturalWidth / naturalHeight;
      setIsPortrait(aspectRatio < 0.95);
    }
    
    onLoad?.();
  };

  const handleError = () => {
    // If we haven't tried the fallback yet
    if (!fallbackSrc && useResponsiveVariants) {
      console.warn(`Failed to load responsive variants for: ${src}. Falling back to original.`);
      setFallbackSrc(src); // Use original src as fallback
      setHasError(false);
    } else {
      console.error(`Failed to load image: ${src}`);
      setHasError(true);
    }
  };

  // Determine the actual object-fit to use
  const getObjectFit = () => {
    if (objectFit !== "auto") return objectFit;
    if (adaptiveObjectFit && isPortrait) return "contain";
    return "cover";
  };

  const actualObjectFit = getObjectFit();

  // Calculate container aspect ratio
  const getContainerAspect = () => {
    if (width && height) {
      return `${width} / ${height}`;
    }
    if (isPortrait && !width && !height) {
      return undefined;
    }
    return undefined;
  };

  // Determine which src to use
  const imageSrc = fallbackSrc || src;
  const imageSrcSet = fallbackSrc ? "" : generateSrcSet(src);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-muted",
        actualObjectFit === "cover" ? "overflow-hidden" : "",
        isPortrait && actualObjectFit === "contain" ? "flex items-center justify-center" : "",
        className
      )}
      style={{
        aspectRatio: getContainerAspect(),
        maxHeight: maxHeight || (isPortrait ? "80vh" : undefined),
        minHeight: isPortrait ? "400px" : undefined,
      }}
    >
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/50 to-muted" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30 text-muted-foreground">
          <svg
            className="h-12 w-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">Image failed to load</span>
        </div>
      )}

      {/* Actual image - only load when in view or priority */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          srcSet={imageSrcSet}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            actualObjectFit === "contain" || isPortrait 
              ? "max-w-full max-h-full h-auto w-auto" 
              : "w-full h-full",
            actualObjectFit === "cover" && "object-cover object-center",
            actualObjectFit === "contain" && "object-contain object-center",
            actualObjectFit === "fill" && "object-fill",
            actualObjectFit === "scale-down" && "object-scale-down object-center"
          )}
          style={{
            objectPosition: "center",
          }}
        />
      )}

      {/* Loading spinner for priority images */}
      {priority && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground/60" />
        </div>
      )}
    </div>
  );
}