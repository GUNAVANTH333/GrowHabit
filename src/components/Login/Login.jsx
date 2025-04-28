import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = formData;

        if (email === 'test123@gmail.com' && password === 'test@123') {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            window.location.href = '/';
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

