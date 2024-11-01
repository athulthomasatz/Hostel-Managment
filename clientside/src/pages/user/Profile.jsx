import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

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
        navigate('/edit-profile'); // Navigate to the edit profile page
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <div>{error}</div>;
    // Construct the profile photo URL
    // const profilePhotoUrl = `http://localhost:5000/public/images/profileathul.jpeg`;

    const profilePhotoUrl = profileData.profilePhoto
        ? `http://localhost:5000/${profileData.profilePhoto}`
        : 'http://localhost:5000/public/images/AvatarProfile.png'; // Adjust with your default image URL
    return (
        <Container>
            <h2>Profile</h2>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            {/* Display the profile photo */}
                            <img 
                                src={profilePhotoUrl} 
                                alt={`${profileData.username}'s Profile`}
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                            />
                            <p><strong>Name:</strong> {profileData.username}</p>
                            <p><strong>Email:</strong> {profileData.email}</p>

                            {profileData.bookingDetails ? (
                                <>
                                    <h3>Booking Details</h3>
                                    <p><strong>Room No:</strong> {profileData.bookingDetails.roomNo}</p>
                                    <p><strong>Booking Status:</strong> {profileData.bookingDetails.bookingStatus}</p>
                                    <p><strong>Fees per Semester:</strong> {profileData.bookingDetails.feesPerSemester}</p>
                                </>
                            ) : (
                                <p>No booking found</p>
                            )}

                            <Button variant="primary" onClick={handleEditClick}>Edit Profile</Button> {/* Edit Button */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
