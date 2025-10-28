import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * CallButton Component - Alternative Version
 * Positioned above WhatsApp button in a vertical stack
 * Only visible on mobile devices
 */
export default function CallButtonVertical() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      // Only show on mobile devices
      if (window.innerWidth < 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    const phoneNumber = "919602456367";
    window.location.href = `tel:+${phoneNumber}`;
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-24 right-6 z-50
        flex items-center justify-center
        w-14 h-14
        bg-[#0088cc] hover:bg-[#006ba6]
        text-white
        rounded-full
        shadow-2xl hover:shadow-3xl
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
      `}
      style={{
        boxShadow: "0 4px 20px rgba(0, 136, 204, 0.4)",
      }}
      aria-label="Call us"
      title="Call us now"
    >
      <Phone className="w-7 h-7" strokeWidth={2} />
      <span 
        className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20" 
        style={{ animationDuration: "2s" }} 
      />
    </button>
  );
}