import { RequestHandler } from "express";
import { HomeResponse } from "@shared/api";

export const handleHome: RequestHandler = (_req, res) => {
  const response: HomeResponse = {
    hero: [
      {
        id: "slide-1",
        title: "Applique",
        subtitle: "Where design met creativity",
        // ctaLabel: "Shop Now",
        // ctaHref: "/shop",
        imageUrl: "/images/slider/hs1.jpg?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "slide-2",
        title: "The Linen Story",
        subtitle: "Breezy silhouettes in stark contrasts",
        // ctaLabel: "Explore Collection",
        // ctaHref: "/collections",
        imageUrl: "/images/slider/hs2.jpg?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "slide-3",
        title: "The Linen Story",
        subtitle: "Breezy silhouettes in stark contrasts",
        // ctaLabel: "Explore Collection",
        // ctaHref: "/collections",
        imageUrl: "/images/slider/hs3.jpg?q=80&w=1400&auto=format&fit=crop",
      },
      {
        id: "slide-4",
        title: "The Linen Story",
        subtitle: "Breezy silhouettes in stark contrasts",
        // ctaLabel: "Explore Collection",
        // ctaHref: "/collections",
        imageUrl: "/images/slider/hs4.jpg?q=80&w=1400&auto=format&fit=crop",
      },
    ],
    collections: [
      {
        id: "co-1",
        title: "Sofa Covers",
        href: "/collections/co-1",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "co-2",
        title: "Bedsheets & Razai",
        href: "/collections/co-2",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "co-3",
        title: "Pillow Covers & Table Cloths",
        href: "/collections/co-3",
        imageUrl: "/placeholder.svg",
      },
    ],
    featured: [
      {
        id: "p-1",
        title: "Handwoven Sofa Cover",
        price: 129.0,
        href: "#",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "p-2",
        title: "Organic Cotton Bedsheet Set",
        price: 149.0,
        href: "#",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "p-3",
        title: "Quilted Razai (King)",
        price: 59.0,
        href: "#",
        imageUrl: "/placeholder.svg",
      },
    ],
    banners: [
      {
        id: "b-1",
        title: "Crafted in India",
        subtitle: "Ethically made in small batches",
        // href: "/about",
        videoUrl: "/video/Bv.mp4", // Add your video URL here
        posterImage: "/images/banner-poster.jpg", // Optional: poster image for video
        isVideo: true,
      },
    ],
    instagram: [
      { id: "ig-1", href: "https://www.instagram.com/p/C4jsK3cPUZV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I1.jpg" },
      { id: "ig-2", href: "https://www.instagram.com/p/C2eyYOHvYBJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I2.jpg" },
      { id: "ig-3", href: "https://www.instagram.com/p/C2coJ_vPjPk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I3.jpg" },
      { id: "ig-4", href: "https://www.instagram.com/p/Cr3FraQoRqy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I4.jpg" },
      { id: "ig-5", href: "https://www.instagram.com/p/CC0nqWXl7RJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I5.jpg" },
      { id: "ig-6", href: "https://www.instagram.com/p/CBLhLotJzvl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I6.jpg" },
    ],
  };

  res.json(response);
};
