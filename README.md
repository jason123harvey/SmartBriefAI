# 🚀 SmartBrief AI - Intelligent Article Summarizer

A modern, full-stack web application that uses Google Gemini AI to transform long articles into concise, actionable insights.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [How It Works](#how-it-works)
- [Future Improvements](#future-improvements)

---

## ✨ Features

### Core Features
- ✅ **Article Summarization**: AI-powered concise summaries of long articles
- 🏷️ **Keyword Extraction**: Identifies and displays important keywords as tags
- 📌 **Key Points Extraction**: Highlights the most important points from the article
- 📚 **Main Topics**: Identifies and lists major topics discussed in the article
- 📊 **Key Facts**: Extracts important facts, statistics, dates, and numbers
- 👨‍🎓 **Simplified Explanation**: Rewrites complex content in easy-to-understand language
- 🎯 **Detailed Summary**: Provides comprehensive summary in 1-2 paragraphs
- 💡 **Conclusions**: Displays the overall message and takeaway from the article

### Additional Features
- 📋 **Copy to Clipboard**: Copy any section with one click
- 📥 **Download**: Download summary as `.txt` file
- 🔄 **Regenerate**: Generate a new summary from the same article
- 📊 **Compression Statistics**: Shows how much text was condensed
- 🎨 **Modern UI**: Beautiful, responsive, professional design
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-time Word Count**: Displays word count as you type
- 🔗 **Backend Communication**: Secure API communication with backend

---

## 🛠️ Technology Stack

### Frontend
- **React.js** 18.2.0 - UI framework
- **Vite** 5.0+ - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18+ - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **@google/generative-ai** - Gemini API client

### AI
- **Google Gemini API** - Generative AI model for summarization

---

## 📁 Project Structure

```
smartbrief-ai/
│
├── backend/
│   ├── services/
│   │   └── geminiService.js       # Gemini API integration
│   ├── routes/
│   │   └── summarize.js           # API endpoints
│   ├── server.js                  # Express server setup
│   ├── package.json               # Backend dependencies
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example env file
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation component
│   │   │   ├── ArticleInput.jsx   # Article input form
│   │   │   ├── SummaryResult.jsx  # Results display
│   │   │   ├── Loading.jsx        # Loading state
│   │   │   ├── KeywordList.jsx    # Keywords display
│   │   │   └── ImportantPoints.jsx# Points display
│   │   ├── services/
│   │   │   └── api.js             # API communication
│   │   ├── App.jsx                # Main app component
│   │   ├── App.css                # App styles
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Entry point
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── .gitignore
│
└── README.md                      # This file
```

---

## 🔧 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Google Gemini API key

### Step 1: Clone or Setup Project

Navigate to your project folder:
```bash
cd smartbrief-ai
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Configuration

### Step 1: Obtain Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Select or create a new project
4. Copy your API key

### Step 2: Configure Environment Variables

#### Backend Configuration

Navigate to `backend/` directory and update `.env`:

```bash
cd backend
```

Edit `.env` file (or create it from `.env.example`):

```env
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
PORT=5000
NODE_ENV=development
```

**Replace `YOUR_ACTUAL_API_KEY_HERE` with your actual Gemini API key.**

Example `.env`:
```env
GEMINI_API_KEY=AIzaSyD-abc123xyz789...
PORT=5000
NODE_ENV=development
```

### Security Notes
- ✅ Never commit `.env` file to version control
- ✅ `.env` is already in `.gitignore`
- ✅ API key is kept securely on backend
- ✅ Frontend never has access to API key
- ✅ All AI communication happens through backend API

---

## 🚀 Running the Application

### Terminal Setup

Open **two separate terminals** (or terminal tabs):
- **Terminal 1**: Backend server
- **Terminal 2**: Frontend development server

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 SmartBrief AI Backend running on port 5000
API: http://localhost:5000/api/health
```

The backend will watch for file changes and auto-reload.

### Terminal 2: Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.8 ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173/
```

You should see the SmartBrief AI homepage with the hero section.

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check

**GET** `/api/health`

Check if backend is running.

**Response (200):**
```json
{
  "status": "Backend is running"
}
```

#### 2. Summarize Article

**POST** `/api/summarize`

Send an article for AI summarization.

**Request Body:**
```json
{
  "article": "Your long article text here..."
}
```

**Request Validation:**
- Article must be a string
- Minimum 100 characters
- Maximum 1MB

**Response (200 - Success):**
```json
{
  "success": true,
  "data": {
    "title": "Article Title",
    "shortSummary": "3-5 sentence summary...",
    "detailedSummary": "Longer summary paragraph...",
    "keywords": ["AI", "Technology", "Innovation"],
    "mainTopics": ["Topic 1", "Topic 2"],
    "importantPoints": ["Point 1", "Point 2"],
    "keyFacts": ["Fact 1", "Fact 2"],
    "simplifiedVersion": "Easy-to-understand explanation...",
    "conclusion": "Overall message...",
    "stats": {
      "originalWords": 1250,
      "summaryWords": 180,
      "reductionPercentage": 85
    }
  }
}
```

**Response (400 - Validation Error):**
```json
{
  "success": false,
  "message": "Please enter an article before summarizing."
}
```

**Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Failed to summarize article"
}
```

---

## 🔄 How It Works

### Complete Data Flow

```
┌─────────────────────────────────────────────────────┐
│  1. USER OPENS APPLICATION                          │
│     - Browser loads React app from Vite dev server  │
│     - App checks backend health (http://localhost:5000/api/health)
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  2. USER PASTES ARTICLE                             │
│     - React tracks word count in real-time          │
│     - Article stored in component state             │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  3. USER CLICKS "SUMMARIZE ARTICLE"                 │
│     - Frontend validates article (min 100 chars)    │
│     - Loading spinner appears                       │
│     - POST request sent to backend with article     │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  4. BACKEND PROCESSES REQUEST                       │
│     - Express receives POST /api/summarize          │
│     - Validation middleware checks article          │
│     - Request forwarded to Gemini Service           │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  5. GEMINI AI PROCESSES ARTICLE                     │
│     - System prompt provides instructions           │
│     - Gemini analyzes article content               │
│     - AI generates structured JSON response         │
│     - Response parsed and validated                 │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  6. BACKEND CALCULATES STATISTICS                   │
│     - Word count calculated                         │
│     - Compression percentage computed               │
│     - Stats added to response                       │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  7. FRONTEND RECEIVES RESPONSE                      │
│     - JSON response validated                       │
│     - Loading state cleared                         │
│     - Results stored in React state                 │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│  8. RESULTS DISPLAYED                               │
│     - Page scrolls to results section               │
│     - Multiple cards appear with animation          │
│     - User can copy, download, or regenerate        │
└─────────────────────────────────────────────────────┘
```

### Key Points

1. **Secure Communication**: API key stays on backend
2. **Real-time UI**: Word count updates as user types
3. **Error Handling**: User-friendly error messages
4. **Loading States**: Clear feedback during processing
5. **Modular Code**: Each component is independent
6. **Responsive Design**: Works on all screen sizes

---

## 💬 Testing with Sample Article

### Sample Article to Test

Copy and paste this article into SmartBrief AI:

```
Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century. AI systems are now capable of performing tasks that once required human intelligence, such as understanding natural language, recognizing images, and making complex decisions. Machine learning, a subset of AI, enables computers to learn from data without being explicitly programmed. Deep learning, which uses neural networks with multiple layers, has driven recent breakthroughs in computer vision and natural language processing.

The applications of AI are vast and growing. In healthcare, AI algorithms help diagnose diseases by analyzing medical images and patient data with unprecedented accuracy. In transportation, autonomous vehicles powered by AI are expected to revolutionize how people and goods move. In finance, AI systems detect fraudulent transactions and make investment decisions at speeds far exceeding human capability. In education, AI tutoring systems provide personalized learning experiences to students worldwide.

However, AI adoption also raises important concerns. Privacy issues arise as AI systems require vast amounts of data to function effectively. Job displacement in certain sectors is inevitable as automation replaces routine tasks. Bias in AI algorithms can perpetuate or amplify existing societal inequalities. Additionally, the lack of transparency in some AI models makes it difficult to understand how decisions are made, raising questions about accountability and trust.

The future of AI depends on how we address these challenges. Researchers are working on more explainable AI models that can justify their decisions. Policymakers are developing regulations to ensure AI is used responsibly and ethically. Technology companies are implementing fairness and bias mitigation techniques. As AI continues to evolve, society must work together to harness its benefits while minimizing potential harms.
```

### Expected Results

The AI should generate:
- **Summary**: ~100-150 words summarizing the key points
- **Keywords**: AI, Machine Learning, Deep Learning, Technology, Healthcare, Transportation, etc.
- **Main Topics**: Applications of AI, Concerns, Future prospects
- **Important Points**: Various breakthrough uses and challenges
- **Simplified Version**: Explanation suitable for high school students
- **Compression Stat**: ~75-85% reduction

---

## 🔌 Troubleshooting

### Issue: Cannot connect to backend

**Error Message**: "Cannot connect to backend. Make sure it's running on port 5000."

**Solutions**:
1. Check if backend server is running (`npm run dev` in backend folder)
2. Verify backend is on port 5000 in `.env`
3. Check Windows Firewall isn't blocking port 5000
4. Try visiting `http://localhost:5000/api/health` directly in browser

### Issue: "API key error" message

**Error Message**: "API configuration error. Please contact support."

**Solutions**:
1. Verify API key is correctly set in `backend/.env`
2. Check API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Ensure API key doesn't have extra spaces
4. Regenerate key if suspected to be compromised

### Issue: Request timeout

**Error Message**: "No response from server"

**Solutions**:
1. Increase timeout in `frontend/src/services/api.js` (currently 60s)
2. Try with shorter article first
3. Check internet connection
4. Verify Gemini API service is operational

### Issue: Frontend shows nothing

**Solutions**:
1. Check browser console for errors (F12)
2. Verify Vite dev server is running (`npm run dev` in frontend)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try different browser
5. Check http://localhost:5173 is accessible

---

## 🚀 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/dist/`

### Backend Production

```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

---

## 📚 Project Dependencies

### Backend
- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management
- `@google/generative-ai` - Gemini API client

### Frontend
- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client
- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool

---

## 🔮 Future Improvements

### Short Term
- [ ] Save summaries to localStorage
- [ ] Dark mode support
- [ ] Multiple language support
- [ ] Share summaries via link
- [ ] PDF download support

### Medium Term
- [ ] User authentication system
- [ ] Summary history and saved articles
- [ ] API for multiple AI providers (OpenAI, Claude)
- [ ] Rate limiting and usage tracking
- [ ] Email export functionality

### Long Term
- [ ] Web scraper integration (auto-fetch articles from URLs)
- [ ] Video transcript summarization
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Browser extension

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📞 Support

For issues, questions, or suggestions, please refer to the troubleshooting section or check the API documentation.

---

## 📝 Notes

- This application requires an active internet connection
- Gemini API has usage limits (check your Google Cloud account)
- Large articles (>50KB) may take longer to process
- The application automatically calculates word count reductions
- All summaries are generated fresh on each request

---

**Built with ❤️ using React, Node.js, and Google Gemini AI**
# SmartBriefAI
