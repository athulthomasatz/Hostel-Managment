const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const userRoutes = require("./server/routes/api/auth");//user routes for login register
const adminRoutes = require('./server/routes/api/admin');
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./server/config/connection");
const routes = require('./server/routes');
const verifyAuth = require('./server/middleware/authm');
const userController = require('./server/controllers/user.controller');
const adminController = require('./server/controllers/admin.controller');
const roomController = require('./server/controllers/room.controller');
const notifiController = require('./server/controllers/notification.controller');
const bookController = require('./server/controllers/booking.controller');
const profileController = require('./server/controllers/profile.controller');
 // Import your routes
const app = express();
const port = process.env.PORT || 5000; 
// app.use(bodyParser.json());

// Middleware
// app.use(cors());
// const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials if necessary
}));
app.use('/public', express.static(path.join(__dirname, 'server', 'public')));
app.use(express.json()); 

//User Routes
app.post('/auth/api/register', userController.register); 
app.post('/auth/api/login',userController.login);
app.get('/auth/api/notice',notifiController.getNotifications);
app.post('/auth/api/book',verifyAuth,bookController.bookRoom); 
app.get('/auth/api/getusers',userController.searchUsers); 
app.get('/auth/api/profile',verifyAuth,profileController.getUserProfile);
app.put('/auth/api/update-profile', verifyAuth, profileController.updateUserProfile);
// Admin Routes
app.post('/admin/api/login',adminController.adminLogin);
app.get('/admin/dashboard',adminController.getAdminDashboard);
app.post('/api/rooms', roomController.createRoom); // Create a new room
app.get('/api/rooms', roomController.getAllRooms); // Get all rooms
app.get('/api/rooms/:id', roomController.getRoomById); // Get a specific room by ID
app.put('/api/rooms/:id', roomController.updateRoomById); // Update a specific room by ID
app.delete('/api/rooms/:id', roomController.deleteRoomById); // Delete a specific room by ID
app.get('/api/notification',notifiController.getNotifications);// 
app.get('/api/notification/:id',notifiController.getNotificationById);
app.post('/api/notification',notifiController.createNotification); 
app.put('/api/notification/:id',notifiController.updateNotification);
app.delete('/api/notification/:id',notifiController.deleteNotification);
app.get('/api/bookings',verifyAuth,bookController.getAllBookings);
app.put('/api/bookings/:id/approve', bookController.approveBooking);
// app.use("/api", routes);
// app.use('/admin/api', adminRoutes); // Ensure this matches your API structure
// Connection with MongoDB
connectDB().catch((err) => console.error("Database connection error:", err));

// Writes logs into a file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

morgan.token("type", (req, res) => { 
  return req.headers["content-type"];
});

// Globally use morgan
app.use(
  morgan(
    ":method :res[content-length] :url :status :response-time ms :date[web] :type",
    { stream: accessLogStream }
  )
);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});


// app.use(routes);
// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
