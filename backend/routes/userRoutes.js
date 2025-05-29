const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto=require("crypto");
const CropActivity=require("../models/CropActivity")
let otp;

// Create a user
router.post("/register", async (req, res) => {
  try {
    const {   fullName, email, password,phoneNumber } = req.body;
    if (!email || !fullName || !password || !phoneNumber) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const existingUser = User.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword ,phoneNumber});
    await user.save();
    return res
      .status(201)
      .json({ status: true, message: "Register Successfully" });
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

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });

    const token =jwt.sign({id:user._id}, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "10d" });

    console.log(token);
    return res
      .status(201)
      .json({ status: true, message: "Login Successfully", token: token });
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



router.post("/profile", async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ status: false, message: "Access Denied" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
      const id=decode?.id;
      const user = await User.findById(decode?.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "Invalid Token" });

        const activities=await CropActivity.find({user:id});
        const filteredActivities = activities.filter(
          (a) => a.user?.toString() === user._id?.toString()
        );
        
      const userData = {
        activities:filteredActivities,
        id: user?.id,
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber:user?.phoneNumber
      };
      return res
        .status(201)
        .json({ status: true, message: "Profile Data", data: userData });
    });
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


// forget-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'No user found with that email.' });

    // Generate a secure token
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000);
    }
    
    // Example usage
    otp = generateOTP();
    
    
    const expiry = Date.now() + 3600000; // 1 hour

    user.resetToken = otp;
    user.resetTokenExpiry = expiry;
    await user.save();
    
// configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

await transporter.sendMail({
  to: user.email,
  from: process.env.EMAIL_USER,
  subject: 'Password Reset',
  html: `
    <p>You requested a password reset.</p>
    <p>Click this link to set a new password:</p>
   <h1> ${otp}</h1>
  `
});

    // (Optional) Send email here
    // e.g., http://localhost:3000/reset-password/:token

    res.json({
      message: 'Reset link has been sent to your email (if it exists).',
      resetToken: "otp" // ✅ for development only — don't return this in prod
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// POST /api/reset-password/:token
router.post('/forgot-password/verify-otp/:otp', async (req, res) => {
  const { otp} = req.params;

  try {
    const user = await User.findOne({
      resetToken: otp,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Otp is invalid or expired.' });

  
return res.json({ message: 'Otp Verified' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.',err });
  }
});

// POST /api/reset-password/:token
router.post('/reset-password', async (req, res) => {
  
const {newPassword}=req.body;
  try {
    const user = await User.findOne({
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: ' Some error occured'});


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; // hash it in real app!
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password has been reset.' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


module.exports = router;
