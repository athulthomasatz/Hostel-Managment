import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../user/Modal';
import styles from './roommanage.module.css';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/rooms');
            if (!response.ok) throw new Error('Failed to fetch rooms');
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            setError('Error loading rooms. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setRoomToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${roomToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRooms(rooms.filter(room => room._id !== roomToDelete));
                setIsModalOpen(false);
            } else {
                throw new Error('Failed to delete room');
            }
        } catch (error) {
            setError('Error deleting room. Please try again.');
        }
    };

    if (loading) return <div className={styles.loadingState}>Loading rooms...</div>;
    if (error) return <div className={styles.errorState}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Room Management</h1>
                <Link to="/add-room" className={styles.addButton}>
                    Add New Room
                </Link>
            </div>

            <div className={styles.roomGrid}>
                {rooms.map(room => (
                    <div key={room._id} className={styles.roomCard}>
                        <div className={styles.roomHeader}>
                            <h3>Room {room.roomNo}</h3>
                            <span className={`${styles.statusBadge} ${styles[room.status.toLowerCase().replace(' ', '')]}`}>
                                {room.status}
                            </span>
                        </div>

                        <div className={styles.roomInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Capacity</span>
                                <span className={styles.value}>{room.capacity}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Current Occupants</span>
                                <span className={styles.value}>{room.currentOccupants}</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link 
                                to={`/update-room/${room._id}`} 
                                className={styles.updateButton}
                            >
                                Update
                            </Link>
                            <button 
                                onClick={() => handleDelete(room._id)} 
                                className={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this room?"
            />
        </div>
    );
};

export default RoomManagement;
