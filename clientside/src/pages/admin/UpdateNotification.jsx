import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './updateNotification.module.css';
import BackButton from '../../components/BackButton';

const UpdateNotification = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        createdBy: '',
        content: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notification/${id}`);
                if (!response.ok) throw new Error('Failed to fetch notification');
                const data = await response.json();
                setFormData({
                    createdBy: data.createdBy,
                    content: data.content
                });
            } catch (error) {
                setError('Error loading notification. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotification();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/api/notification/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update notification');
            navigate('/admin/notices');
        } catch (error) {
            setError('Failed to update notification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className={styles.loadingState}>Loading...</div>;
    if (error) return <div className={styles.errorState}>{error}</div>;

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>Update Notice</h2>
                    <p>Edit the notice details below</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="createdBy">Author Name</label>
                        <input
                            type="text"
                            id="createdBy"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Notice Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
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
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Notice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNotification;
