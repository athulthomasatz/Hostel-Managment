import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomModal from './RoomModal';
import styles from './roomstatus.module.css';

const RoomStatus = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
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

    const getRoomStatusClass = (status) => {
        switch (status.toLowerCase()) {
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
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleBook = (room) => {
        navigate(`/book/${room._id}`, { state: { room } });
    };

    if (loading) return <div className={styles.loadingContainer}>Loading rooms...</div>;
    if (error) return <div className={styles.errorContainer}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Room Status</h2>
                <div className={styles.statusLegend}>
                    <span className={`${styles.legendItem} ${styles.available}`}>Available</span>
                    <span className={`${styles.legendItem} ${styles.maintenance}`}>Maintenance</span>
                    <span className={`${styles.legendItem} ${styles.notAvailable}`}>Not Available</span>
                </div>
            </div>

            <div className={styles.roomGrid}>
                {rooms.map((room) => (
                    <div 
                        key={room._id} 
                        className={`${styles.roomCard} ${getRoomStatusClass(room.status)}`}
                    >
                        <div className={styles.roomHeader}>
                            <h3>Room {room.roomNo}</h3>
                            <span className={styles.statusBadge}>{room.status}</span>
                        </div>
                        
                        <div className={styles.roomInfo}>
                            <p>Capacity: {room.capacity}</p>
                            <p>Current Occupants: {room.currentOccupants}</p>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button 
                                className={styles.viewButton}
                                onClick={() => handleViewMore(room)}
                            >
                                View Details
                            </button>
                            <button 
                                className={styles.bookButton}
                                onClick={() => handleBook(room)}
                                disabled={room.status.toLowerCase() !== 'available'}
                            >
                                Book Room
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <RoomModal show={showModal} onClose={handleCloseModal} room={selectedRoom} />
        </div>
    );
};

export default RoomStatus;
