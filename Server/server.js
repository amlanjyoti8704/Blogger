import express from'express';
import cors from'cors';
import connectDB from './Config/db.js';
import connectCloudinary from './Config/cloudinary.js';
import userRoutes from './Routes/userRoutes.js';
import postRoutes from './Routes/postRoutes.js';
import { configDotenv } from 'dotenv';
import path from 'path';

const app=express();

// connect to database
await connectDB();

// middlewares
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
configDotenv();

// connect to cloudinary
await connectCloudinary();

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