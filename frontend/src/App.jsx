import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArticleInput from './components/ArticleInput';
import SummaryResult from './components/SummaryResult';
import Loading from './components/Loading';
import { summarizeArticle, checkBackendHealth } from './services/api';
import './App.css';

function App() {
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendConnected, setBackendConnected] = useState(false);
  const [currentArticle, setCurrentArticle] = useState('');

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkBackendHealth();
      setBackendConnected(isConnected);
      if (!isConnected) {
        setError('⚠️ Cannot connect to backend. Make sure it\'s running on port 5000.');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSummarize = async (article) => {
    setIsLoading(true);
    setError('');
    setSummaryData(null);
    setCurrentArticle(article);

    try {
      if (!backendConnected) {
        throw new Error('Backend is not connected. Make sure the server is running on port 5000.');
      }

      const result = await summarizeArticle(article);
      setSummaryData(result.data);
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err.message || 'Failed to summarize article. Please try again.');
      console.error('Summarization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (currentArticle) {
      handleSummarize(currentArticle);
    }
  };

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="section" style={styles.heroSection}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroHeading}>🚀 Understand Any Article in Seconds</h1>
            <p style={styles.heroSubheading}>
              Paste a long article and let AI transform it into a concise summary, important keywords, and actionable insights.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                const element = document.getElementById('article-input');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              style={styles.heroBtn}
            >
              ✨ Start Summarizing
            </button>
          </div>
        </div>
      </section>

      {/* Connection Status */}
      {!backendConnected && (
        <div className="alert alert-warning" style={styles.connectionAlert}>
          <strong>⚠️ Backend Connection Issue:</strong> Make sure your Node.js backend is running on port 5000. Run <code>npm run dev</code> in the backend folder.
        </div>
      )}

      {error && !isLoading && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <div className="alert alert-error">
            {error}
          </div>
        </div>
      )}

      {/* Article Input Section */}
      <ArticleInput onSubmit={handleSummarize} isLoading={isLoading} />

      {/* Loading State */}
      {isLoading && <Loading />}

      {/* Results Section */}
      {summaryData && !isLoading && (
        <SummaryResult
          data={summaryData}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
        />
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="section section-light">
        <div className="container">
          <h2 style={styles.sectionHeading}>⚙️ How It Works</h2>
          <div className="grid grid-2" style={styles.processGrid}>
            <div className="card" style={styles.processCard}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.processTitle}>📝 Paste Your Article</h3>
              <p style={styles.processDesc}>Copy and paste any long article, research paper, or blog post into the text area.</p>
            </div>
            <div className="card" style={styles.processCard}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.processTitle}>🤖 AI Processing</h3>
              <p style={styles.processDesc}>Our AI analyzes your article and extracts key information automatically.</p>
            </div>
            <div className="card" style={styles.processCard}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.processTitle}>✨ Get Results</h3>
              <p style={styles.processDesc}>Receive a comprehensive summary with keywords, key facts, and simplified explanations.</p>
            </div>
            <div className="card" style={styles.processCard}>
              <div style={styles.stepNumber}>4</div>
              <h3 style={styles.processTitle}>📥 Download & Share</h3>
              <p style={styles.processDesc}>Copy, download, or regenerate your summary with just one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 style={styles.sectionHeading}>📚 About SmartBrief AI</h2>
          <div className="card" style={styles.aboutCard}>
            <p style={styles.aboutText}>
              <strong>SmartBrief AI</strong> is an intelligent article summarizer powered by Google Gemini API. It helps you:
            </p>
            <ul style={styles.aboutList}>
              <li>⚡ Save time by condensing long articles into brief summaries</li>
              <li>🎯 Extract key insights and important information</li>
              <li>🏷️ Identify keywords and main topics</li>
              <li>👨‍🎓 Understand complex content in simple language</li>
              <li>📊 Track how much content was compressed</li>
              <li>📥 Download and share summaries easily</li>
            </ul>
            <p style={styles.aboutText}>
              Perfect for students, professionals, researchers, and anyone who needs to quickly understand large amounts of text.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContent}>
          <p style={styles.footerText}>
            © 2024 SmartBrief AI. Powered by Google Gemini API.
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  heroSection: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    textAlign: 'center',
    paddingTop: '6rem',
    paddingBottom: '6rem',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroHeading: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
    color: 'white',
  },
  heroSubheading: {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  heroBtn: {
    fontSize: '1.1rem',
    padding: '1rem 2rem',
    background: 'white',
    color: '#6366f1',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  connectionAlert: {
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    marginTop: '1rem',
  },
  sectionHeading: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  processCard: {
    textAlign: 'center',
    position: 'relative',
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem',
  },
  processTitle: {
    marginBottom: '1rem',
  },
  processDesc: {
    color: 'var(--text-light)',
    lineHeight: '1.6',
  },
  aboutCard: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #f0f4ff, #f5f3ff)',
  },
  aboutText: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    color: 'var(--text-dark)',
  },
  aboutList: {
    marginLeft: '2rem',
    marginBottom: '1.5rem',
  },
  footer: {
    background: '#1e293b',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
    marginTop: '4rem',
  },
  footerContent: {
    padding: '1rem 0',
  },
  footerText: {
    color: '#94a3b8',
  },
};

export default App;
