import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './dash.module.css';
import hostelImage from '../../assets/dash.png';
// Replace with the path to your image

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        {/* Intro Section with Paragraph and Image */}
        <div className={styles.introSection}>
          {/* Left Side: Paragraph about the hostel */}
          <div className={styles.introText}>
            <h2>Welcome to Our Hostel Management</h2>
            <p>
              Discover a welcoming and comfortable environment at our hostel, designed to offer
              students a home away from home. With secure and modern facilities, we provide all
              amenities necessary for a successful and enjoyable stay. From spacious rooms to
              convenient services, we ensure our residents experience the best of hostel life.
            </p>
          </div>
          {/* Right Side: Image */}
          <div className={styles.introImage}>
            <img src={hostelImage} alt="Hostel" className={styles.image} />
          </div>
        </div>

        {/* Glass Effect Buttons Section */}
        <div className={styles.buttonsContainer}>
          <Link to="/roomstatus" className={`${styles.glassButton} ${styles.cardLink}`}>
            Room Status / Booking
          </Link>
          <Link to="/profile" className={`${styles.glassButton} ${styles.cardLink}`}>
            Profile
          </Link>
          <Link to="/feemanagement" className={`${styles.glassButton} ${styles.cardLink}`}>
            Fee Management
          </Link>
          <Link to="/notices" className={`${styles.glassButton} ${styles.cardLink}`}>
            Notices
          </Link>
        </div>
      </div>
    </>
  );
}
