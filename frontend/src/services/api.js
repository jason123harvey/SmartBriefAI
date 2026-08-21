import axios from 'axios';

// Fallback to '/api' for local dev (handled by Vite proxy), 
// but use VITE_API_BASE_URL in production (e.g. "https://your-backend.onrender.com/api")
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for AI processing
});

export async function summarizeArticle(articleText) {
  try {
    const response = await api.post('/summarize', {
      article: articleText,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to summarize article');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || 'Server error');
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from backend server. Please verify the API status.');
    } else {
      // Error in request setup
      throw new Error(error.message || 'An error occurred');
    }
  }
}

export async function checkBackendHealth() {
  try {
    const response = await api.get('/api/health');
    return response.data.status === 'Backend is running';
  } catch (error) {
    return false;
  }
}