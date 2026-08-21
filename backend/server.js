import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import summarizeRoutes from './routes/summarize.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS (Remove trailing slashes from origins)
const allowedOrigins = [
  'https://smartbriefai-786m.onrender.com', 
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true
}));

// Body Parsing Middleware
app.use(express.json({ limit: '50mb' })); // Allow large article texts
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Routes
app.use('/api', summarizeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An error occurred processing your request',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 SmartBrief AI Backend running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});