import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
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

    const handleEditClick = () => {
        navigate('/edit-profile');
    };

    if (loading) return <div className={styles.loadingContainer}><Spinner animation="border" /></div>;
    if (error) return <div className={styles.errorContainer}>{error}</div>;

    const profilePhotoUrl = profileData.profilePhoto
        ? `http://localhost:5000/${profileData.profilePhoto}`
        : 'http://localhost:5000/public/images/AvatarProfile.png';

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <h2>Profile Information</h2>
                    <Button 
                        variant="primary" 
                        onClick={handleEditClick}
                        className={styles.editButton}
                    >
                        Edit Profile
                    </Button>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.photoSection}>
                        <img 
                            src={profilePhotoUrl} 
                            alt={`${profileData.username}'s Profile`}
                            className={styles.profilePhoto}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoItem}>
                            <label>Name</label>
                            <span>{profileData.username}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Email</label>
                            <span>{profileData.email}</span>
                        </div>
                    </div>

                    {profileData.bookingDetails && (
                        <div className={styles.bookingSection}>
                            <h3>Booking Details</h3>
                            <div className={styles.infoItem}>
                                <label>Room No</label>
                                <span>{profileData.bookingDetails.roomNo}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Status</label>
                                <span className={styles.bookingStatus}>
                                    {profileData.bookingDetails.bookingStatus}
                                </span>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Fees per Semester</label>
                                <span>₹{profileData.bookingDetails.feesPerSemester}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
