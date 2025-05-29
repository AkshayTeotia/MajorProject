const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const cookieParser=require("cookie-parser")
const contactRoute=require("./routes/contactRoutes")
const postRoute=require("./routes/postRoutes")
const activityRoutes=require("./routes/ActivityRoutes")
const seasonRoutes=require("./routes/seasonRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


 app.use('/user', userRoute);
app.use("/user",contactRoute);
app.use('/api/posts', postRoute);
app.use('/api', seasonRoutes);
app.use('/api', activityRoutes); // prefix API routes



// DB Connection
const connectDB = require('./config/db');
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
