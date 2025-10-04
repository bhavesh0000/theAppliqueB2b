export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg tracking-widest font-semibold uppercase">The Applique</h3>
            <p className="text-sm text-foreground/70 max-w-md">
              Timeless silhouettes in monochrome. Crafted with intention. Designed for everyday elegance.
            </p>
            <p className="text-xs text-foreground/50">© {new Date().getFullYear()} The Applique. All rights reserved.</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#collections" className="hover:text-foreground">Shop</a></li>
              <li><a href="#collections" className="hover:text-foreground">Collections</a></li>
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
              <button type="submit" className="rounded-md bg-foreground px-4 py-2 text-xs font-semibold tracking-wide uppercase text-background hover:opacity-90">
                Join
              </button>
            </form>
            <p className="mt-2 text-xs text-foreground/60">By subscribing, you agree to receive updates.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
