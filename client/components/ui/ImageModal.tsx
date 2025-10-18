import React from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  src?: string;
  title?: string;
  content?: React.ReactNode;
  onClose: () => void;
}

export default function ImageModal({ open, src, title, content, onClose }: Props) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-4xl mx-4 rounded-lg p-4 glass z-70">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-foreground/80 hover:text-foreground"
          aria-label="Close"
        >
          ×
        </button>

        {src && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img src={src} alt={title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        )}

        <div>
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {content && <div className="text-foreground/80 leading-relaxed">{content}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}
