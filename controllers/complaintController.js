const Complaint = require('../models/Complaint');
const Worker = require('../models/Worker');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.createComplaint = async (req, res) => {
    try {
        const complaintID = 'CMP' + uuidv4().slice(0, 8); // Generate unique
        const { location, beforePhoto } = req.body;
        const newComplaint = new Complaint({
            complaintID, userID: req.user.id, location, beforePhoto
        });
        await newComplaint.save();
        res.status(201).json({ complaint: newComplaint });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.assignWorker = async (req, res) => {
    // Find nearest worker within 5km, assign, send notification...
};

exports.uploadCleanPhoto = async (req, res) => {
    try {
        const { complaintID, afterPhoto } = req.body;
        const complaint = await Complaint.findOne({ complaintID });
        if(!complaint) return res.status(404).json({ msg: 'Complaint not found' });
        complaint.afterPhoto = afterPhoto;
        complaint.status = "Resolved";
        complaint.timestamps.resolvedAt = new Date();
        // Call ML server to get accuracy score
        // Example: send POST to ML REST endpoint
        // const response = await axios.post('http://localhost:5000/api/accuracy', {
        //    before: complaint.beforePhoto, after: afterPhoto
        // });
        // complaint.accuracyScore = response.data.score;
        await complaint.save();
        res.json({ complaint });
    } catch (err) { res.status(500).json({ error: err.message }); }
};