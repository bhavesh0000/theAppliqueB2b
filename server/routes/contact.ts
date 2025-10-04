import { RequestHandler } from "express";

export const handleContact: RequestHandler = (req, res) => {
  const { name, email, company, message } = req.body as any;
  // In real app, validate and persist or send email
  console.log("Contact enquiry:", { name, email, company, message });
  res.status(200).json({ ok: true, message: "Enquiry received" });
};
