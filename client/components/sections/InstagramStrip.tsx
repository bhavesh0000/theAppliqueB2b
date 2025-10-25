// import { useHome } from "@/lib/api";

// export default function InstagramStrip() {
//   const { data } = useHome();
//   if (!data?.instagram?.length) return null;
//   return (
//     <section className="py-10 border-t border-border/50">
//       <div className="container">
//         <h3 className="mb-4 text-sm tracking-wide uppercase text-foreground/70">Follow @theapplique</h3>
//       </div>
//       <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
//         {data.instagram.map((i) => (
//           <a key={i.id} href={i.href} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden">
//             <img src={i.imageUrl} alt="Instagram" className="h-full w-full object-cover" />
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }
import { useHome } from "@/lib/api";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function InstagramStrip() {
  const { data } = useHome();
  if (!data?.instagram?.length) return null;
  return (
    <section className="py-10 border-t border-border/50">
      <div className="container">
        <h3 className="mb-4 text-sm tracking-wide uppercase text-foreground/70">Follow @theapplique</h3>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {data.instagram.map((i) => (
          <a key={i.id} href={i.href} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden">
            <OptimizedImage
              src={i.imageUrl}
              alt="Instagram post"
              className="h-full w-full hover:scale-110 transition-transform duration-300"
              objectFit="cover"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
          </a>
        ))}
      </div>
    </section>
  );
}