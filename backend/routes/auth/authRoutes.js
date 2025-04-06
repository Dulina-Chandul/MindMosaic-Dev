import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../../controllers/auth/authController.js';
import authenticate from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('username').notEmpty().withMessage('Username is required'),
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    login
);

// Protected routes
router.get('/me', authenticate, (req, res) => {
    res.json({
        success: true,
        message: 'Profile fetched successfully',
        from: 'authRoutes.js',
        data: {
            user: req.user
        }
    });
});

export default router;