// routes/posts.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post")

//Get all posts (with sorting)
router.get("/", async (req, res) => {
  const sortOrder = req.query.sort || "desc";
  try {
    const posts = await Post.find().sort({ createdAt: sortOrder === "desc" ? -1 : 1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

  
// Create a new post
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newPost = new Post({ text });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Reply to a post
// POST /api/chat/:chatId/reply
// router.post('/:chatId/reply', async (req, res) => {
//     const { message, userId } = req.body;
//     const { chatId } = req.params;
  
//     try {
//       const chat = await Chat.findById(chatId);
//       chat.replies.push({ message, user: userId });
//       await chat.save();
//       res.status(200).json(chat);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to add reply' });
//     }
//   });
  
router.post("/:id/reply", async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.replies.push({ text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to reply to post" });
  }
});


// GET /api/chat
// router.get('/', async (req, res) => {
//     try {
//       const chats = await Post.find()
//         .populate('user', 'name email')             // populates chat creator
//         .populate('replies.user', 'name email');    // populates reply authors
//       res.json(chats);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch chats' });
//     }
//   });
  
module.exports = router;