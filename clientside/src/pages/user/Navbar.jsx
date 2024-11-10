// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const navContent = (
    <>
      <div className={styles.middleSection}>
        <Link to="/" className={styles.navLink} onClick={closeMobileMenu}>Home</Link>
        <Link to="/more" className={styles.navLink} onClick={closeMobileMenu}>More</Link>
        <Link to="/contact" className={styles.navLink} onClick={closeMobileMenu}>Contact</Link>
      </div>

      <div className={styles.rightSection}>
        {user ? (
          <>
            <span className={styles.welcomeText}>Welcome, {user.name || 'User'}</span>
            <button className={styles.btnPrimary} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={closeMobileMenu}>
            <button className={styles.btnPrimary}>Login/Sign Up</button>
          </Link>
        )}
      </div>
    </>
  );

  return (
    <>
      <nav className={styles.navbar}>
        <h1 className={styles.projectTitle}>Hostel Management</h1>
        
        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navContent}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
          <button className={styles.closeBtn} onClick={closeMobileMenu}>
            ✕
          </button>
          {navContent}
        </div>
      )}
    </>
  );
}
