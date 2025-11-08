const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Admin = require('../models/Admin');

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 10);
        const user = new User({ name, phone, password: hashedPw });
        await user.save();
        res.status(201).json({ user });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if(!user) return res.status(401).json({ msg: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(401).json({ msg: 'Invalid credentials' });
        const token = signToken({ id: user._id, role: 'User' });
        res.json({ token, user });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Similar for Worker, Admin
// Example for worker:
exports.loginWorker = async (req, res) => {
    try {
        const { workerID, password } = req.body;
        const worker = await Worker.findOne({ workerID });
        if(!worker || !worker.approved) return res.status(401).json({ msg: 'Invalid/Unapproved' });
        const valid = await bcrypt.compare(password, worker.password);
        if(!valid) return res.status(401).json({ msg: 'Invalid credentials' });
        const token = signToken({ id: worker._id, role: 'Worker' });
        res.json({ token, worker });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Do similarly for Admin!