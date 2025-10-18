// import { useHome } from "@/lib/api";

// export default function EditorialBanner() {
//   const { data } = useHome();
//   const banner = data?.banners?.[0];
//   if (!banner) return null;
//   const imgSrc = banner.imageUrl || 'https://images.unsplash.com/photo-1520975698516-7f2a3d7c7b0a?q=80&w=1600&auto=format&fit=crop';
//   return (
//     <section className="container py-12 md:py-16">
//       <a href="#about" className="group relative block overflow-hidden rounded-md">
//         <img src={imgSrc} alt={banner.title} className="h-[360px] md:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
//         <div className="absolute inset-0 bg-gradient-to-t to-transparent" />
//         <div className="absolute bottom-6 left-6">
//           <h3 className="text-2xl md:text-3xl " style={{color: "rgb(255 255 255 / 78%)"}}>{banner.title}</h3>
//           {banner.subtitle && (
//             <p className="mt-1 text-sm md:text-base " style={{color: "rgb(255 255 255 / 78%)"}}>{banner.subtitle}</p>
//           )}
//         </div>
//       </a>
//     </section>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { useHome } from "@/lib/api";

export default function EditorialBannerCarousel() {
  const { data } = useHome();
  const banners = data?.banners || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-rotate carousel (pause when hovering on video)
  useEffect(() => {
    if (hoveredIndex === null && banners.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hoveredIndex, banners.length]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const banner = banners[index];
    const videoRef = videoRefs.current[index];
    
    const isVideo = banner.isVideo || banner.videoUrl || 
                   (banner.imageUrl || '').match(/\.(mp4|webm|ogg)$/i);
    
    if (videoRef && isVideo) {
      videoRef.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const banner = banners[index];
    const videoRef = videoRefs.current[index];
    
    const isVideo = banner.isVideo || banner.videoUrl || 
                   (banner.imageUrl || '').match(/\.(mp4|webm|ogg)$/i);
    
    if (videoRef && isVideo) {
      videoRef.pause();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (!banners.length) return null;

  return (
    <section className="container py-12 md:py-16">
      <div className="relative">
        {/* Main Carousel Container */}
        <div className="relative overflow-hidden rounded-md">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => {
              const mediaUrl = banner.videoUrl || banner.imageUrl || '/placeholder.svg';
              const isVideo = banner.isVideo || banner.videoUrl || mediaUrl.match(/\.(mp4|webm|ogg)$/i);
              
              return (
                <div
                  key={banner.id}
                  className="min-w-full"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <a 
                    href={banner.href || "#"}
                    className="group relative block"
                  >
                    {isVideo ? (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={mediaUrl}
                        className="h-[360px] md:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={banner.posterImage}
                      />
                    ) : (
                      <img 
                        src={mediaUrl} 
                        alt={banner.title} 
                        className="h-[360px] md:h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">
                        {banner.title}
                      </h3>
                      {banner.subtitle && (
                        <p className="mt-2 text-sm md:text-base text-white/90 drop-shadow">
                          {banner.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Play icon for videos */}
                    {isVideo && hoveredIndex !== index && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="bg-white/25 backdrop-blur-sm rounded-full p-4">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows - Only show if multiple banners */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails (Optional) */}
      {banners.length > 1 && (
        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
          {banners.map((banner, index) => {
            const thumbUrl = banner.posterImage || banner.imageUrl || banner.videoUrl || '/placeholder.svg';
            const isVideo = banner.isVideo || banner.videoUrl;
            
            return (
              <button
                key={banner.id}
                onClick={() => goToSlide(index)}
                className={`
                  relative aspect-video rounded overflow-hidden transition-all duration-200
                  ${index === currentIndex 
                    ? 'ring-2 ring-primary opacity-100' 
                    : 'opacity-60 hover:opacity-80'
                  }
                `}
              >
                <img 
                  src={thumbUrl.replace(/\.(mp4|webm|ogg)$/i, '.jpg')} 
                  alt={`${banner.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
