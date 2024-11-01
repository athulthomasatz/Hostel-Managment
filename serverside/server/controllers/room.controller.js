// controllers/roomController.js
const Room = require('../models/Room'); // Adjust the path to your Room model
// Create a new room
exports.createRoom = async (req, res) => { 
    try {
        const room = new Room(req.body); 
        console.log("room controller room body",room);
        
        await room.save();
        res.status(201).json(room); // Respond with the created room
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation errors
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => { 
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms); // Respond with the list of rooms
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

// Get a room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' }); // Handle not found
        }
        res.status(200).json(room); // Respond with the room details
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

// Update room details
exports.updateRoomById = async (req, res) => {
    const { id } = req.params; // Get room ID from URL parameters
    const updatedRoomData = req.body; // Get updated room data from request body
    console.log(updatedRoomData);
    if (updatedRoomData.allocatedTo && typeof updatedRoomData.allocatedTo === 'string') {
        updatedRoomData.allocatedTo = {
            name: updatedRoomData.allocatedTo,
            userId: updatedRoomData.userId ? mongoose.Types.ObjectId(updatedRoomData.userId) : null, // Assuming userId is passed separately
        };
    }
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, updatedRoomData, { new: true }); // Update the room
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(updatedRoom); // Respond with the updated room
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: 'Failed to update room', error: error.message });
    }
};

// Delete a room by ID
exports.deleteRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' }); // Handle not found
        }
        res.status(204).send(); // Respond with no content on successful deletion
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};
