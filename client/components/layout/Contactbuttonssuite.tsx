import { Phone, MessageCircle, Mail } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * ContactButtonsSuite - Complete contact solution
 * Shows Call, WhatsApp, and Email buttons (mobile only)
 * Stacked vertically on the right side
 */

interface ContactButton {
  icon: React.ReactNode;
  onClick: () => void;
  bgColor: string;
  hoverColor: string;
  shadowColor: string;
  label: string;
}

export default function ContactButtonsSuite() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const phoneNumber = "919602456367";
  const email = "info@yourcompany.com";

  const buttons: ContactButton[] = [
    {
      icon: <Phone className="w-6 h-6" strokeWidth={2} />,
      onClick: () => window.location.href = `tel:+${phoneNumber}`,
      bgColor: "bg-[#0088cc]",
      hoverColor: "hover:bg-[#006ba6]",
      shadowColor: "rgba(0, 136, 204, 0.4)",
      label: "Call us"
    },
    {
      icon: <MessageCircle className="w-6 h-6" strokeWidth={2} />,
      onClick: () => {
        const message = encodeURIComponent("Hello! I'm interested in your products.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      },
      bgColor: "bg-[#25D366]",
      hoverColor: "hover:bg-[#20BA5A]",
      shadowColor: "rgba(37, 211, 102, 0.4)",
      label: "WhatsApp"
    },
    {
      icon: <Mail className="w-6 h-6" strokeWidth={2} />,
      onClick: () => window.location.href = `mailto:${email}`,
      bgColor: "bg-[#EA4335]",
      hoverColor: "hover:bg-[#c53929]",
      shadowColor: "rgba(234, 67, 53, 0.4)",
      label: "Email us"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={`
            flex items-center justify-center
            w-14 h-14
            ${button.bgColor} ${button.hoverColor}
            text-white
            rounded-full
            shadow-2xl hover:shadow-3xl
            transition-all duration-300 ease-in-out
            transform hover:scale-110 active:scale-95
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
          `}
          style={{
            boxShadow: `0 4px 20px ${button.shadowColor}`,
            transitionDelay: `${index * 50}ms`
          }}
          aria-label={button.label}
          title={button.label}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
}