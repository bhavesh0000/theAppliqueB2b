// import { RequestHandler } from "express";

// import nodemailer from "nodemailer";

// // Configure nodemailer transporter for Titan Email
// const transporter = nodemailer.createTransport({
//   host: 'smtpout.secureserver.net',
//   port: 587, // Use 465 for SSL
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_ID, // Your Titan email address
//     pass: process.env.PASSWORD  // Your Titan email password
//   }
// });

// // Interface for request body
// interface ContactRequest {
//   name: string;
//   email: string;
//   company?: string;
//   message: string;
//   subject?: string;
// }

// export const handleContact: RequestHandler = async (req, res) => {
//   try {
//     const { name, email, company, message, subject } = req.body as ContactRequest;

//     // Validation
//     if (!name || !email || !message) {
//       return res.status(400).json({
//         ok: false,
//         message: 'Please provide name, email, and message'
//       });
//     }

//     // Email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         ok: false,
//         message: 'Please provide a valid email address'
//       });
//     }

//     // Email options
//     const mailOptions = {
//       from: process.env.EMAIL_ID,
//       to:  process.env.EMAIL_USER, // Where you want to receive contact form emails
//       subject: subject || `Contact Form: Message from ${name}`,
//       html: `
//         <h3>New Contact Form Submission</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
//         <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replace(/\n/g, '<br>')}</p>
//       `,
//       replyTo: email // Allows you to reply directly to the sender
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     console.log("Contact enquiry sent successfully:", { name, email, company });

//     res.status(200).json({
//       ok: true,
//       message: 'Enquiry received and email sent successfully!'
//     });

//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({
//       ok: false,
//       message: 'Failed to send email. Please try again later.',
//       error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
//     });
//   }
// };


import { RequestHandler } from "express";
import nodemailer from "nodemailer";

// Configure nodemailer transporter for Titan Email
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD
  }
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

// Interface for request body
interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  subject?: string;
}

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, company, message, subject } = req.body as ContactRequest;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide name, email, phone number, and message'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid email address'
      });
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid phone number'
      });
    }

    console.log(`Processing contact form from ${name} (${email})`);

    // Send both emails in parallel
    const [businessEmailResult, clientEmailResult] = await Promise.all([
      // Email to The Applique business
      transporter.sendMail({
        from: `"The Applique" <${process.env.EMAIL_ID}>`,
        to: process.env.EMAIL_ID,
        subject: subject || `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #fafafa;">
            <div style="background: #1a1a1a; color: #ffffff; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 0.2em; font-weight: 600;">THE APPLIQUE</h1>
              <p style="margin: 8px 0 0 0; font-size: 12px; letter-spacing: 0.15em; opacity: 0.9;">HANDCRAFTED TEXTILES</p>
            </div>
            
            <div style="padding: 40px 30px; background: white;">
              <h2 style="color: #1a1a1a; margin: 0 0 25px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
                New Contact Form Inquiry
              </h2>
              
              <div style="background: #f8f8f8; padding: 25px; border-radius: 4px; margin: 25px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #1a1a1a; text-decoration: none;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Company:</strong></td>
                    <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${company || "Not provided"}</td>
                  </tr>
                </table>
                
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;"><strong>Message:</strong></p>
                  <div style="background: white; padding: 20px; border-radius: 4px; border-left: 3px solid #1a1a1a; color: #1a1a1a; font-size: 14px; line-height: 1.6;">
                    ${message.replace(/\n/g, "<br>")}
                  </div>
                </div>
              </div>
              
              <div style="background: #1a1a1a; color: white; padding: 15px 20px; border-radius: 4px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; font-size: 13px; letter-spacing: 0.05em;">
                  📧 Reply directly to this email to respond to ${name}
                </p>
              </div>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 11px; letter-spacing: 0.05em;">
                RECEIVED ON ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
              <p style="margin: 8px 0 0 0; color: #999; font-size: 11px;">
                <a href="https://theapplique.co.in" style="color: #666; text-decoration: none;">theapplique.co.in</a>
              </p>
            </div>
          </div>
        `,
        replyTo: email,
      }),

      // Auto-reply to customer
      transporter.sendMail({
        from: `"The Applique" <${process.env.EMAIL_ID}>`,
        to: email,
        subject: "Thank You for Contacting The Applique",
        html: `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #fafafa;">
            <div style="background: #1a1a1a; color: #ffffff; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.2em; font-weight: 600;">THE APPLIQUE</h1>
              <p style="margin: 12px 0 0 0; font-size: 13px; letter-spacing: 0.15em; opacity: 0.9;">AUTHENTIC HAND BLOCK PRINTING</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.8;">Crafted by Skilled Artisans of Rajasthan</p>
            </div>
            
            <div style="padding: 40px 30px; background: white;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">
                Dear ${name},
              </h2>
              
              <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                Thank you for reaching out to us at <strong>The Applique</strong>. We've received your inquiry and truly appreciate your interest in our handcrafted textiles.
              </p>
              
              <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;">
                Our team will review your message and get back to you within <strong>24 hours</strong>. We look forward to connecting with you!
              </p>
              
              <div style="background: #f8f8f8; padding: 25px; border-radius: 4px; margin: 25px 0; border-left: 3px solid #1a1a1a;">
                <p style="margin: 0 0 12px 0; color: #666; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;">YOUR MESSAGE:</p>
                <div style="color: #1a1a1a; font-size: 14px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <div style="border-top: 1px solid #e0e0e0; padding-top: 25px; margin-top: 30px;">
                <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 15px 0;">
                  In the meantime, feel free to explore our collection and learn more about our craft:
                </p>
                
                <div style="text-align: center; margin: 25px 0;">
                  <a href="https://theapplique.co.in" 
                     style="display: inline-block; background: #1a1a1a; color: white; padding: 14px 35px; text-decoration: none; font-size: 13px; letter-spacing: 0.1em; border-radius: 4px; font-weight: 600;">
                    VISIT OUR WEBSITE
                  </a>
                </div>
              </div>
              
              <div style="margin-top: 35px; padding-top: 25px; border-top: 2px solid #1a1a1a;">
                <p style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 14px;">
                  <strong>Best regards,</strong>
                </p>
                <p style="margin: 0; color: #666; font-size: 14px; font-style: italic;">
                  The Applique Team
                </p>
              </div>
            </div>
            
            <div style="background: #1a1a1a; color: white; padding: 30px 20px; text-align: center;">
              <p style="margin: 0 0 15px 0; font-size: 13px; letter-spacing: 0.05em;">
                📧 ${process.env.EMAIL_ID} | 📱 ${process.env.PHONE}
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                <a href="https://theapplique.co.in" style="color: white; text-decoration: none; opacity: 0.9;">theapplique.co.in</a>
              </p>
              <p style="margin: 12px 0 0 0; font-size: 11px; opacity: 0.7; line-height: 1.6;">
                Supplying designers, boutiques, and home décor brands<br>
                across the world with eco-friendly, ethically crafted textiles
              </p>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 11px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
      }),
    ]);

    console.log(`Emails sent successfully:`, {
      businessMessageId: businessEmailResult.messageId,
      clientMessageId: clientEmailResult.messageId,
    });

    return res.json({ ok: true });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: `Failed to send email. Please email us directly at ${process.env.EMAIL_USER}` 
    });
  }
};