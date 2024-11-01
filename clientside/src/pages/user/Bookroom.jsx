import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookRoom = () => {
    const { roomId } = useParams();  // Gets roomId from the URL
    console.log("Roommmmmmmmmmmmmmmmcompenennen: ", roomId);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [parentMobileNumber, setParentMobileNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/auth/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.username);  // Set the fetched username in the name field
                } else {
                    console.error("Failed to fetch user name");
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchUserName();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const bookingData = {
            roomId,
            name,
            mobileNumber,
            parentMobileNumber,
        };
        console.log("Booking Data:", bookingData);

        try {
            const response = await fetch('http://localhost:5000/auth/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Booking successful! Booking ID: ${data._id}`);
                setError('');
                // Optionally, reset the form
                setName('');
                setMobileNumber('');
                setParentMobileNumber('');
            } else {
                const errorData = await response.json();
                setError(`Error creating booking: ${errorData.message}`);
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred while booking the room. Please try again.');
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                // readOnly
                required
            />
            <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Your Mobile Number"
                required
            />
            <input
                type="text"
                value={parentMobileNumber}
                onChange={(e) => setParentMobileNumber(e.target.value)}
                placeholder="Parent Mobile Number"
                required
            />
            <button type="submit">Book Room</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default BookRoom;
