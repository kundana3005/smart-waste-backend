const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const workerController = require('../controllers/workerController');

router.get('/assigned', auth, workerController.assignedComplaints);
router.get('/nearby', auth, workerController.nearbyComplaints);

module.exports = router;