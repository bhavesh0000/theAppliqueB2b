// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";
// import { handleNavigation } from "./routes/navigation";
// import { handleHome } from "./routes/home";
// import { handlePage } from "./routes/pages";
// import { handleContact } from "./routes/contact";
// import { handleWorkshop } from "./routes/workshop";
// import { handleCollection } from "./routes/collections";

// export function createServer() {
//   const app = express();

//   // Middleware
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     const ping = process.env.PING_MESSAGE ?? "ping";
//     res.json({ message: ping });
//   });

//   app.get("/api/demo", handleDemo);

//   // Site content APIs
//   app.get("/api/navigation", handleNavigation);
//   app.get("/api/home", handleHome);
//   app.get("/api/pages/:slug", handlePage);

//   // Forms
//   app.post("/api/contact", handleContact);
//   app.post("/api/workshop", handleWorkshop);

//   // Collection products
//   app.get("/api/collections/:id", handleCollection);

//   return app;
// }

import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleNavigation } from "./routes/navigation";
import { handleHome } from "./routes/home";
import { handlePage } from "./routes/pages";
import { handleContact } from "./routes/contact";
import { handleWorkshop } from "./routes/workshop";
import { handleCollection } from "./routes/collections";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Image caching middleware - cache images for 1 year
  app.use("/images", (_req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Vary", "Accept-Encoding");
    next();
  });

  // Video caching middleware - cache videos for 1 year
  app.use("/video", (_req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Vary", "Accept-Encoding");
    next();
  });

  // Static assets caching - cache for 1 week
  app.use("/assets", (_req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    res.setHeader("Vary", "Accept-Encoding");
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Site content APIs
  app.get("/api/navigation", handleNavigation);
  app.get("/api/home", handleHome);
  app.get("/api/pages/:slug", handlePage);

  // Forms
  app.post("/api/contact", handleContact);
  app.post("/api/workshop", handleWorkshop);

  // Collection products
  app.get("/api/collections/:id", handleCollection);

  return app;
}