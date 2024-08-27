import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled, Container, Typography, TextField, Button, Grid, Paper, FormControl, Input, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { DataContext } from '../context/DataProvider';
import defaultImage from '../Images/backgroundImage.png';
import categories from '../constants/Data';

export default function UpdateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [imagePreview, setImagePreview] = useState(defaultImage);
    const { account } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/post/get/${id}`);
                const blogData = response.data;
                setTitle(blogData.title);
                setContent(blogData.content);
                setSelectedCategory(blogData.category);
                setImagePreview(blogData.image ? `http://localhost:3001/${blogData.image}` : defaultImage);
                setImage(blogData.image); 
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(defaultImage);
        }
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('username', account.username);
        formData.append('category', selectedCategory);
        console.log("Hello", image);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`http://localhost:3000/post/update-blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate(`/user/blog-details/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <StyledPaper>
                <Typography variant="h5" style={{ marginBottom: '10px', fontSize: '25px', fontWeight: 'bold', fontFamily: 'cursive' }}>
                    Update Post
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Image src={imagePreview} alt='Post Image' />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Box>
                                    <label htmlFor='image-upload' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                        <Typography style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'cursive' }}>
                                            Add Image
                                        </Typography>
                                        <AddCircleIcon style={{ fontSize: '30px' }} />
                                    </label>
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </Box>

                                <Box>
                                    <label htmlFor='category-select' style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'cursive' }}>
                                        Category:
                                    </label>
                                    <select
                                        id="category-select"
                                        value={selectedCategory}
                                        onChange={handleChange}
                                        style={{ padding: '5px', fontSize: '20px' }}
                                    >
                                        {categories.map(category => (
                                            <option key={category.id} value={category.type}>
                                                {category.type}
                                            </option>
                                        ))}
                                    </select>
                                </Box>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                label="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Update Post
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
        </Container>
    );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
}));

const Image = styled('img')({
    height: '40vh',
    objectFit: 'cover'
});
