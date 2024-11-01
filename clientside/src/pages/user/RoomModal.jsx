import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RoomModal = ({ show, onClose, room }) => {
    if (!room) return null; // Prevents rendering if no room data

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Room Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Room No:</strong> {room.roomNo}</p>
                <p><strong>Capacity:</strong> {room.capacity}</p>
                <p><strong>Current Occupants:</strong> {room.currentOccupants}</p>
                <p><strong>Status:</strong> {room.status}</p>
                <p><strong>Room Type:</strong> {room.roomType}</p>
                <p><strong>Allocated to:</strong> {room.allocatedTo?.name || 'None'}</p>
                <p><strong>Fees per Semester:</strong> {room.feesPerSemester}</p>
                <p><strong>Amenities:</strong> {room.amenities?.join(', ') || 'N/A'}</p>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="warning" onClick={onClose}>
                    Book
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoomModal;
