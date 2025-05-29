const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,

    },
    password: {
      type: String,
      required: true,
   
    },
    phoneNumber: {
      type: Number,
      required: true,
   
    },
      // 🔽 Add these two fields for password reset functionality
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  },

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
