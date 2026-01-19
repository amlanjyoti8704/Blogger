import mongoose from 'mongoose'

// function to connect to the mongodb database
const connectDB=async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}/blogger`)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));
    // mongoose.connection.on('connected',()=>console.log('DB Connected'));
}

export default connectDB