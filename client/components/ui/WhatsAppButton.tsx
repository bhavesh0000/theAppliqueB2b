import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    if (window.innerWidth < 768) {
      setIsVisible(true);
    }

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    const phoneNumber = "919602456367";
    const message = encodeURIComponent("Hello! I'm interested in your products.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        bg-[#25D366] hover:bg-[#20BA5A]
        text-white
        rounded-full
        shadow-2xl hover:shadow-3xl
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
      `}
      style={{
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
      }}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" style={{ animationDuration: "2s" }} />
    </button>
  );
}