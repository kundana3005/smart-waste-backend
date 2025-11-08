const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const complaintController = require('../controllers/complaintController');

router.post('/create', auth, complaintController.createComplaint);
router.post('/clean_photo', auth, complaintController.uploadCleanPhoto);
// More: assign worker, status update, list complaints, etc.

module.exports = router;