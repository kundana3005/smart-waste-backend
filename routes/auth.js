const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginWorker } = require('../controllers/authController');

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/worker/login', loginWorker);
// Add /admin/login for admin

module.exports = router;