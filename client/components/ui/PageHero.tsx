// import React from "react";

// interface Props {
//   imageUrl: string;
//   title?: React.ReactNode;
//   subtitle?: React.ReactNode;
//   className?: string;
// }

// export default function PageHero({ imageUrl, title, subtitle, className = "" }: Props) {
//   const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     const el = e.currentTarget;
//     const rect = el.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;
//     const tx = x * 18;
//     const ty = y * 12;
//     const rx = -y * 4;
//     const ry = x * 4;
//     el.style.setProperty("--tx", `${tx}px`);
//     el.style.setProperty("--ty", `${ty}px`);
//     el.style.setProperty("--rx", `${rx}deg`);
//     el.style.setProperty("--ry", `${ry}deg`);
//   };

//   const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
//     const el = e.currentTarget;
//     el.style.setProperty("--tx", `0px`);
//     el.style.setProperty("--ty", `0px`);
//     el.style.setProperty("--rx", `0deg`);
//     el.style.setProperty("--ry", `0deg`);
//   };

//   return (
//     <div className={`hero-slide page-hero ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave} >
//       <img src={imageUrl} alt={typeof title === 'string' ? title : 'hero'} className="hero-image absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//       <div className="hero-inner">
//         {title && <div className="hero-title text-3xl md:text-4xl font-extrabold" style={{color: "rgb(255 255 255 / 78%)"}}>{title}</div>}
//         {subtitle && <div className="hero-subtitle mt-2  max-w-2xl" style={{color: "rgb(255 255 255 / 78%)"}}>{subtitle}</div>}
//       </div>
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";

interface Props {
  imageUrl?: string;
  videoUrl?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

export default function PageHero({ imageUrl, videoUrl, title, subtitle, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays if it exists
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tx = x * 18;
    const ty = y * 12;
    const rx = -y * 4;
    const ry = x * 4;
    el.style.setProperty("--tx", `${tx}px`);
    el.style.setProperty("--ty", `${ty}px`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div 
      className={`hero-slide page-hero ${className}`} 
      onPointerMove={handleMove} 
      onPointerLeave={handleLeave}
    >
      {videoUrl ? (
        <video
          ref={videoRef}
          className="hero-media hero-video absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
          {imageUrl && <img src={imageUrl} alt="fallback" />}
        </video>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={typeof title === 'string' ? title : 'hero'} 
          className="hero-media hero-image absolute inset-0 h-full w-full object-cover object-center" 
          loading="lazy" 
        />
      ) : null}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="hero-inner">
        {title && (
          <div className="hero-title text-3xl md:text-4xl font-extrabold" style={{color: "rgb(255 255 255 / 78%)"}}>
            {title}
          </div>
        )}
        {subtitle && (
          <div className="hero-subtitle mt-2 max-w-2xl" style={{color: "rgb(255 255 255 / 78%)"}}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}