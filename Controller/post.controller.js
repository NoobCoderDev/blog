import PostModel from "../Model/posts.model.js";

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content, username, category } = req.body;
        const image = req.file ? req.file.path : null; // Save the image path

        const newPost = new PostModel({
            title,
            content,
            image,
            username,
            category
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully.', newPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve posts', error });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve post', error });
  }
};

// Update a post by ID
export const updatePostById = async (req, res) => {
  try {
    const { title, content, username, category } = req.body;
    const images = req.file ? req.file.path : null;
    let image = null;
    if(images) {
       image = images;
    }else{
      image = req.body.image;
   }
    
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { title, content, image, username, category },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated successfully.', post });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update post', error });
  }
};

// Delete a post by ID
export const deletePostById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const post = await PostModel.findByIdAndDelete(id);
  
      if (!post) {
        console.log(post)
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to delete post', error });
    }
};

// Get all post with the user username filter
export const getPostsByUsername = async (req, res) => {
    try {
      const { username } = req.query;
  
      if (!username) {
        return res.status(400).json({ message: 'Username query parameter is required' });
      }
  
      const posts = await PostModel.find({ username });
      
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for the given username' });
      }
      
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve posts', error });
    }
  };

  // Get a Multiple post by category
export const getPostByCategory = async (req, res) => {
  try {
    const  category  = req.params.category;

    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }
    const posts = await PostModel.find({ category });
    
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for the given category.' });
    }
    
    res.status(200).json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to retrieve posts', error });
  }
};
