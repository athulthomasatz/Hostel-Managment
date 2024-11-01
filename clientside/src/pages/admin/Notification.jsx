import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './notifications.module.css'; // Use the same CSS module or create a new one

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notification');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/notification/${id}`, {
                method: 'DELETE',
            });
            setNotifications(notifications.filter(notification => notification._id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Notifications</h1>
            <div className={styles.boxContainer}>
                {notifications.map(notification => (
                    <div key={notification._id} className={styles.notificationBox}>
                        <h3>{notification.createdBy}</h3>
                        <p>{notification.content}</p>
                        <p>{new Date(notification.createdAt).toLocaleString()}</p>
                        <div className={styles.buttonContainer}>
                            <Link to={`/admin/update-notifi/${notification._id}`} className={styles.btnUpdate}>
                                Update
                            </Link>
                            <button onClick={() => handleDelete(notification._id)} className={styles.btnDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/admin/add-notice" className={styles.btnAdd}>Add New Notification</Link>
        </div>
    );
};

export default Notifications;
