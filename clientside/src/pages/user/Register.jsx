import React, { useState } from 'react';
import styles from './register.module.css'; // Import the CSS module

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // State to handle error messages
  const [success, setSuccess] = useState(null); // State to handle success messages
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior also avoid page refreshing

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Optionally, you can add more validation here (e.g., email format)

    setLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:5000/auth/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword }), // Send trimmed data as JSON
      });
      console.log("response below ");
      console.log(response);
      console.log("response above ");
      
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        // Handle successful registration
        setSuccess('Registration successful! Please log in.'); // Update success message
        setError(null); // Clear error message
        setUsername(''); // Clear input fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handle errors (e.g., user already exists)
        console.error('Registration error:', data);
        setError(data.message || 'Registration failed. Please try again.'); // Update error message
        setSuccess(null); // Clear success message
      }
    } catch (err) {
      // Handle network or server errors
      console.error('Network error:', err);
      setError('An error occurred. Please try again later.');
      setSuccess(null); // Clear success message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Register</h1>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
      {success && <p className={styles.success}>{success}</p>} {/* Display success message */}
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <p className={styles.loginLink}>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}
