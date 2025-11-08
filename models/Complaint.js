const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
    complaintID: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: [Number], required: true }, // [lat, lng]
    beforePhoto: { type: String, required: true },
    afterPhoto: { type: String, default: null },
    assignedWorkerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', default: null },
    status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
    accuracyScore: { type: Number, default: null },
    timestamps: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        resolvedAt: { type: Date, default: null }
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);