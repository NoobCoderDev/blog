import express from 'express';
import dbConnection from './DB/dbConnection.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import userRouter from './Routes/user.router.js';
import postRouter from './Routes/post.router.js';
import commentRouter from './Routes/comment.router.js';

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files (for images)
app.use('/uploads', express.static(uploadsDir));

const DATABASE_URL = process.env.DB_URL;

// Database Connection
dbConnection(DATABASE_URL);

app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);

app.listen(port,(req,res)=>{
    console.log(`Server started on http://localhost:${port}`);
})