import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UpdateRoom.module.css';

const UpdateRoom = () => {
    const { id } = useParams();
    const [roomDetails, setRoomDetails] = useState({
        roomNo: '',
        capacity: '',
        allocatedTo: '',
        currentOccupants: 0,
        status: 'Available',
        roomType: 'Single',
        feesPerSemester: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userResults, setUserResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/rooms/${id}`);
                if (!response.ok) throw new Error('Failed to fetch room details');
                const data = await response.json();
                setRoomDetails(data);
            } catch (error) {
                setError('Error loading room details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [id]);

    useEffect(() => {
        if (searchTerm) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/auth/api/getusers?search=${searchTerm}`);
                    const users = await response.json();
                    setUserResults(users);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        } else {
            setUserResults([]);
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserSelect = (user) => {
        setRoomDetails(prev => ({
            ...prev,
            allocatedTo: user.username,
        }));
        setUserResults([]);
        setSearchTerm('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomDetails)
            });

            if (!response.ok) throw new Error('Failed to update room');
            navigate('/room-management');
        } catch (error) {
            setError('Failed to update room. Please try again.');
        }
    };

    if (loading) return <div className={styles.loadingState}>Loading room details...</div>;
    if (error) return <div className={styles.errorState}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>Update Room {roomDetails.roomNo}</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="roomNo">Room Number</label>
                            <input
                                type="text"
                                id="roomNo"
                                name="roomNo"
                                value={roomDetails.roomNo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={roomDetails.capacity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="currentOccupants">Current Occupants</label>
                            <input
                                type="number"
                                id="currentOccupants"
                                name="currentOccupants"
                                value={roomDetails.currentOccupants}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="status">Status</label>
                            <select 
                                id="status" 
                                name="status" 
                                value={roomDetails.status} 
                                onChange={handleChange}
                            >
                                <option value="Available">Available</option>
                                <option value="Occupied">Occupied</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="roomType">Room Type</label>
                            <select 
                                id="roomType" 
                                name="roomType" 
                                value={roomDetails.roomType} 
                                onChange={handleChange}
                            >
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Shared">Shared</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="feesPerSemester">Fees per Semester</label>
                            <input
                                type="number"
                                id="feesPerSemester"
                                name="feesPerSemester"
                                value={roomDetails.feesPerSemester}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="allocatedTo">Search and Allocate Student</label>
                        <input 
                            type="text"
                            id="allocatedTo"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for student..."
                        />
                        {userResults.length > 0 && (
                            <ul className={styles.searchResults}>
                                {userResults.map((user) => (
                                    <li 
                                        key={user._id} 
                                        onClick={() => handleUserSelect(user)}
                                        className={styles.searchResultItem}
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            onClick={() => navigate('/room-management')}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Update Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRoom;
