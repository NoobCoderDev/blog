import React, { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import AppLogo from '../../Images/Blog_App_Logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import Validation from '../validations/Validation.jsx';

export default function Login({ isUserAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { errors, setErrors, validateForm } = Validation();
    const { setAccount } = useContext(DataContext);

    const signInUser = async () => {
        if (validateForm(email, password)) {
            try {
                const res = await axios.post('http://localhost:3000/user/signin', { email, password });
                sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);
                setAccount({ username: res.data.username, email: res.data.email });
                createNotification(res.data.message);
                isUserAuthenticated(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } catch (error) {
                const message = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again later...';
                createNotification(message);

                if (message === 'This email is not registered.') {
                    setErrors((prevErrors) => ({ ...prevErrors, email: message }));
                } else if (message === 'Invalid Password.') {
                    setErrors((prevErrors) => ({ ...prevErrors, password: message }));
                }
            }
        } else {
            createNotification('Please fill all required fields correctly.');
        }
    };

    const createNotification = (type) => {
        switch (type) {
            case 'User successfully logged in.':
                toast.success('User successfully logged in.');
                break;
            default:
                toast.error(type);
                break;
        }
    };

    return (
        <>
            <Box style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Components>
                    <Image src={AppLogo} alt='App Logo' />
                    <Typography style={{ textAlign: 'center' }}>
                        " Welcome to our Ultimate Blogging Hub "
                    </Typography>
                    <Typography style={{ textAlign: 'center' }}>
                        Share Your Stories, Ideas, and Creativity!
                    </Typography>

                    <Wrapper>
                        <TextField
                            variant="standard"
                            label="Enter email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            sx={{
                                input: {
                                    color: errors.email ? 'red' : 'inherit'
                                }
                            }}
                        />
                        <TextField
                            variant="standard"
                            label="Enter password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                            }}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            sx={{
                                input: {
                                    color: errors.password ? 'red' : 'inherit'
                                }
                            }}
                        />
                        <LoginButton
                            variant="contained"
                            onClick={signInUser}
                        >
                            Login
                        </LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <Box style={{ textAlign: 'center', marginTop: 0 }}>
                            You don't have an account? <Button variant="text" onClick={() => navigate('/signup')}>Sign Up</Button>
                        </Box>
                    </Wrapper>
                    <ToastContainer />
                </Components>
            </Box>
        </>
    );
}

const Components = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);

    @media (min-width: 1440px) {
        width: 600px;  /* Increase the width for larger screens */
    }
`;

const Image = styled('img')({
    width: 150,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;

    & > div, & > button, & > p {
        margin-top: 20px;
    }

    @media (min-width: 1440px) {
        padding: 35px 45px;  /* Increase padding for larger screens */
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;

    @media (min-width: 1440px) {
        font-size: 1.2rem;  /* Increase font size for larger screens */
        padding: 12px 24px;  /* Increase padding for larger screens */
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;

    @media (min-width: 1440px) {
        font-size: 18px;  /* Increase font size for larger screens */
    }
`;
