import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const postVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const Community= () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [reply, setReply] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        params: { sort: sortOrder },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSubmit = async (e) => {
    
    e.preventDefault();
    await new Promise(resolve=>setTimeout(resolve,500)) ;
    if (!newPost.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/posts", {
        text: newPost,
      });
      setNewPost("");
      setPosts((prev) => [res.data, ...prev]);
      
    } catch (err) {
        console.error("Failed to reply:", err);
      setError("Failed to create post");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
        console.error("Failed to reply:", err);
      setError("Failed to delete post");
    }
  };

  const handleReplyChange = (postId, value) => {
    setReply({ ...reply, [postId]: value });
  };

  const handleReplySubmit = async (postId) => {
   
    const replyText = reply[postId]?.trim();
    if (!replyText) return;
    await new Promise(resolve=>setTimeout(resolve,500)) ;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/reply`,
        { text: replyText }
      );
      setReply((prev) => ({ ...prev, [postId]: "" }));
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? res.data : post))
      );
  
    } catch (err) {
        console.error("Failed to reply:", err);
      setError("Failed to reply");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="max-w-3xl mx-auto py-10 p-6 bg-green-50 border border-gray-300 shadow-lg rounded-lg"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h2 className="text-3xl font-bold text-green-400 text-center mb-6 drop-shadow-md" variants={itemVariants}>
          Community Chat
        </motion.h2>

        {/* Post Form */}
        <motion.form onSubmit={handlePostSubmit} className="mb-6" variants={itemVariants}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm text-base"
            rows="3"
            placeholder="Share your thoughts..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <motion.button
           whileHover={{scale:1.1}}
           transition={{ease:"easeInOut", duration:0.3 }}
            type="submit"
            disabled={loading}
            className="bg-blue-600 cursor-pointer disabled:opacity-70 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md mt-2 text-base"
          >
            {loading ? "Posting...":"Post"}
          </motion.button>
        </motion.form>

        {/* Sort Option */}
        <motion.div className="mb-4 flex items-center text-base" variants={itemVariants}>
          <label className="mr-2 font-medium">Sort:</label>
          <select
            className="border border-gray-300 px-3 py-2 rounded-md bg-white shadow-sm text-gray-700"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.p className="text-red-600 mb-2 text-base" variants={itemVariants}>
            {error}
          </motion.p>
        )}

        {/* Loading / Empty / Posts */}
        {loading ? (
          <motion.p className="text-base text-green-600" variants={itemVariants}>
            Loading posts...
          </motion.p>
        ) : posts.length === 0 ? (
          <motion.p className="text-base text-gray-600" variants={itemVariants}>
            No posts yet.
          </motion.p>
        ) : (
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post._id}
                className="border border-gray-300 bg-white shadow-md rounded-md p-4 mb-4"
                variants={postVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* Post Text */}
                <p className="text-gray-800 text-lg">{post.text}</p>
                <div className="text-sm text-gray-500">
                  Posted on {new Date(post.createdAt).toLocaleString()}
                </div>

                {/* Delete Button */}
                <motion.button
                  whileHover={{scale:1.1}}
                  onClick={() => handleDelete(post._id)}
                  className=" cursor-pointer bg-red-400 p-2 font-medium text-white rounded-md no-underline mt-2 hover:bg-red-500 text-sm"
                >
                  Delete
                </motion.button>

                {/* Replies Section */}
                {post.replies?.length > 0 && (
                  <motion.div
                    className="mt-4 ml-4 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-semibold text-base">Replies:</h4>
                    <AnimatePresence>
                      {post.replies.map((r, index) => (
                        <motion.div
                          key={index}
                          className="text-sm text-gray-700 pl-2 border-l border-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{r.text}</p>
                          <div className="text-xs text-gray-500">
                            {new Date(r.createdAt).toLocaleString()}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Reply Input */}
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Reply..."
                    className="border border-gray-300 px-3 py-2 rounded-md w-full text-sm bg-white shadow-sm"
                    value={reply[post._id] || ""}
                    onChange={(e) => handleReplyChange(post._id, e.target.value)}
                  />
                  <motion.button
                    whileHover={{scale:1.1}}
                    transition={{ease:"easeInOut", duration:0.3 }}
                  disabled={loading}
                    className="bg-green-600 disabled:opacity-70 cursor-pointer text-white px-4 py-2 mt-2 rounded-md hover:bg-green-700 text-sm shadow-md"
                    onClick={() => handleReplySubmit(post._id)}
                  >
                  {loading ? "Replying...":"Reply"}
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
   );
};

export default Community;
