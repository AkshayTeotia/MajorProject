const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'hotmail', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });

  // Email options
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  // Send mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

module.exports = sendEmail;
