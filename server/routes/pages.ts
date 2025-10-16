import { RequestHandler } from "express";
import { PageResponse } from "@shared/api";

const PAGES: Record<string, PageResponse> = {
  shop: {
    slug: "shop",
    title: "Shop",
    content:
      "Discover our latest monochrome edit. All products are ethically crafted with attention to detail.",
  },
  collections: {
    slug: "collections",
    title: "Collections",
    content: "Explore curated collections inspired by texture and form.",
  },
  about: {
    slug: "about",
    title: "About The Applique",
    content:
      "The Applique is a monochrome atelier celebrating clean lines and timeless silhouettes.",
  },
  contact: {
    slug: "contact",
    title: "Contact",
    content: "We would love to hear from you. Reach us at hello@theapplique.com.",
  },
};

export const handlePage: RequestHandler = (req, res) => {
  const slug = String(req.params.slug || "");
  const page = PAGES[slug];
  if (!page) return res.status(404).json({ error: "Not found" });
  res.json(page);
};
