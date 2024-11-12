// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from './login.module.css';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/auth/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        login({ name: username, token: data.token });
        navigate('/', { state: { username } });
        console.log('Login successful:', data);
      } else {
        console.error('Login error:', data);
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to continue</p>
        </div>

        {error && (
          <div className={styles.errorContainer}>
            <span className={styles.errorIcon}>⚠️</span>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">
              <span className={styles.labelText}>Username</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              <span className={styles.labelText}>Password</span>
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.input}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`${styles.btnPrimary} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className={styles.formFooter}>
            <p className={styles.signupLink}>
              Don't have an account? 
              <a href="/register" className={styles.link}>Sign Up</a>
            </p>
            <p className={styles.signupLink}>
              Are you an admin? 
              <a href='/admin/login' className={styles.link}>Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}




