import User from '../Models/Users.js';
import { errorHandler } from '../Utils/error.js';
import generateToken from '../Utils/generateToken.js';
import bcrypt from 'bcrypt';
import connectCloudinary from '../Config/cloudinary.js';
import {v2 as cloudinary} from 'cloudinary';

await connectCloudinary();

export const signup=async(req,res,next)=>{
  const {username,email,password}=req.body;
  const imageFile=req.file;

  if(!username || !email || !password || !imageFile){
    return next(errorHandler(400,"All fields are required"));
  }

  const existingUser=await User.findOne({$or:[{username},{email}]});
  if(existingUser){
    return next(errorHandler(400,"Username or Email already exists"));
  }

  const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(password,salt);
  const imagePath=await cloudinary.uploader.upload(imageFile.path);

console.log("BODY:", req.body);
console.log("FILE:", req.file);

  const newUser=new User({
    username,
    email,
    password:hashPassword,
    profilePicture:imagePath.secure_url
  });
  
  try{
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        profilePicture: newUser.profilePicture,
      },
      token: generateToken(newUser._id),
    });
  }
  catch(error){
    next(error);
  }
};

export const signin=async(req,res,next)=>{
  const {email, password}=req.body;
  if(!email || !password){
    return next(errorHandler(400,"All fields are required"));
  }

  try{
    const validUser=await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,"User not Found"));
    }
    const validPassword=await bcrypt.compare(password,validUser.password);
    if(validPassword){
      res.json({
        success:true,
        user:{
          username:validUser.username,
          email:validUser.email,
          id:validUser._id
        },
        token:generateToken(validUser._id)
      });
    }
    else{
      return next(errorHandler(400,"Invalid Credentials"));
    } 
  }
  catch(error){
    next(error);
  }
}

export const google=async(req,res,next)=>{
   const {email, name, profilePicture}=req.body;

    try{
        const validUser=await User.findOne({email});
        if(validUser){
            res.status(200).json({
                success:true,
                user:{
                    username:validUser.username,
                    email:validUser.email,
                    id:validUser._id
                },
                token:generateToken(validUser._id)
            });     
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const salt=await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(generatedPassword,salt);
            const newUser=new User({
                username: name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture
            });

            await newUser.save();
            res.json({
              success:true,
              user:{
                  username:newUser.username,
                  email:newUser.email,
                  id:newUser._id
              },
              token:generateToken(newUser._id)
            })
        }
    }catch(err){
        next(err);
    }
}