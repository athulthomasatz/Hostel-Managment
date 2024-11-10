// src/pages/NoticesPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './notices.module.css';

const NoticesPage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/api/notice');
                const data = await response.json();
                setNotices(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notices:', error);
                setError('Failed to load notices. Please try again later.');
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    if (loading) {
        return <div className={styles.loadingContainer}>Loading notices...</div>;
    }

    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Notices</h1>
            {notices.length === 0 ? (
                <p className={styles.noNotices}>No notices available</p>
            ) : (
                <div className={styles.noticeList}>
                    {notices.map(notice => (
                        <div key={notice._id} className={styles.noticeBox}>
                            <div className={styles.noticeHeader}>
                                <h3 className={styles.noticeAuthor}>{notice.createdBy}</h3>
                                <span className={styles.noticeDate}>
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className={styles.noticeContent}>
                                <p>{notice.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoticesPage;
