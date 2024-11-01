const mongoose = require('mongoose');
 
const bookSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', // Assuming you have a Room model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    parentMobileNumber: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'], // You can adjust these statuses as needed
        default: 'pending',
    },
});

const Booking = mongoose.model('Booking', bookSchema);

module.exports = Booking;
