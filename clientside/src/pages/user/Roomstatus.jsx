import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RoomModal from '../user/RoomModal'; // Adjust the path if needed

import styles from './roomstatus.module.css'; // Assuming you have a CSS module for styling

const RoomStatus = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedRoom, setSelectedRoom] = useState(null); // State to store selected room details
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const getRoomClass = (status) => {
        switch (status) {
            case 'available':
                return styles.available;
            case 'maintenance':
                return styles.maintenance;
            case 'not available':
                return styles.notAvailable;
            default:
                return '';
        }
    };

    const handleViewMore = (room) => {
        console.log('Selected Room:', room);
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleBook = (room) => {
        console.log(`Booking room ${room}`);
        navigate(`/book/${room._id}`, { state: { room } });
    };

    if (loading) return <div>Loading rooms...</div>;
    if (error) return <div>Error fetching rooms: {error}</div>;

    return (
        <div>
            <h2>Room Status</h2>
            <div className={styles.roomContainer}>
                {rooms.map((room) => (
                    <div key={room._id} className={`${styles.roomCard} ${getRoomClass(room.status)}`}>
                        <h3 className={styles.roomTitle}>Room No: {room.roomNo}</h3>
                        <p className={styles.roomInfo}>Capacity: {room.capacity}</p>
                        <p className={styles.roomInfo}>Current Occupants: {room.currentOccupants}</p>
                        <p className={styles.roomInfo}>Status: {room.status}</p>
                        <button className={styles.button} onClick={() => handleViewMore(room)}>View More</button>
                        <button className={styles.button} onClick={() => handleBook(room)}>Book</button>
                        
                    </div>
                ))}
            </div>
            {/* Render the RoomModal and pass the selected room data */}
            <RoomModal show={showModal} onClose={handleCloseModal} room={selectedRoom} />
        </div>
    );
};
export default RoomStatus;
