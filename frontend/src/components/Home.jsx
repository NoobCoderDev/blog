import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, styled, Grid, Select, MenuItem } from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import categories from '../constants/Data';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const { account } = useContext(DataContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = `http://localhost:3000/post/get-all-post`;
        if (selectedCategory) {
            setError(null);
            url = ( selectedCategory === 'All'
                ? `http://localhost:3000/post/get-all-post`
                : `http://localhost:3000/post/get/filter/${selectedCategory}` );
        }
        const response = await axios.get(url);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      }
    };

    fetchBlogs();
  }, [selectedCategory, account.username]);

  return (
    <>
      <Banner />
      <CategoriesContainer>
        <Typography variant="h6" gutterBottom>
          Select a category based on your interest :
        </Typography>
        <CategorySelect
          value={selectedCategory}
          onChange={handleChange}
          displayEmpty
          renderValue={(value) => value || 'Select a category'}
        >
          <MenuItem value="" disabled>Select a category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.type}>
              {category.type}
            </MenuItem>
          ))}
        </CategorySelect>
      </CategoriesContainer>
      <Container>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          {blogs.length > 0 ? (
            blogs.map(blog => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={blog._id}>
                <Link to={`/user/home-blog-details/${blog._id}`} style={{ textDecoration: 'none' }}>
                  <ResponsiveCard>
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
                  </ResponsiveCard>
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
    </>
  );
}

const CategoriesContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap : 30px;
  padding: 1rem;
  background-color: #f4f4f4;

  @media (min-width: 1440px) {
    font-size : 30px;
  }
`;

const CategorySelect = styled(Select)`
  width: 200px;
  & .MuiSelect-select {
    padding: 8px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-radius: 8px;
  }
  &:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: #e0e0e0;
    }
  }
    @media (min-width: 1440px) {
    & .MuiSelect-select {
    padding: 16px;
  }
  }
`;

const Container = styled(Box)`
  padding: 2rem;
  max-width: 100%; 
  margin: auto;
  margin-top: 60px;
`;

const ResponsiveCard = styled(Card)`
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 100%; 
  max-width: 100%; 
  height: auto; 

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 1440px) {
    max-width: calc(100% - 2rem);
    height: auto; 
  }
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
  text-align: justify !important;
`;
