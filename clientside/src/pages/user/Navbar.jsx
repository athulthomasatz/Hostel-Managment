// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from './Navbar.module.css';


export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navTitle}>Hostel Management Dashboard</h1>
      <div className={styles.navLinks}>
        {user ? (
          <>
            <span className={styles.welcomeText}>Welcome, {user.name || 'User'}!</span>
            <button className={styles.btnPrimary} onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>
            <button className={styles.btnPrimary}>Login / Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
