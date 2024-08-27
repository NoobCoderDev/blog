import { useState } from 'react';

export default function Validation() {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = ( email, password ) => {
        let valid = true;
        const newErrors = {};

            if (!email.trim()) {
                newErrors.email = "Email is required.";
                valid = false;
            } else if (!validateEmail(email)) {
                newErrors.email = "Please enter a valid email.";
                valid = false;
            }
  
            if (!password.trim()) {
                newErrors.password = "Password is required.";
                valid = false;
            } else if (password.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
                valid = false;
            }

        setErrors(newErrors);
        return valid;
    };

    const validateSignupForm = ( username, email, password ) => {
        let valid = true;
        const newErrors = {};

        if (username !== undefined) { 
            if (!username.trim()) {
                newErrors.username = "Username is required.";
                valid = false;
            } else if (username.length < 3) {  
                newErrors.username = "Username must be at least 3 characters.";
                valid = false;
            }
        }

        if (email !== undefined) { 
            if (!email.trim()) {
                newErrors.email = "Email is required.";
                valid = false;
            } else if (!validateEmail(email)) {
                newErrors.email = "Please enter a valid email.";
                valid = false;
            }
        }

        if (password !== undefined) {  
            if (!password.trim()) {
                newErrors.password = "Password is required.";
                valid = false;
            } else if (password.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    return { errors, setErrors, validateForm, validateSignupForm  };
}
