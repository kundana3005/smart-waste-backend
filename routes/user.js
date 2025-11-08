const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/complaints', auth, userController.myComplaints);
router.get('/accuracy/:complaintID', auth, userController.getAccuracy);

module.exports = router;