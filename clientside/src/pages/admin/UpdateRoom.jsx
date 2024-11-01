import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UpdateRoom.module.css'; // Optional: Create a CSS module for styling

const UpdateRoom = () => {
    const { id } = useParams(); // Get the room ID from the URL
    const [roomDetails, setRoomDetails] = useState({
        roomNo: '',
        capacity: '',
        allocatedTo: '',
        currentOccupants: 0,
        status: 'Available',
        roomType: 'Single',
        feesPerSemester: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [userResults, setUserResults] = useState([]); // Search results for users
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/rooms/${id}`);
                const data = await response.json();
                setRoomDetails(data);
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };
    // Search users based on the input
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

    const handleUserSelect = (user) => {
        setRoomDetails((prevDetails) => ({
            ...prevDetails,
            allocatedTo: user.username,
        }));
        setUserResults([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roomDetails)
            });

            if (response.ok) {
                alert('Room updated successfully!');
                navigate('/room-management'); // Redirect after successful update
            } else {
                alert('Error updating room. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Update Room</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="roomNo">Room Number</label>
                    <input type="text" id="roomNo" name="roomNo" value={roomDetails.roomNo} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" id="capacity" name="capacity" value={roomDetails.capacity} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="currentOccupants">Current Occupants</label>
                    <input type="number" id="currentOccupants" name="currentOccupants" value={roomDetails.currentOccupants} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={roomDetails.status} onChange={handleChange}>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                </div>
                {/* <div className={styles.formGroup}>
                    <label htmlFor="allocatedTo">Allocated To</label>
                    <input type="text" id="allocatedTo" name="allocatedTo" value={roomDetails.allocatedTo} onChange={handleChange} />
                </div> */}
                <div className={styles.formGroup}>
                    <label htmlFor="roomType">Room Type</label>
                    <select id="roomType" name="roomType" value={roomDetails.roomType} onChange={handleChange}>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Shared">Shared</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="feesPerSemester">Fees per Semester</label>
                    <input type="number" id="feesPerSemester" name="feesPerSemester" value={roomDetails.feesPerSemester} onChange={handleChange} required />
                </div>
                {/* searchhhhh students */}
                <div className={styles.formGroup}>
                    <label htmlFor="allocatedTo">Search and Allocate Student</label>
                    <input 
                        type="text" 
                        id="allocatedTo" 
                        name="allocatedTo" 
                        value={roomDetails.allocatedTo || searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    {userResults.length > 0 && (
                        <ul className={styles.searchResults}>
                            {userResults.map((user) => (
                                <li key={user._id} onClick={() => handleUserSelect(user)}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className={styles.btnPrimary}>Update Room</button>
            </form>
        </div>
    );
};

export default UpdateRoom;
