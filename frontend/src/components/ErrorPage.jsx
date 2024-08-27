import React from 'react';
import { Container, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button 
        component={Link} 
        to="/home" 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
