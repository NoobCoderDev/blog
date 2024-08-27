import express from 'express';
import { body } from "express-validator";
const userRouter = express.Router();

import { createUser, findUser } from '../Controller/user.controller.js';

userRouter.post('/signup',
body("username","username is required").notEmpty(),
body("email","email is required").notEmpty(),
body("email","email is incorrect").isEmail(),
body("password","password is required").notEmpty(),
body("password","password must have at least 8 letter").isLength({min:8}),createUser);

userRouter.post('/signin',
body("email","email is required").notEmpty(),
body("email","email is incorrect").isEmail(),
body("password","password is required").notEmpty(),
body("password","password must have at least 8 letter").isLength({min:8}),findUser);

export default userRouter ; 
