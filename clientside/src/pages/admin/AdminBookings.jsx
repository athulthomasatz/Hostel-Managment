import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import styles from './adminBookings.module.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/bookings', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${id}/approve`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setBookings(bookings.map(booking => 
                booking._id === id ? { ...booking, status: 'confirmed' } : booking
            ));
        } catch (error) {
            console.error("Error approving booking:", error);
            setError("Failed to approve booking");
        }
    };

    if (loading) return (
        <div className={styles.loadingContainer}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    if (error) return (
        <div className={styles.errorContainer}>
            <div className={styles.errorMessage}>{error}</div>
        </div>
    );

    return (
        <Container className={styles.container}>
            <div className={styles.header}>
                <h2>Booked Rooms</h2>
                <p>{bookings.length} total bookings</p>
            </div>

            <div className={styles.bookingsContainer}>
                {bookings.map((booking) => (
                    <div key={booking._id} className={styles.bookingCard}>
                        <div className={styles.bookingHeader}>
                            <span className={styles.roomNumber}>Room {booking.roomId.roomNo}</span>
                            <span className={`${styles.status} ${styles[booking.status]}`}>
                                {booking.status}
                            </span>
                        </div>
                        
                        <div className={styles.bookingDetails}>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Student Name:</span>
                                <span className={styles.value}>{booking.name}</span>
                            </div>
                            
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Mobile:</span>
                                <span className={styles.value}>{booking.mobileNumber}</span>
                            </div>
                            
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Booking Date:</span>
                                <span className={styles.value}>
                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {booking.status === 'pending' && (
                            <button 
                                className={styles.approveButton}
                                onClick={() => handleApprove(booking._id)}
                            >
                                Approve Booking
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <div className={styles.noBookings}>
                    No bookings found
                </div>
            )}
        </Container>
    );
};

export default AdminBookings;
