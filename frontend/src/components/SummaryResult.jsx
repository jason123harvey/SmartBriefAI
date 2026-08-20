import React, { useState } from 'react';

export default function SummaryResult({ data, onRegenerate, isLoading }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!data) return null;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (format = 'txt') => {
    if (format === 'txt') {
      const content = generateTextContent();
      downloadFile(content, 'summary.txt', 'text/plain');
    }
  };

  const generateTextContent = () => {
    return `
SmartBrief AI - Article Summary
===============================

TITLE
${data.title}

SHORT SUMMARY
${data.shortSummary}

DETAILED SUMMARY
${data.detailedSummary}

KEY INSIGHTS
${data.importantPoints?.map(p => `• ${p}`).join('\n')}

KEYWORDS
${data.keywords?.join(', ')}

MAIN TOPICS
${data.mainTopics?.map(t => `• ${t}`).join('\n')}

KEY FACTS
${data.keyFacts?.map(f => `• ${f}`).join('\n')}

SIMPLIFIED VERSION
${data.simplifiedVersion}

CONCLUSION
${data.conclusion}

STATISTICS
Original Words: ${data.stats?.originalWords || 0}
Summary Words: ${data.stats?.summaryWords || 0}
Reduction: ${data.stats?.reductionPercentage || 0}%
    `.trim();
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const CopyButton = ({ text, label, index }) => (
    <button
      onClick={() => handleCopy(text, index)}
      className="btn btn-sm btn-secondary"
      style={styles.copyBtn}
    >
      {copiedIndex === index ? '✅ Copied!' : '📋 Copy'}
    </button>
  );

  return (
    <section id="results" className="section" style={styles.section}>
      <div className="container">
        <h2 style={styles.heading}>✨ Summary Results</h2>

        {/* Statistics */}
        {data.stats && (
          <div className="card" style={styles.statsCard}>
            <h3 style={styles.statsHeading}>📊 Compression Stats</h3>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>{data.stats.originalWords}</div>
                <div style={styles.statLabel}>Original Words</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>{data.stats.summaryWords}</div>
                <div style={styles.statLabel}>Summary Words</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>{data.stats.reductionPercentage}%</div>
                <div style={styles.statLabel}>Reduction</div>
              </div>
            </div>
            <div style={styles.progressBar}>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${data.stats.reductionPercentage}%`,
                  }}
                ></div>
              </div>
              <p style={styles.compressionText}>
                ✅ You reduced the article by <strong>{data.stats.reductionPercentage}%</strong>
              </p>
            </div>
          </div>
        )}

        {/* AI Summary */}
        <div className="card fade-in" style={styles.card}>
          <h3 style={styles.cardHeading}>🤖 AI Summary</h3>
          {data.title && <h4 style={styles.articleTitle}>{data.title}</h4>}
          <p style={styles.summaryText}>{data.shortSummary}</p>
          <CopyButton text={data.shortSummary} label="Copy Summary" index={0} />
        </div>

        {/* Key Insights */}
        {data.importantPoints && data.importantPoints.length > 0 && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>💡 Key Insights</h3>
            <ul style={styles.list}>
              {data.importantPoints.map((point, index) => (
                <li key={index} style={styles.listItem}>
                  {point}
                </li>
              ))}
            </ul>
            <CopyButton
              text={data.importantPoints.join('\n')}
              label="Copy Insights"
              index={1}
            />
          </div>
        )}

        {/* Keywords */}
        {data.keywords && data.keywords.length > 0 && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>🏷️ Important Keywords</h3>
            <div className="tag-container" style={styles.tagContainer}>
              {data.keywords.map((keyword, index) => (
                <span key={index} className="tag" style={styles.tag}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main Topics */}
        {data.mainTopics && data.mainTopics.length > 0 && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>📚 Main Topics</h3>
            <div className="tag-container" style={styles.tagContainer}>
              {data.mainTopics.map((topic, index) => (
                <span key={index} style={styles.topicTag}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Facts */}
        {data.keyFacts && data.keyFacts.length > 0 && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>📌 Key Facts</h3>
            <ul style={styles.list}>
              {data.keyFacts.map((fact, index) => (
                <li key={index} style={styles.listItem}>
                  {fact}
                </li>
              ))}
            </ul>
            <CopyButton text={data.keyFacts.join('\n')} label="Copy Facts" index={2} />
          </div>
        )}

        {/* Simplified Version */}
        {data.simplifiedVersion && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>👨‍🎓 Simplified Explanation</h3>
            <p style={styles.simplifiedText}>{data.simplifiedVersion}</p>
            <CopyButton
              text={data.simplifiedVersion}
              label="Copy Simplified Version"
              index={3}
            />
          </div>
        )}

        {/* Detailed Summary */}
        {data.detailedSummary && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>📖 Detailed Summary</h3>
            <p style={styles.detailedText}>{data.detailedSummary}</p>
            <CopyButton
              text={data.detailedSummary}
              label="Copy Detailed Summary"
              index={4}
            />
          </div>
        )}

        {/* Conclusion */}
        {data.conclusion && (
          <div className="card fade-in" style={styles.card}>
            <h3 style={styles.cardHeading}>🎯 Conclusion</h3>
            <p style={styles.conclusionText}>{data.conclusion}</p>
            <CopyButton text={data.conclusion} label="Copy Conclusion" index={5} />
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            onClick={() => handleDownload('txt')}
            className="btn btn-primary"
            style={styles.actionBtn}
          >
            📥 Download Summary (TXT)
          </button>
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="btn btn-secondary"
            style={styles.actionBtn}
          >
            🔄 Regenerate Summary
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: '2rem',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  statsCard: {
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #f0f4ff, #f5f3ff)',
  },
  statsHeading: {
    marginBottom: '1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'var(--text-light)',
    fontWeight: 600,
  },
  progressBar: {
    marginTop: '1rem',
  },
  compressionText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: 'var(--success-color)',
    fontWeight: 600,
  },
  card: {
    marginBottom: '1.5rem',
    animation: 'fadeIn 0.5s ease',
  },
  cardHeading: {
    marginBottom: '1rem',
    fontSize: '1.3rem',
  },
  articleTitle: {
    color: 'var(--primary-color)',
    marginBottom: '1rem',
    fontSize: '1.25rem',
  },
  summaryText: {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
    color: 'var(--text-dark)',
  },
  detailedText: {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
    color: 'var(--text-light)',
  },
  simplifiedText: {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
    color: 'var(--text-light)',
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    borderLeft: '4px solid var(--primary-color)',
  },
  conclusionText: {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
    color: 'var(--text-dark)',
    fontWeight: 500,
  },
  copyBtn: {
    marginTop: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '1rem 0',
  },
  listItem: {
    padding: '0.75rem 0',
    paddingLeft: '1.5rem',
    position: 'relative',
    color: 'var(--text-light)',
    borderBottom: '1px solid var(--border-color)',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  tag: {
    display: 'inline-block',
  },
  topicTag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    color: '#0369a1',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  actionBtn: {
    flex: 1,
    minWidth: '200px',
  },
};
