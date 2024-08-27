import express from 'express';
// import { body } from "express-validator";
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    }
});

const upload = multer({ storage: storage });
const postRouter = express.Router();

import { createPost, deletePostById, getAllPosts, getPostByCategory, getPostById, getPostsByUsername, updatePostById } from '../Controller/post.controller.js';

postRouter.post('/create',upload.single('image'),createPost);
postRouter.get('/get/:id',getPostById);
postRouter.get('/get-all-post',getAllPosts);
postRouter.get('/getPost/filter',getPostsByUsername);
postRouter.put('/update-blog/:id',upload.single('image'),updatePostById);
postRouter.delete('/delete/:id', deletePostById);
postRouter.get('/get/filter/:category', getPostByCategory);

export default postRouter ; 