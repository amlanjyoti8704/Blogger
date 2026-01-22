import jwt from 'jsonwebtoken';
import User from '../Models/Users.js';
import { errorHandler } from './error.js';

// import { errorHandler } from './error.js';
export const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id).select('-password');
    next();
  }
  catch(err){
    return next(errorHandler(401, 'Unauthorized'));
  }
};