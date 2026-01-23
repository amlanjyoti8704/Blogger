import express from'express';
import cors from'cors';
import connectDB from './Config/db.js';
import connectCloudinary from './Config/cloudinary.js';
import userRoutes from './Routes/userRoutes.js';
import postRoutes from './Routes/postRoutes.js';
import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv();
const app=express();
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://blogger-aj.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token'],
};

app.use(cors(corsOptions));

// app.options('/api/*', cors(corsOptions));



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// connect to cloudinary and database
await connectCloudinary();
await connectDB();

app.get('/', (req,res)=>{
    res.send('API is running...');
})


// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/uploads', express.static('uploads'));


// PORT
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});