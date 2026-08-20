import express from 'express';
import { summarizeArticle } from '../services/geminiService.js';

const router = express.Router();

// Validation middleware
function validateArticle(req, res, next) {
  const { article } = req.body;

  if (!article) {
    return res.status(400).json({
      success: false,
      message: 'Article text is required'
    });
  }

  if (typeof article !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Article must be a string'
    });
  }

  if (article.trim().length < 100) {
    return res.status(400).json({
      success: false,
      message: 'Article must be at least 100 characters long'
    });
  }

  if (article.length > 1000000) {
    return res.status(413).json({
      success: false,
      message: 'Article exceeds maximum length (1MB)'
    });
  }

  next();
}

// POST /api/summarize
router.post('/summarize', validateArticle, async (req, res) => {
  try {
    const { article } = req.body;

    console.log(`📝 Received article for summarization (${article.length} characters)`);

    const result = await summarizeArticle(article);

    // Calculate word counts
    const originalWords = article.split(/\s+/).filter(word => word.length > 0).length;
    const summaryWords = result.data.shortSummary.split(/\s+/).filter(word => word.length > 0).length;
    const reductionPercentage = Math.round(
      ((originalWords - summaryWords) / originalWords) * 100
    );

    res.json({
      success: true,
      data: {
        ...result.data,
        stats: {
          originalWords,
          summaryWords,
          reductionPercentage
        }
      }
    });

    console.log(`✅ Summary generated successfully`);
  } catch (error) {
    console.error('Summarize endpoint error:', error.message);

    // Determine appropriate status code
    let statusCode = 500;
    let userMessage = 'Failed to summarize article';

    if (error.message.includes('API key')) {
      statusCode = 500;
      userMessage = 'API configuration error. Please contact support.';
    } else if (error.message.includes('empty')) {
      statusCode = 400;
      userMessage = 'Please enter an article before summarizing.';
    } else if (error.message.includes('exceeds')) {
      statusCode = 413;
      userMessage = 'Article is too large. Please provide a shorter article.';
    } else if (error.message.includes('Invalid response')) {
      statusCode = 500;
      userMessage = 'AI service returned an invalid response. Please try again.';
    }

    res.status(statusCode).json({
      success: false,
      message: userMessage
    });
  }
});

export default router;
