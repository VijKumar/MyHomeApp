import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => { 
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const para = document.querySelector('p')
            para.innerHTML = '';
            alert('Form submitted', { email, password });
            // Add your submit logic here
            try {
                
                
                await fetch('http://localhost:8080/hi')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
             
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login.');
            }  

        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container">  
           
            <form onSubmit={handleSubmit}>
           
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Login</button>
                <button onClick={() => alert('Redirect to forgot password')}>
                Forgot Password?
                </button>
            </form>
            
        </div>
    );
};

export default Login;