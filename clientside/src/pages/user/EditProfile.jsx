import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
        // Profile photo handling is removed

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

            navigate('/profile'); // Redirect to the profile page after successful update
        } catch (error) {
            console.error("Error updating profile data:", error);
            setError("Failed to update profile data");
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <div>{error}</div>;

    return (
        <Container>
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Update Profile</Button>
            </Form>
        </Container>
    );
};

export default EditProfile;
