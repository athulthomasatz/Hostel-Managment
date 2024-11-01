const express = require('express');
const adminRoutes = require('./api/admin');
const authRoutes = require('./api/auth');

const router = express.Router();

// Use API routes under /api
// router.use('/api/admin', adminRoutes);
// router.use('/api/auth', authRoutes); 

// Handle 404 for any other routes
router.use((req, res) => {
  res.status(404).json('No route found !!!!!');
});

module.exports = router;
