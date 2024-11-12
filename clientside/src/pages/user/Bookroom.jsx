import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './bookroom.module.css';

const BookRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        parentMobileNumber: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserName = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/auth/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(prevState => ({ ...prevState, name: data.username }));
                } else {
                    console.error("Failed to fetch user name");
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchUserName();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const token = localStorage.getItem('token');
        const bookingData = { ...formData, roomId };

        try {
            const response = await fetch('http://localhost:5000/auth/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Booking successful! Booking ID: ${data._id}`);
                setTimeout(() => navigate('/dashboard'), 3000); // Redirect after 3 seconds
            } else {
                setError(data.message || 'Error creating booking');
            }
        } catch (error) {
            setError('An error occurred while booking the room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Book a Room</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="mobileNumber">Your Mobile Number</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Your Mobile Number"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="parentMobileNumber">Parent Mobile Number</label>
                    <input
                        type="tel"
                        id="parentMobileNumber"
                        name="parentMobileNumber"
                        value={formData.parentMobileNumber}
                        onChange={handleChange}
                        placeholder="Parent Mobile Number"
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Booking...' : 'Book Room'}
                </button>
            </form>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default BookRoom;
