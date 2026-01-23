import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost, getPostBySlug } from '../Controllers/postController.js';
import upload from '../Config/multer.js';

const router = express.Router();

router.post('/create', verifyToken, upload.single('image'), create)
router.get('/getposts', getposts)
router.get('/getpost/:slug', getPostBySlug)
router.delete('/deletepost/:postId/', verifyToken, deletepost)
router.put('/updatepost/:postId/', verifyToken, upload.single('image'), updatepost)

export default router;