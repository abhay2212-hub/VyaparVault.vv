const express = require('express');
const router = express.Router();
const User = require('../services/userService');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Admin login using env credentials
// @route POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPass) {
            return res.status(500).json({ message: 'Admin credentials not configured on server' });
        }

        if (email === adminEmail && password === adminPass) {
            // Issue token with role=admin; id uses a fixed value 'admin'
            const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return res.json({ token, role: 'admin', email: adminEmail });
        }

        return res.status(401).json({ message: 'Invalid admin credentials' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Register a new user
// @route POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.getByEmail(email);

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.createUser({ username, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Auth user & get token
// @route POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getByEmail(email);

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
