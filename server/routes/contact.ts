import { RequestHandler } from "express";
import nodemailer from "nodemailer";

// Configure nodemailer transporter for Titan Email
const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587, // Use 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your Titan email address
    pass: process.env.EMAIL_PASS  // Your Titan email password
  }
});

// Interface for request body
interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
}

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, company, message, subject } = req.body as ContactRequest;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: 'Please provide a valid email address'
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER, // Where you want to receive contact form emails
      subject: subject || `Contact Form: Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email // Allows you to reply directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Contact enquiry sent successfully:", { name, email, company });

    res.status(200).json({
      ok: true,
      message: 'Enquiry received and email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      ok: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};