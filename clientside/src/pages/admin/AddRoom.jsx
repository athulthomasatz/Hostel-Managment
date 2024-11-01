import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddRoom.module.css'; // Optional: Create a CSS module for styling
const AddRoom = () => {
    const [roomNo, setRoomNo] = useState('');
    const [capacity, setCapacity] = useState('');
    const [allocatedTo, setAllocatedTo] = useState(['']);
    const [amenities, setAmenities] = useState(['']);
    const [studentId, setStudentId] = useState(''); // For allocated student ID
    const [studentName, setStudentName] = useState(''); // For allocated student name
    const [roomType, setRoomType] = useState('Single');
    const [feesPerSemester, setFeesPerSemester] = useState('');
    const navigate = useNavigate();

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index] = value;
        setAmenities(updatedAmenities);
    };

    const addAmenityField = () => {
        setAmenities([...amenities, '']);
    };

    const removeAmenityField = (index) => {
        const updatedAmenities = amenities.filter((_, i) => i !== index);
        setAmenities(updatedAmenities);
    };
    const handleAllocatedToChange = (index, value) => {
        const updatedAllocatedTo = [...allocatedTo];
        updatedAllocatedTo[index] = value;
        setAllocatedTo(updatedAllocatedTo);
    };

    const addOccupantField = () => {
        setAllocatedTo([...allocatedTo, '']);
    };

    const removeOccupantField = (index) => {
        const updatedAllocatedTo = allocatedTo.filter((_, i) => i !== index);
        setAllocatedTo(updatedAllocatedTo);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const roomData = {
            roomNo,
            capacity: parseInt(capacity),
            amenities,
            roomType,
            feesPerSemester: parseFloat(feesPerSemester)
        };
        console.log("Room Data:", roomData); // Debug log

        try {
            const response = await fetch('http://localhost:5000/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roomData)
            });

            if (response.ok) {
                alert('Room created successfully!');
                navigate('/room-management');
            } else {
                alert('Error creating room. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Room</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="roomNo">Room Number</label>
                    <input type="text" id="roomNo" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="amenities">Amenities</label>
                    {amenities.map((amenity, index) => (
                        <div key={index} className={styles.amenityGroup}>
                            <input
                                type="text"
                                value={amenity}
                                onChange={(e) => handleAmenityChange(index, e.target.value)}
                                placeholder="Amenity"
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => removeAmenityField(index)}>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addAmenityField}>Add Amenity</button>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="roomType">Room Type</label>
                    <select id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Shared">Shared</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="feesPerSemester">Fees per Semester</label>
                    <input type="number" id="feesPerSemester" value={feesPerSemester} onChange={(e) => setFeesPerSemester(e.target.value)} required />
                </div>
                <button type="submit" className={styles.btnPrimary}>Create Room</button>
            </form>
        </div>
    );
};

export default AddRoom;
