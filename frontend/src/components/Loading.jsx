import React from 'react';

export default function Loading() {
  return (
    <div style={styles.container}>
      <div className="loader" style={styles.loader}></div>
      <p style={styles.text}>🤖 Analyzing your article with AI...</p>
      <p style={styles.subtitle}>This usually takes a few seconds...</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  loader: {
    marginBottom: '2rem',
  },
  text: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--text-dark)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-light)',
    fontSize: '1rem',
  },
};
