import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';  // Adjust the path if needed

import styles from './dash.module.css';  // Importing the CSS module

export default function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Hostel Management Admin Dashboard</h1>
        
        {/* Conditionally render the user's name and logout button */}
        {user ? (
          <>
            <h4>Welcome, {user.name || 'Admin'}!</h4>
            <button className={styles.btnPrimary} onClick={logout}>Logout</button>
          </>
        ) : (
          <div className={styles.buttonContainer}>
            <Link to='/login'>
              <button className={styles.btnPrimary}>Login</button>
            </Link>
          </div>
        )}

        <div className="row">
          {/* Add/Update Room Section */} 
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`}>
              <div className="card-body">
                <Link to='/room-management' className="btn btn-link">
                  <h3 className={styles.cardTitle}>Add/Update Room</h3>
                </Link>
                <p className={styles.cardText}>Manage room details, availability, and assignments.</p>
              </div>
            </div>
          </div>
          {/* view booked rooms and details Section */}

          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`}>
              <div className="card-body">
                <Link to='/admin/bookings' className="btn btn-link">
                  <h3 className={styles.cardTitle}>View Booked Room Status</h3>
                </Link>
                <p className={styles.cardText}>Manage booked room details</p>
              </div>
            </div>
          </div>

          {/* Track Fee Payment Section */}
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`}>
              <div className="card-body">
                <Link to='/admin/track-fees' className="btn btn-link">
                  <h3 className={styles.cardTitle}>Track Fee Payments</h3>
                </Link>
                <p className={styles.cardText}>Monitor fee payments and manage outstanding balances.</p>
              </div>
            </div>
          </div>

          {/* Manage Notices Section */}
          <div className="col-md-4">
            <div className={`card text-center ${styles.card}`}>
              <div className="card-body">
                <Link to='/admin/notices' className="btn btn-link">
                  <h3 className={styles.cardTitle}>Manage Notices</h3>
                </Link>
                <p className={styles.cardText}>Post and update hostel-related notices and announcements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
