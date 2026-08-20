import axios from 'axios';

// Determine API base URL based on environment
const getAPIBaseURL = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Development: use local backend
    return 'http://localhost:5000/api';
  }
  // Production: use same domain
  return '/api';
};

const API_BASE_URL = getAPIBaseURL();

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
      throw new Error('No response from server. Make sure backend is running on port 5000.');
    } else {
      // Error in request setup
      throw new Error(error.message || 'An error occurred');
    }
  }
}

export async function checkBackendHealth() {
  try {
    const response = await api.get('/health');
    return response.data.status === 'Backend is running';
  } catch (error) {
    return false;
  }
}
