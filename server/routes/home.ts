import { RequestHandler } from "express";
import { HomeResponse } from "@shared/api";

export const handleHome: RequestHandler = (_req, res) => {
  const response: HomeResponse = {
    hero: [
      {
        id: "slide-1",
        title: "Authentic Hand Block Printing - Crafted by Skilled Artisans of Rajasthan",
        subtitle: "Experience centuries-old craftsmanship where every wooden block, natural dye, and careful press creates a masterpiece. The Applique brings you India's finest hand-printed textiles — made for global brands and boutiques.",
        // ctaLabel: "",
        // ctaHref: "/About",
        imageUrl: "/images/slider/hs1.webp",
      },
      {
        id: "slide-2",
        title: "From Handprint to Haute Stitch - Perfection in Every Detail",
        subtitle: "Our skilled tailors transform hand-printed fabrics into premium apparel and décor. With precision stitching, custom sizing, and export-grade finishing, we deliver quality that meets international standards.",
        // ctaLabel: "our workshop",
        // ctaHref: "/Workshop",
        imageUrl: "/images/slider/hs2.webp",
      },
      {
        id: "slide-3",
        title: "The Applique - Global Supplier of Sustainable Handblock Textiles",
        subtitle: "Supplying designers, boutiques, and home décor brands across the world with eco-friendly, ethically crafted hand-printed fabrics. Partner with India's trusted manufacturer for timeless craftsmanship and contemporary design.",
        // ctaLabel: "Partner With Us Today",
        // ctaHref: "/partner",
        imageUrl: "/images/slider/hs3.webp",
      },
      {
        id: "slide-4",
        title: "Precision in Every Stitch - Crafting Quality You Can Feel",
        subtitle: "Our skilled artisans stitch handblock-printed fabrics with perfection, blending traditional craftsmanship and modern tailoring for global fashion and décor brands.",
        // ctaLabel: "Explore Collection",
        // ctaHref: "/collections",
        imageUrl: "/images/slider/hs4.webp",
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
        videoUrl: "https://www.youtube.com/watch?v=sYXbRQpzgX0", // Add your video URL here
        posterImage: "/images/banner-poster.jpg", // Optional: poster image for video
        isVideo: true,
      },
    ],
    instagram: [
      { id: "ig-1", href: "https://www.instagram.com/p/DPOV74gk2oW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I1.webp" },
      { id: "ig-2", href: "https://www.instagram.com/p/DHIw1h0T7Uh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I2.webp" },
      { id: "ig-3", href: "https://www.instagram.com/p/DOJD8LQE2fe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I3.webp" },
      { id: "ig-4", href: "https://www.instagram.com/p/C9bsa9QPMTp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I4.webp" },
      { id: "ig-5", href: "https://www.instagram.com/p/CH5IJ9PFPug/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I51.webp" },
      { id: "ig-6", href: "https://www.instagram.com/p/CHXfKI-l8sh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", imageUrl: "/images/instagram/I6.webp" },
    ],
  };

  res.json(response);
};
