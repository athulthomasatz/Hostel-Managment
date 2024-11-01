import React, { useEffect, useState } from "react"
import { useAuth } from '../../AuthContext';
import styles from './login.module.css';
import { useNavigate } from "react-router-dom"; 

export default function AdminLogin() {
    const { login } = useAuth();
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(' ');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/admin/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send username and password as JSON
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT token
                // Call login from context with token and username
                login({ name: username, token: data.token });

                // Redirect to dashboard
                navigate('/admin/dashboard', { state: { username } });

                console.log('Login successful:', data);
            } else {
                // Handle errors (e.g., incorrect credentials)
                console.error('Login error:', data); // Log error details
                setError(data.error || 'Login failed. Please try ag••••ain.'); // Update error message
            }
        } catch (err) {
            // Handle network or server errors
            console.error('Network error:', err); // Log network error
            setError('An error occurred. Please try again later.');
        }

    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Login</h1>
            {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
            <form className={styles.form} onSubmit={handleSubmit}> {/* Attach handleSubmit to form */}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update state on input change
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on input change
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.btnPrimary}>Login</button>
                </div>
                <p className={styles.signupLink}>Don't have an account? <a href="/register">Sign Up</a></p>
                <p className={styles.signupLink}>Are you a admin<a href='/admin/login'>Click here</a></p>
            </form>
        </div>
    )

}