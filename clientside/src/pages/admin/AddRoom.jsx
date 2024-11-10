import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddRoom.module.css';

const AddRoom = () => {
    const [roomDetails, setRoomDetails] = useState({
        roomNo: '',
        capacity: '',
        amenities: [''],
        roomType: 'Single',
        feesPerSemester: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityChange = (index, value) => {
        const newAmenities = [...roomDetails.amenities];
        newAmenities[index] = value;
        setRoomDetails(prev => ({
            ...prev,
            amenities: newAmenities
        }));
    };

    const addAmenityField = () => {
        setRoomDetails(prev => ({
            ...prev,
            amenities: [...prev.amenities, '']
        }));
    };

    const removeAmenityField = (index) => {
        if (roomDetails.amenities.length > 1) {
            setRoomDetails(prev => ({
                ...prev,
                amenities: prev.amenities.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/rooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...roomDetails,
                    capacity: parseInt(roomDetails.capacity),
                    feesPerSemester: parseFloat(roomDetails.feesPerSemester)
                })
            });

            if (!response.ok) throw new Error('Failed to create room');
            navigate('/room-management');
        } catch (error) {
            setError('Failed to create room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>Add New Room</h2>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

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

                    <div className={styles.amenitiesSection}>
                        <label>Amenities</label>
                        {roomDetails.amenities.map((amenity, index) => (
                            <div key={index} className={styles.amenityGroup}>
                                <input
                                    type="text"
                                    value={amenity}
                                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                                    placeholder="Enter amenity"
                                />
                                {roomDetails.amenities.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeAmenityField(index)}
                                        className={styles.removeButton}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={addAmenityField}
                            className={styles.addButton}
                        >
                            Add Amenity
                        </button>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            onClick={() => navigate('/room-management')}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;
