const express = require('express'); 
const router = express.Router();
const { getAdminDashboard ,adminLogin, verifyAuth, adminAuthMiddleware } = require('../../controllers/admin.controller');
// const { getAdminDashboard } = require('../../controllers/admin.controller');
// const { adminAuthMiddleware } = require('../../middleware/authm');
// const { verifyAuth } = require('../../middleware/authm')
// Corrected route path for admin dashboard
// router.post('/admin/login',adminLogin)
router.get('/dashboard',verifyAuth, adminAuthMiddleware, getAdminDashboard); 

module.exports = router;
