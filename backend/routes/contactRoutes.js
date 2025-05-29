const express = require("express");
const Contact = require("../models/contact");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();
// Create a user
router.post("/contact", async (req, res) => {
    try {
      const {   fullName, email, subject,message } = req.body;
      if (!email || !fullName || !subject || !message) {
        return res
          .status(400)
          .json({ status: false, message: "All fields are required" });
      }
  
      const user = new Contact({ fullName, email, subject,message});
      await user.save();

      
      await sendEmail({
        to: process.env.ADMIN_EMAIL, // send to your own inbox
        subject,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      return res
        .status(201)
        .json({ status: true, message: "Message sent Successfully" });
    } catch (err) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Something went wrong",
          error: err.message,
        });
    }
  });
  module.exports=router;