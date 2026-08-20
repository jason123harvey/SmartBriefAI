import React, { useState } from 'react';

export default function ArticleInput({ onSubmit, isLoading }) {
  const [article, setArticle] = useState('');
  const [error, setError] = useState('');

  const wordCount = article.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!article.trim()) {
      setError('Please enter an article before summarizing.');
      return;
    }

    if (article.trim().length < 100) {
      setError('Article must be at least 100 characters long.');
      return;
    }

    onSubmit(article);
  };

  const handleClear = () => {
    setArticle('');
    setError('');
  };

  return (
    <section id="article-input" className="section section-light">
      <div className="container">
        <h2 style={styles.heading}>📝 Paste Your Article</h2>
        <p style={styles.subtitle}>
          Paste a long article, research paper, news article, blog post, or study material here...
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div className="alert alert-error" style={styles.alert}>
              {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Paste your article, research paper, news article, blog post, or study material here..."
              disabled={isLoading}
              style={{
                ...styles.textarea,
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? 'not-allowed' : 'text',
              }}
            />
            <div style={styles.wordCountContainer}>
              <span style={styles.wordCount}>📊 Word Count: {wordCount}</span>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              disabled={isLoading || !article.trim()}
              className="btn btn-primary"
              style={{
                ...styles.submitBtn,
                opacity: isLoading || !article.trim() ? 0.6 : 1,
                cursor: isLoading || !article.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? (
                <>
                  <span className="loading">⏳</span>
                  Analyzing...
                </>
              ) : (
                <>
                  ✨ Summarize Article
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              className="btn btn-secondary"
              style={{
                ...styles.clearBtn,
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const styles = {
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: 'var(--text-light)',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: 'var(--shadow)',
  },
  alert: {
    marginBottom: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  textarea: {
    minHeight: '300px',
    fontFamily: 'monospace',
    fontSize: '0.95rem',
  },
  wordCountContainer: {
    marginTop: '0.75rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  wordCount: {
    fontSize: '0.9rem',
    color: 'var(--text-light)',
    fontWeight: 600,
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  submitBtn: {
    flex: 1,
    minWidth: '200px',
  },
  clearBtn: {
    flex: 1,
    minWidth: '200px',
  },
};
