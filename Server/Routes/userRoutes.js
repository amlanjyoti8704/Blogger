import express from 'express';
import upload from '../Config/multer.js';
import { verifyToken } from '../Utils/verifyUser.js'
import { signup, signin, google, getUsers, updateUserRole, getMe } from '../Controllers/userController.js';

const router=express.Router();

// Define user-related routes here
router.post('/signup', upload.single('image'), signup);
router.post('/signin', signin);
router.post('/google', google);

router.get('/getusers', verifyToken, getUsers);
router.put('/update-role/:id', verifyToken, updateUserRole);
router.get('/me', verifyToken, getMe);

export default router;