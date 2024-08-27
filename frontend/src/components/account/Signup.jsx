import React from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import AppLogo from '../../Images/Blog_App_Logo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const signUpUser = async () => {
        try {
            const res = await axios.post('http://localhost:3000/user/signup', { username, email, password });
            console.log(JSON.stringify(res.data));
            createNotification(res.data.message);
            
            if (res.data.message === 'User successfully registered.') {
                setUserName("");
                setEmail("");
                setPassword("");
                setUsernameError(false);
                setEmailError(false);
                setPasswordError(false);
            }

            setTimeout(() => {
                navigate('/signin');
            }, 1000);

        } catch (error) {
            console.log(error);
            const message = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Something went wrong. Please try again later...';
            createNotification(message);

            if (message === 'Email already exists.' || message === 'Invalid Email.') {
                setEmailError(true);
            } else if (message === 'Password must have at least 8 characters.') {
                setPasswordError(true);
            } else if (message === 'Username already exists.') {
                setUsernameError(true);
            }
        }
    };

    const createNotification = (type) => {
        switch (type) {
            case 'User successfully registered.':
                toast.success('User successfully registered.');
                break;
            case 'Email already exists.':
                toast.error('Email already exists.');
                break;
            case 'Password must have at least 8 characters.':
                toast.error('Password must have at least 8 characters.');
                break;
            case 'Username already exists.':
                toast.error('Username already exists.');
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
                            value={username}
                            onChange={(e) => { setUserName(e.target.value); setUsernameError(false); }}
                            error={usernameError}
                            sx={{
                                input: {
                                    color: usernameError ? 'red' : 'inherit'
                                }
                            }}
                            name='username'
                            label="Enter username"
                        />
                        <TextField
                            variant="standard"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                            error={emailError}
                            sx={{
                                input: {
                                    color: emailError ? 'red' : 'inherit'
                                }
                            }}
                            name='email'
                            label="Enter email"
                        />
                        <TextField
                            variant="standard"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                            error={passwordError}
                            sx={{
                                input: {
                                    color: passwordError ? 'red' : 'inherit'
                                }
                            }}
                            name='password'
                            label="Enter password"
                        />
                        <LoginButton
                            variant="contained"
                            onClick={() => { signUpUser() }}
                        >
                            Sign Up
                        </LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <Box style={{ textAlign: 'center', marginTop: 0 }}>
                            Already have an account? <Button variant="text" onClick={() => navigate('/signin')}>Sign In</Button>
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
    border-radius: 8px;

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
