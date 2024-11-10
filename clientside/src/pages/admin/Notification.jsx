import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './notifications.module.css';
import BackButton from '../../components/BackButton';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notification');
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            setError('Error loading notifications. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/notification/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setNotifications(notifications.filter(notification => notification._id !== id));
                } else {
                    throw new Error('Failed to delete notification');
                }
            } catch (error) {
                console.error('Error deleting notification:', error);
            }
        }
    };

    if (loading) return <div className={styles.loadingState}>Loading notifications...</div>;
    if (error) return <div className={styles.errorState}>{error}</div>;

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles.header}>
                <h1>Notifications</h1>
                <Link to="/admin/add-notice" className={styles.addButton}>
                    Add New Notice
                </Link>
            </div>

            {notifications.length === 0 ? (
                <div className={styles.emptyState}>No notifications available</div>
            ) : (
                <div className={styles.notificationGrid}>
                    {notifications.map(notification => (
                        <div key={notification._id} className={styles.notificationCard}>
                            <div className={styles.cardHeader}>
                                <h3>{notification.createdBy}</h3>
                                <span className={styles.date}>
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <div className={styles.content}>
                                <p>{notification.content}</p>
                            </div>

                            <div className={styles.actions}>
                                <Link 
                                    to={`/admin/update-notifi/${notification._id}`} 
                                    className={styles.updateButton}
                                >
                                    Update
                                </Link>
                                <button 
                                    onClick={() => handleDelete(notification._id)} 
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
