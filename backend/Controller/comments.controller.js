import commentModel from "../Model/comments.model.js";

// Controller to create a new comment
export const createComment = async (req, res) => {
    try {
        const { blogId, username, comments } = req.body;

        if (!blogId || !username || !comments) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newComment = new commentModel({
            blogId,
            username,
            comments
        });

        await newComment.save();

        res.status(201).json({ message: 'Comment successfully created', newComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
};

// fetch comments by blogId
export const fetchCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is required' });
        }

        // Use an object to specify the query condition
        const comments = await commentModel.find({ blogId });

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this blog' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to retrieve comments', error });
    }
};

// Delete comments by ID
export const deleteCommentById = async (req,res) => {
  try {
    const { id } = req.params;
    const result = await commentModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Comment successfully deleted' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error deleting comment', error });
  }
}