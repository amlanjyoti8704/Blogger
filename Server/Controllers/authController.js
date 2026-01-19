import User from "../Models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt)

    const newUser=new User({
        username,
        email,
        password:hashPassword
    });
    try{
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(err){
        next(err);
    }
};

export const signin=async(req,res,next)=>{
    const {email, password}=req.body;
    if(!email || !password){
        next(errorHandler(400,"All fields are required"));
    }

    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }

        const validPassword=await bcrypt.compare(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid credentials"));
        }
        const token=jwt.sign({
                id:validUser._id,
                isAdmin:validUser.isAdmin
            }
            ,process.env.JWT_SECRET,{expiresIn:"1d"}
        );

        const { password: pass, ...rest } = validUser._doc;

        res
        .status(200)
        .cookie('access_token', token, {
            httpOnly: true,
        })
        .json(rest);
    }catch(err){
        next(err);
    }
};

export const google=async(req,res,next)=>{
    const {email, name, profilePicture}=req.body;

    try{
        const user=await User.findOne({email});
        if(user){
            const token=jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                }
                ,process.env.JWT_SECRET,{expiresIn:"1d"}
            );
            const {password, ...rest}=user._doc;
            res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
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
            const token=jwt.sign({
                    id:newUser._id,
                    isAdmin:newUser.isAdmin
                }
                ,process.env.JWT_SECRET,{expiresIn:"1d"}
            );
            const {password, ...rest}=newUser._doc;
            res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
        }
    }catch(err){
        next(err);
    }
}