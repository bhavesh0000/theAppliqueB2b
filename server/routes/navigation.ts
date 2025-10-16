import { RequestHandler } from "express";
import { NavigationResponse } from "@shared/api";

export const handleNavigation: RequestHandler = (_req, res) => {
  const response: NavigationResponse = {
    brand: {
      name: "The Applique",
      tagline: "Monochrome Atelier",
    },
    links: [
      { href: "/", label: "Home" },
      { href: "/shop", label: "Shop" },
      { href: "/collections", label: "Collections" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  };
  res.json(response);
};
