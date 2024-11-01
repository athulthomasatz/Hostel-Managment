const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');  // Auth routes
const adminRoutes = require('./admin');  // Admin routes
// const usersRoutes = require('./users'); // Uncomment if user routes are ready
// const roomsRoutes = require('./rooms'); // Uncomment if room routes are ready
// const paymentsRoutes = require('./payments'); // Uncomment if payment routes are ready

// Use the routes with proper endpoints
router.use('/auth', authRoutes); 
router.use('/admin', adminRoutes); 
// router.use('/users', usersRoutes);
// router.use('/rooms', roomsRoutes);
// router.use('/payments', paymentsRoutes);

module.exports = router;
