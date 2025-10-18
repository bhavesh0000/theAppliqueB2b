/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Navigation
export interface NavigationLink {
  href: string;
  label: string;
}
export interface NavigationResponse {
  brand: { name: string; tagline?: string };
  links: NavigationLink[];
}

// Home
export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl: string;
}
export interface CollectionItem {
  id: string;
  title: string;
  href: string;
  imageUrl: string;
}
export interface ProductItem {
  id: string;
  title: string;
  price: number;
  href: string;
  imageUrl: string;
}
export interface BannerItem {
  // id: string;
  // title: string;
  // subtitle?: string;
  // href?: string;
  // // imageUrl: string;
  // videoUrl: string;
  // posterImage: string;
  // isVideo: true

  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  
  // Media options - can have either image or video
  imageUrl?: string;        // For image banners
  videoUrl?: string;        // For video banners (primary video source)
  videoUrlWebm?: string;    // Optional: WebM format for better compression
  videoUrlOgg?: string;     // Optional: Ogg format for compatibility
  
  // Video-specific options
  isVideo?: boolean;        // Flag to explicitly indicate video content
  posterImage?: string;     // Poster image shown before video loads
  autoPlay?: boolean;       // Whether to auto-play (we use hover instead)
  muted?: boolean;          // Should always be true for autoplay to work
  loop?: boolean;           // Whether video should loop
  
  // Additional options
  overlayOpacity?: number;  // Control overlay darkness (0-1)
  textColor?: string;       // Custom text color
  showPlayButton?: boolean;
}
export interface InstagramItem {
  id: string;
  href: string;
  imageUrl: string;
}
export interface HomeResponse {
  hero: HeroSlide[];
  collections: CollectionItem[];
  featured: ProductItem[];
  banners: BannerItem[];
  instagram: InstagramItem[];
}

// Generic page
export interface WorkshopBookingRequest {
  name: string;
  email: string;
  phone?: string;
  slotDate?: string;
  slotTime?: string;
  notes?: string;
}

export interface PageResponse {
  slug: string;
  title: string;
  content: string;
}
