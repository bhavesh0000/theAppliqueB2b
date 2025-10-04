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
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  imageUrl: string;
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
