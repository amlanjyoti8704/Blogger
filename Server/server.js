import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import connectDB from './Config/db.js';
// import userRoutes from './routes/user.route.js';
// import authRoutes from './routes/auth.route.js';
// import postRoutes from './routes/post.route.js';
// import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const _dirname=path.resolve();
const app=express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req,res)=>{
    res.json({"users":["user1","user2","user3"]});
})

// connect to database
await connectDB();

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
    
})

app.use(express.static(path.join(_dirname,'./client/dist')));

// Routes
// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);
// app.use("/api/comment", commentRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(_dirname,'client','dist','index.html'));
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });