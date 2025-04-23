const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/store-user', userController.storeUser);

router.post('/delete-user', userController.deleteUser);

module.exports = router;
