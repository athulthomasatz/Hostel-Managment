import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './addNotification.module.css';

const AddNotification = () => {
    const [createdBy, setCreatedBy] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ createdBy, content }),
            });

            if (response.ok) {
                navigate('/admin/notices');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create notification.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles.notificationCard}>
                <div className={styles.cardHeader}>
                    <h1>Create Notice</h1>
                    <p>Post a new notice for students</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="createdBy">Author Name</label>
                        <input
                            type="text"
                            id="createdBy"
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Notice Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your notice here..."
                            required
                            className={styles.textarea}
                            rows="6"
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin/notices')}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Posting...' : 'Post Notice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNotification;
