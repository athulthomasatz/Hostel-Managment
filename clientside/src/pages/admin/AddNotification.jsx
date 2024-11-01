import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './addNotification.module.css'; // Create a CSS module for styles

const AddNotification = () => {
    const [createdBy, setCreatedBy] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ createdBy, content }),
            });

            if (response.ok) {
                alert('Notification created successfully!');
                navigate('/admin/notices'); // Redirect to notifications page after successful creation
            } else {
                alert('Failed to create notification.');
            }
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Add New Notification</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                    <button type="submit" className={styles.btnPrimary}>Create Notification</button>
                </div>
            </form>
        </div>
    );
};

export default AddNotification;
