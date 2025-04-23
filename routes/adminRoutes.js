const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.login);

// Middleware to verify token
// router.use(adminController.verifyToken);

// Route to create a new admin (only accessible to already logged-in admins)
router.post('/create', adminController.createAdmin);

// Route to get users (protected)
router.get('/users', adminController.getUsers);

module.exports = router;
