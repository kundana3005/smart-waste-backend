const Complaint = require('../models/Complaint');

exports.myComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userID: req.user.id });
    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAccuracy = async (req, res) => {
  try {
    const { complaintID } = req.params;
    const complaint = await Complaint.findOne({ complaintID });
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });
    res.json({
      complaintID: complaint.complaintID,
      accuracyScore: complaint.accuracyScore,
      status: complaint.status,
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};