import Post from '../Models/Post.js';
import { errorHandler } from '../Utils/error.js';


export const create=async(req,res,next)=>{
    // this allows only admin to create post, so I deactivated this.
    // if(!req.user.isAdmin){
    //     return next(errorHandler(403,"You are not authorized to create a post"));
    // }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"Title and Content are required"));
    }
    const slug=req.body.title
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9-]/g,'')
    .split(' ')
    .join('-')+
    '-'+Date.now();

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newPost=new Post({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        category: req.body.category,
        slug,
        userId: req.user.id,
        image: imagePath,
    });
    try{
        const savedPost=await newPost.save();
        res.status(201).json({
            success:true,
            post:savedPost
        });
    }
    catch(error){
        console.error('CREATE POST ERROR:', error);
        next(error);
    }
}

export const getposts=async(req,res,next)=>{
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.author && { author: req.query.author}),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
            $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
        }),
        })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
        
        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
        });
    }
    catch(error){
        next(error);
    }
}

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};


export const deletepost = async (req, res, next) => {
  try {
    const post=await Post.findById(req.params.postId);
    if(!post){
      return next(errorHandler(404,"Post not found"));
    }
    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
}

export const updatepost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }
    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }

    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {updatedData},
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
}