import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, styled, Button, TextField, Grid, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../context/DataProvider';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

export default function BlogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      const fetchedBlog = await fetchData(`http://localhost:3000/post/get/${id}`);
      const fetchedComments = await fetchData(`http://localhost:3000/comment/get/${id}`);
      setBlog(fetchedBlog);
      setComments(fetchedComments || []);
    };
    fetchBlogAndComments();
  }, [id]);

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/post/delete/${id}`);
      navigate('/user/blog');
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = async () => {
    try {
      await axios.post(`http://localhost:3000/comment/create`, { blogId: id, comments: newComment, username: account.username });
      setNewComment('');
      const response = await axios.get(`http://localhost:3000/comment/get/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comment/delete/${commentId}`);
      const response = await axios.get(`http://localhost:3000/comment/get/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  if (blog === null) {
    return (
      <Container component="main">
        <Typography variant="body1" textAlign="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main">
      {blog ? (
        <Card sx={{ maxWidth: '100%', margin: '0 auto', borderRadius: '0' }}>
          <CardMedia
            component="img"
            image={`http://localhost:3001/${blog.image}` || 'https://via.placeholder.com/150'}
            alt={blog.title}
            sx={{ height: '40vh', width: '100%' }}
          />
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {blog.title}
            </Typography>
            <Content variant="body1" color="text.secondary" paragraph>
              {blog.content}
            </Content>
            <Typography variant="body2" color="text.primary">
              Category: {blog.category}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Publish Date: {new Date(blog.createdDate).toLocaleDateString()}
            </Typography>
            <InnerDiv>
              <Typography variant="body2" color="text.primary">
                Author: {blog.username}
              </Typography>
              <Box>
                <Button>
                  <Link to={`/user/update-blog/${id}`} style={{ textDecoration: 'none' }}>
                    <EditIcon style={{ fontSize: '30px', color: 'black', border: '1px solid black', borderRadius: '100%', padding: '10px' }} />
                  </Link>
                </Button>
                <Button onClick={deletePost}>
                  <DeleteIcon style={{ fontSize: '30px', color: 'black', border: '1px solid black', borderRadius: '100%', padding: '10px' }} />
                </Button>
              </Box>
            </InnerDiv>
          </CardContent>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Comments</Typography>
            <TextField
              label="Add a comment"
              value={newComment}
              onChange={handleCommentChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={addComment}>
              Add Comment
            </Button>
          </Box>
          <Box mt={2} p={2}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Box key={comment._id} mb={2} p={2} border={1} borderColor="divider" borderRadius={1} bgcolor="background.paper">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Author: {comment.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" paragraph>
                        {comment.comments}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="textSecondary">
                        Comment Date: {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} container justifyContent="flex-end">
                      {comment.username === account.username && (
                        <Button
                          onClick={() => deleteComment(comment._id)}
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))
            ) : (
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography>No comments yet on this post</Typography>
              </Paper>
            )}
          </Box>
        </Card>
      ) : (
        <Typography variant="body1" textAlign="center">
          No blog found.
        </Typography>
      )}
    </Container>
  );
}

const Container = styled(Box)`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  margin-top: 60px;
`;

const InnerDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled(Typography)`
  text-align: justify !important;
`;
