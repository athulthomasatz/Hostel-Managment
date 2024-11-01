// src/pages/NoticesPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './notices.module.css'; // Assuming you have a CSS module for styling

const NoticesPage = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/api/notice'); // Adjust API route as needed
                const data = await response.json();
                setNotices(data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Notices</h1>
            <div className={styles.noticeList}>
                {notices.map(notice => (
                    <div key={notice._id} className={styles.noticeBox}>
                        <h3>{notice.createdBy}</h3>
                        <p>{notice.content}</p>
                        <p>{new Date(notice.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticesPage;
