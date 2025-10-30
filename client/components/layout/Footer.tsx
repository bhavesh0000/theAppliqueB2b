import { Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
// export function Footer() {
//   return (
//     <footer className="border-t border-border/50">
//       <div className="container py-12 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
//           <div className="md:col-span-2 space-y-4">
//             <h3 className="text-lg tracking-widest font-semibold uppercase">The Applique</h3>
//             <p className="text-sm text-foreground/70 max-w-md">
//               Timeless silhouettes in monochrome. Crafted with intention. Designed for everyday elegance.
//             </p>
//             <p className="text-xs text-foreground/50">© {new Date().getFullYear()} The Applique. All rights reserved.</p>
//           </div>

//           <div>
//             <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">Explore</h4>
//             <ul className="space-y-2 text-sm text-foreground/70">
//               <li><a href="/" className="hover:text-foreground">Shop</a></li>
//               <li><a href="/about" className="hover:text-foreground">About</a></li>
//               <li><a href="/workshop" className="hover:text-foreground">Workshop</a></li>
//               <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">Newsletter</h4>
//             <form className="flex gap-2">
//               <input
//                 type="email"
//                 required
//                 placeholder="Your email"
//                 className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
//               />
//               <button type="submit" className="rounded-md bg-foreground px-4 py-2 text-xs font-semibold tracking-wide uppercase text-background hover:opacity-90">
//                 Join
//               </button>
//             </form>
//             <p className="mt-2 text-xs text-foreground/60">By subscribing, you agree to receive updates.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



export function Footer() {
  // Update these URLs with your actual social media profiles
  const socialLinks = {
    instagram: "https://www.instagram.com/appliquet/",
    whatsapp: "https://wa.me/9602456367", // Replace with your WhatsApp number
    facebook: "https://www.facebook.com/people/The-Applique/100064569978723/",
    linkedin: "https://www.linkedin.com/company/the-applique/"
  };

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
              <li><a href="/" className="hover:text-foreground">Home</a></li>
              <li><a href="/about" className="hover:text-foreground">About</a></li>
              <li><a href="/workshop" className="hover:text-foreground">WorkShop</a></li>
              <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground/70 transition-all hover:border-foreground/50 hover:bg-foreground hover:text-background"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground/70 transition-all hover:border-foreground/50 hover:bg-foreground hover:text-background"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground/70 transition-all hover:border-foreground/50 hover:bg-foreground hover:text-background"
                aria-label="Like us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background text-foreground/70 transition-all hover:border-foreground/50 hover:bg-foreground hover:text-background"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-foreground/60">Follow us for updates and behind-the-scenes content.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}