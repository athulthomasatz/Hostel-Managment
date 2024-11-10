import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './dash.module.css';

export default function Dashboard() {
  const features = [
    {
      title: 'Room Management',
      description: 'Check room availability and manage your bookings easily.',
      path: '/roomstatus',
      icon: '🏠',
      tag: 'Rooms'
    },
    {
      title: 'Profile Settings',
      description: 'View and update your personal information.',
      path: '/profile',
      icon: '👤',
      tag: 'Account'
    },
    {
      title: 'Fee Management',
      description: 'Track payments and manage your hostel fees.',
      path: '/feemanagement',
      icon: '💰',
      tag: 'Payments'
    },
    {
      title: 'Notices & Updates',
      description: 'Stay informed with latest announcements and updates.',
      path: '/notices',
      icon: '📢',
      tag: 'Updates'
    }
  ];

  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.greeting}>Welcome back</span>
            <h1>Student Dashboard</h1>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search features..." />
          </div>
        </div>

        <div className={styles.subHeader}>
          <h2>Features and Services</h2>
          <p>Everything you need to manage your hostel experience</p>
        </div>

        <div className={styles.cardsGrid}>
          {features.map((feature, index) => (
            <Link to={feature.path} className={styles.card} key={index}>
              <div className={styles.cardTag}>{feature.tag}</div>
              <div className={styles.cardIcon}>{feature.icon}</div>
              <div className={styles.cardContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className={styles.cardAction}>
                <span className={styles.viewMore}>
                  View details <span className={styles.arrow}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
