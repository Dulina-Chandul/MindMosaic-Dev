import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/auth/authRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin : process.env.CLIENT_URL,
  methods : ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders : ['Content-Type', 'Authorization'],
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const message = err.message || 'Something went wrong';
  const stack = err.stack || '';
  res.status(500).json({
    error : message,
    stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});