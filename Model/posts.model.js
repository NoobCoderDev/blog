import mongoose from "mongoose";

// Define the Post schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// Create the Post model
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
