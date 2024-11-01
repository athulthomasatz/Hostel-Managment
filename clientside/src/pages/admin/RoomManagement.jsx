import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './roommanage.module.css';
import Modal from '../user/Modal'; // Import the Modal component

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = (id) => {
        setRoomToDelete(id);
        setIsModalOpen(true); // Open the modal when delete is initiated
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${roomToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRooms(rooms.filter(room => room._id !== roomToDelete)); // Remove the deleted room from state
                setIsModalOpen(false); // Close the modal
            } else {
                alert('Error deleting room. Please try again.');
                setIsModalOpen(false); // Close the modal
            }
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('An error occurred. Please try again.');
            setIsModalOpen(false); // Close the modal
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Room Management</h1>
            <div className="mb-3">
                <Link to="/add-room" className={styles.btnPrimary}>Add New Room</Link>
            </div>
            <div className={styles.table}>
                <table className="table table-bordered table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Room No</th>
                            <th>Capacity</th>
                            <th>Current Occupants</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room._id}>
                                <td>{room.roomNo}</td>
                                <td>{room.capacity}</td>
                                <td>{room.currentOccupants}</td>
                                <td>{room.status}</td>
                                <td>
                                    <Link to={`/update-room/${room._id}`} className={styles.btnUpdate}>Update</Link>
                                    <button onClick={() => handleDelete(room._id)} className={styles.btnDelete}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal for delete confirmation */}
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
