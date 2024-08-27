import express from 'express';
import { createComment, deleteCommentById, fetchCommentsByBlogId } from '../Controller/comments.controller.js';
const commentRouter = express.Router();

commentRouter.post('/create',createComment);
commentRouter.delete('/delete/:id',deleteCommentById);
commentRouter.get('/get/:blogId',fetchCommentsByBlogId);

export default commentRouter ; 