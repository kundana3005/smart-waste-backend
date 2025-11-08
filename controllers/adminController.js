const Admin = require('../models/Admin');
const Worker = require('../models/Worker');
const Complaint = require('../models/Complaint');

exports.getDashboard = async (req, res) => {
  try {
    // Example: worker progress analytics
    const workers = await Worker.find();
    const complaints = await Complaint.find();

    const progress = workers.map(worker => {
      const assigned = complaints.filter(c => c.assignedWorkerID?.toString() === worker._id.toString());
      const completed = assigned.filter(a => a.status === "Resolved").length;
      return {
        workerID: worker.workerID,
        name: worker.name,
        totalAssigned: assigned.length,
        completed,
        pending: assigned.length - completed,
        performance: assigned.length > 0 ? Math.round((completed / assigned.length) * 100) : 0
      };
    });

    res.json({ workerProgress: progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign complaint to a worker
exports.assignComplaint = async (req, res) => {
  try {
    const { complaintID, workerID } = req.body;
    const complaint = await Complaint.findOne({ complaintID });
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    const worker = await Worker.findOne({ workerID });
    if (!worker) return res.status(404).json({ msg: 'Worker not found' });

    complaint.assignedWorkerID = worker._id;
    complaint.status = 'In Progress';
    await complaint.save();

    // TODO: send notification to worker

    res.json({ complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List/filter complaints
exports.listComplaints = async (req, res) => {
  const { status, workerID } = req.query;
  let filter = {};
  if(status) filter.status = status;
  if(workerID) {
    const worker = await Worker.findOne({ workerID });
    if(worker) filter.assignedWorkerID = worker._id;
  }
  const complaints = await Complaint.find(filter).populate('assignedWorkerID userID');
  res.json({ complaints });
};