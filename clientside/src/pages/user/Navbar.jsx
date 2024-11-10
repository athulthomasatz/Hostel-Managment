// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      {/* Left Side: Project Title */}
      <h1 className={styles.projectTitle}>Hostel Management </h1>

      {/* Middle: Navigation Links */}
      <div className={styles.middleSection}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/more" className={styles.navLink}>More</Link>
        <Link to="/contact" className={styles.navLink}>Contact</Link>
      </div>

      {/* Right Side: Login/Sign Up */}
      <div className={styles.rightSection}>
        {user ? (
          <>
            <span className={styles.welcomeText}>Welcome, {user.name || 'User'}!</span>
            <button className={styles.btnPrimary} onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className={styles.btnPrimary}>Login/Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
