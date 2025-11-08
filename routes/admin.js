const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Only allow if req.user.role === 'Admin' in your middleware (or add a role check)
router.get('/dashboard', auth, adminController.getDashboard);
router.post('/assign', auth, adminController.assignComplaint);
router.get('/complaints', auth, adminController.listComplaints);

module.exports = router;