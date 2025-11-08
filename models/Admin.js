const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    adminID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: [Number], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);