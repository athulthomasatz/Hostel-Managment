import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './updateNotification.module.css'; // Create a CSS module for styles

const UpdateNotification = () => {
    const { id } = useParams();
    const [createdBy, setCreatedBy] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notification/${id}`);
                const data = await response.json();
                setCreatedBy(data.createdBy);
                setContent(data.content);
            } catch (error) {
                console.error('Error fetching notification:', error);
            }
        };

        fetchNotification();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/notification/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ createdBy, content }),
            });

            if (response.ok) {
                alert('Notification updated successfully!');
                navigate('/admin/notices'); // Redirect to notifications page after successful update
            } else {
                alert('Failed to update notification.');
            }
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Update Notification</h1>
            <form onSubmit={handleUpdate} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="createdBy">Created By:</label>
                    <input
                        type="text"
                        id="createdBy"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.btnPrimary}>Update Notification</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNotification;
