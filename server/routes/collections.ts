import { RequestHandler } from "express";

// Simple demo collection products — in a real app this would be fetched from a DB
export const handleCollection: RequestHandler = (req, res) => {
  const id = req.params.id;

  const productsByCollection: Record<string, any[]> = {
    "co-1": [
      { id: "co1-p1", title: "Linen Sofa Cover - Charcoal", imageUrl: "/placeholder.svg" },
      { id: "co1-p2", title: "Patterned Sofa Throw", imageUrl: "/placeholder.svg" },
      { id: "co1-p3", title: "Velvet Sofa Slip", imageUrl: "/placeholder.svg" },
    ],
    "co-2": [
      { id: "co2-p1", title: "Cotton Bedsheet - King", imageUrl: "/placeholder.svg" },
      { id: "co2-p2", title: "Quilted Razai", imageUrl: "/placeholder.svg" },
      { id: "co2-p3", title: "Embroidered Pillow Set", imageUrl: "/placeholder.svg" },
    ],
    "co-3": [
      { id: "co3-p1", title: "Table Cloth - Natural", imageUrl: "/placeholder.svg" },
      { id: "co3-p2", title: "Pillow Cover - Set of 4", imageUrl: "/placeholder.svg" },
      { id: "co3-p3", title: "Runner - Handloom", imageUrl: "/placeholder.svg" },
    ],
  };

  const products = productsByCollection[id] ?? [];
  res.json({ id, products });
};
