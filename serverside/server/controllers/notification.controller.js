const Notification = require('../models/Notification'); // Adjust the path as needed

// Create a new notification
exports.createNotification = async (req, res) => {
    const { createdBy, content } = req.body;
    try {
        const notification = new Notification({ createdBy, content });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: 'Error creating notification', error });
    }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }); // Get notifications sorted by createdAt
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// get notification with id
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a notification
exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { createdBy } = req.body;
    const { content } = req.body;
    try {
        const notification = await Notification.findByIdAndUpdate(id,{createdBy}, { content }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: 'Error updating notification', error });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};
