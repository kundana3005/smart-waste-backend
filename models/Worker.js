const mongoose = require('mongoose');
const workerSchema = new mongoose.Schema({
    workerID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: [Number], required: true }, // [lat, lng]
    approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);