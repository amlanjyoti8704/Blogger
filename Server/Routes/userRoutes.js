import express from 'express';
import upload from '../Config/multer.js';
import { signup, signin, google } from '../Controllers/userController.js';

const router=express.Router();

// Define user-related routes here
router.post('/signup', upload.single('image'), signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;