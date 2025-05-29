const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  // user: { // ✅ properly referencing the User model
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
});

const postSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
  // user: { // ✅ properly referencing the User model
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
