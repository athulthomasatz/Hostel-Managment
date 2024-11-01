import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar'
// import { AuthContext } from '../AuthContext';
// Import the AuthContext to get the user data
import { useAuth } from '../../AuthContext';  // Adjust the path if needed

import styles from './dash.module.css';  // Importing the CSS module
// const CurrentLocation = () => {
//   const location = useLocation(); 
// }// Get the current location
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className="row">
          {/* Room Status Section */}
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`} style={{ backgroundImage: 'url("assets/room-status.png")' }}>
              <Link to="/roomstatus" className={styles.cardLink}>
                <h3 className={styles.cardTitle}>Room Status / Booking</h3>
              </Link>
            </div>
          </div>

          {/* Profile Section */}
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`} style={{ backgroundImage: 'url("assets/profile.png")' }}>
              <Link to="/profile" className={styles.cardLink}>
                <h3 className={styles.cardTitle}>Profile</h3>
              </Link>
            </div>
          </div>

          {/* Fee Management Section */}
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`} style={{ backgroundImage: 'url("assets/fee-management.png")' }}>
              <h3 className={styles.cardTitle}>Fee Management</h3>
            </div>
          </div>
        </div>

        {/* Notices Section */}
        <div className="col-md-12">
          <div className={`card text-center ${styles.card}`} style={{ backgroundImage: 'url("assets/notices.png")' }}>
            <Link to="/notices" className={styles.cardLink}>
              <h3 className={styles.cardTitle}>Notices</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
