// In controllers/userController.js
const User = require("../models/User");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("Profile : ",userId);
        
        const user = await User.findById(userId).select("username email"); // Fetch user details
        const booking = await Booking.findOne({ userId }).populate("roomId"); // Fetch the user's booking

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            username: user.username,
            email: user.email,
            bookingDetails: booking ? {
                roomNo: booking.roomId.roomNo,
                bookingStatus: booking.status,
                feesPerSemester: booking.roomId.feesPerSemester
            } : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching profile data." });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from token
        const { username, email } = req.body; // Get updated data from request body

        console.log("email : ", email);
        
        // Update user details in the database without profilePhoto
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email }, // Remove profilePhoto from the update
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            username: updatedUser.username,
            email: updatedUser.email,
            profilePhoto: updatedUser.profilePhoto // Send the updated profile photo back, if needed
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating profile data." });
    }
};
