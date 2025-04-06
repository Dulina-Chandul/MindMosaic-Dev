import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../../models/User.js';

// Register controller
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, username } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ email, password, username });
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const token = jwt.sign({ userId: user._id, }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ 
            success: true,
            message: 'User registered successfully',
            from : 'authController.js',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                },
            },
         });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Server error',
            from : 'authController.js',
            error: error.message,
         });
    }
};

// Login controller
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ 
            success: true,
            message: 'User logged in successfully',
            from : 'authController.js',
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                },
            },
         });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            from : 'authController.js',
            error: error.message,
        });
    }
};