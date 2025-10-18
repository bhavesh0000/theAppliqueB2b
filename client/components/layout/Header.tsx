import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/workshop", label: "Workshop" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-background">
              <SheetHeader>
                <Link to="/" onClick={() => setOpen(false)} className="text-xl tracking-widest font-semibold uppercase">
                  The Applique
                </Link>
              </SheetHeader>
              <nav className="mt-6 grid gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    to={n.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-2 py-3 text-sm tracking-wide uppercase text-foreground/80 hover:text-foreground",
                    )}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="text-xl md:text-2xl tracking-[0.2em] font-semibold uppercase text-foreground">
            The Applique
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link key={n.href} to={n.href} className="text-sm tracking-wide uppercase text-foreground/80 hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* search removed */}
        </div>
      </div>
    </header>
  );
}
