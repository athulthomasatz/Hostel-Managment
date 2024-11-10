import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './editProfile.module.css';

const EditProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/api/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError("Failed to fetch profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);

        try {
            const response = await fetch('http://localhost:5000/auth/api/update-profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/profile');
        } catch (error) {
            console.error("Error updating profile data:", error);
            setError("Failed to update profile data");
        }
    };

    if (loading) return <div className={styles.loadingContainer}><Spinner animation="border" /></div>;
    if (error) return <div className={styles.errorContainer}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>Edit Profile</h2>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={profileData.username}
                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={() => navigate('/profile')} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
