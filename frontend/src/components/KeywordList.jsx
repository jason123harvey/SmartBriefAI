import React from 'react';

export default function KeywordList({ keywords = [] }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="card" style={styles.card}>
      <h3 style={styles.heading}>🏷️ Important Keywords</h3>
      <div className="tag-container" style={styles.tagContainer}>
        {keywords.map((keyword, index) => (
          <span key={index} className="tag" style={styles.tag}>
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginBottom: '1.5rem',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  tag: {
    display: 'inline-block',
  },
};
