const Worker = require('../models/Worker');
const Complaint = require('../models/Complaint');

exports.assignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedWorkerID: req.user.id });
    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.nearbyComplaints = async (req, res) => {
  try {
    // Example: assumes you have location from worker profile
    const worker = await Worker.findById(req.user.id);
    if (!worker) return res.status(404).json({ msg: 'Worker not found' });
    const workerLoc = worker.location;

    // Find complaints within 5km radius (Haversine formula simplified)
    const complaints = await Complaint.find({ status: 'Pending' });
    const withinRadius = complaints.filter(c => {
      if (!c.location) return false;
      const [lat1, lon1] = workerLoc;
      const [lat2, lon2] = c.location;
      const toRad = x => x * Math.PI / 180;
      const R = 6371; // Earth's radius (km)
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const cval = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * cval;
      return distance <= 5;
    });
    res.json({ complaints: withinRadius });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};