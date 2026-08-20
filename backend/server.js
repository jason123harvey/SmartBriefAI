import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import summarizeRoutes from './routes/summarize.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '50mb' })); // Allow large article texts
app.use(express.urlencoded({ limit: '50mb' }));

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*' 
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', summarizeRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendPath));
  
  // SPA fallback - serve index.html for any route not matching /api
  app.get('*', (req, res) => {
    // Don't intercept API requests
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An error occurred processing your request',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 SmartBrief AI Backend running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/health`);
});
