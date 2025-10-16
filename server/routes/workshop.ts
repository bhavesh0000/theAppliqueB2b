import { RequestHandler } from "express";

export const handleWorkshop: RequestHandler = (req, res) => {
  const { name, email, phone, preferredDate, slotDate, slotTime, notes } = req.body as any;
  console.log("Workshop booking:", { name, email, phone, preferredDate, slotDate, slotTime, notes });
  res.status(200).json({ ok: true, message: "Workshop request received" });
};
