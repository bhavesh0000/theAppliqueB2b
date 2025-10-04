import { RequestHandler } from "express";
import { HomeResponse } from "@shared/api";

export const handleHome: RequestHandler = (_req, res) => {
  const response: HomeResponse = {
    hero: [
      {
        id: "slide-1",
        title: "New Monochrome Edit",
        subtitle: "Elevated basics in black and white",
        ctaLabel: "Shop Now",
        ctaHref: "/shop",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "slide-2",
        title: "The Linen Story",
        subtitle: "Breezy silhouettes in stark contrasts",
        ctaLabel: "Explore Collection",
        ctaHref: "/collections",
        imageUrl: "/placeholder.svg",
      },
    ],
    collections: [
      {
        id: "co-1",
        title: "Sofa Covers",
        href: "#",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "co-2",
        title: "Bedsheets & Razai",
        href: "#",
        imageUrl: "/placeholder.svg",
      },
      {
        id: "co-3",
        title: "Pillow Covers & Table Cloths",
        href: "#",
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
        href: "/about",
        imageUrl: "/placeholder.svg",
      },
    ],
    instagram: [
      { id: "ig-1", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
      { id: "ig-2", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
      { id: "ig-3", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
      { id: "ig-4", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
      { id: "ig-5", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
      { id: "ig-6", href: "https://instagram.com", imageUrl: "/placeholder.svg" },
    ],
  };

  res.json(response);
};
