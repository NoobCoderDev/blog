import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, styled, Grid } from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { Link } from 'react-router-dom';

export default function UserBlog() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/getPost/filter?username=${account.username}`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      }
    };

    fetchBlogs();
  }, [account.username]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Blogs
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      
      <Grid container spacing={2}>
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <Grid item xs={12} sm={6} md={6} key={blog._id}>
                <Link to={`/user/blog-details/${blog._id}`} style={{textDecoration : 'none'}}>
              <Card>
                <CardMedia
                  component="img"
                  width="100%"
                  height="170"
                  image={`http://localhost:3001/${blog.image}` || 'https://via.placeholder.com/150'}
                  alt={blog.title}
                />
                <CardContent>
                  <Title variant="h5" component="div">
                    {blog.title}
                  </Title>
                  <Content variant="body2" color="text.secondary">
                    {blog.content}
                  </Content>
                  <Typography variant="body2" color="text.primary">
                    Category: {blog.category}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Publish Date: {new Date(blog.createdDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Author: {blog.username}
                  </Typography>
                </CardContent>
              </Card>   
              </Link>
            </Grid>
            
          ))
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ width: '100%' }} style={{ fontSize: '30px' }}>
            No blogs available
          </Typography>
        )}
      </Grid>
      
    </Container>
  );
}

// Styled components
const Container = styled(Box)`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  margin-top: 60px;
`;

const Title = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const Content = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 4; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  text-align : justify !important;
`;
