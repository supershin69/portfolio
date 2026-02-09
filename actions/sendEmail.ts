// src/actions/sendEmail.ts
"use server";

import nodemailer from "nodemailer";

export async function sendEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address (must be your auth user for Gmail)
    to: process.env.EMAIL_USER,   // Receiver (sending to yourself)
    replyTo: data.email,          // Allow replying directly to the visitor
    subject: `Portfolio Contact: Message from ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      
      Message:
      ${data.message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
        ${data.message}
      </blockquote>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false, message: "Failed to send email. Please try again." };
  }
}