import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { FaBed, FaClipboardList, FaMoneyBillWave, FaBell } from 'react-icons/fa';
import styles from './adminDashboard.module.css';

export default function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className={styles.dashboardContainer}>
            <nav className={styles.navbar}>
                <div className={styles.navContent}>
                    <h1 className={styles.logo}>HMS Admin</h1>
                    <div className={styles.userSection}>
                        <span className={styles.username}>
                            Welcome, {user?.name || 'Admin'}
                        </span>
                        <button className={styles.logoutButton} onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className={styles.mainContent}>
                <header className={styles.dashboardHeader}>
                    <h1>Hostel Management Dashboard</h1>
                    <p>Manage your hostel operations efficiently</p>
                </header>

                <div className={styles.cardGrid}>
                    <Link to="/room-management" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <FaBed />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Room Management</h3>
                            <p>Add, update, and manage room details</p>
                        </div>
                        <div className={styles.cardArrow}>→</div>
                    </Link>

                    <Link to="/admin/bookings" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <FaClipboardList />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Booking Status</h3>
                            <p>View and manage room bookings</p>
                        </div>
                        <div className={styles.cardArrow}>→</div>
                    </Link>

                    <Link to="/admin/track-fees" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <FaMoneyBillWave />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Fee Management</h3>
                            <p>Track and manage fee payments</p>
                        </div>
                        <div className={styles.cardArrow}>→</div>
                    </Link>

                    <Link to="/admin/notices" className={styles.card}>
                        <div className={styles.cardIcon}>
                            <FaBell />
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Notice Board</h3>
                            <p>Post and manage announcements</p>
                        </div>
                        <div className={styles.cardArrow}>→</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
