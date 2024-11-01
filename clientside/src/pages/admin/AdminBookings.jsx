import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
 
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

            // Update state to reflect the approved booking
            setBookings(bookings.map(booking => 
                booking._id === id ? { ...booking, status: 'confirmed' } : booking
            ));
        } catch (error) {
            console.error("Error approving booking:", error);
            setError("Failed to approve booking");
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <div>{error}</div>;

    return (
        <Container>
            <h2>Booked Rooms</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>User Name</th>
                        <th>Mobile Number</th>
                        <th>Booking Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.roomId.roomNo}</td>
                            <td>{booking.name}</td>
                            <td>{booking.mobileNumber}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td>
                                {booking.status === 'pending' && (
                                    <Button onClick={() => handleApprove(booking._id)}>Approve</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminBookings;
