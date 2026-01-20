import express from'express';
import cors from'cors';
import connectDB from './Config/db.js';
import connectCloudinary from './Config/cloudinary.js';
import userRoutes from './Routes/userRoutes.js';
import { configDotenv } from 'dotenv';

const app=express();

// connect to database
await connectDB();

// middlewares
app.use(cors());
app.use(express.json());
configDotenv();

// connect to cloudinary
await connectCloudinary();

app.get('/', (req,res)=>{
    res.send('API is running...');
})


// Routes
app.use('/api/user', userRoutes);


// PORT
const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});