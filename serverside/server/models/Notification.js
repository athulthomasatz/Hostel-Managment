const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    createdBy: { 
        type: String, // Username or admin name who created the notification
        required: true 
    },
    content: { 
        type: String, // The notification message/content
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now // Automatically set the date and time of creation
    },
    updatedAt: { 
        type: Date, 
        default: Date.now // Automatically set the date and time of update
    },
    readBy: { 
        type: [String], // Array of user IDs or usernames who have read the notification
        default: [] 
    }
});

// Create a pre-save hook to update the updatedAt field
notificationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
