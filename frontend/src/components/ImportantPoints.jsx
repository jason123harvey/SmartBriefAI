import React from 'react';

export default function ImportantPoints({ points = [] }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="card" style={styles.card}>
      <h3 style={styles.heading}>📌 Important Points</h3>
      <ul style={styles.list}>
        {points.map((point, index) => (
          <li key={index} style={styles.listItem}>
            {point}
          </li>
        ))}
      </ul>
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
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    padding: '0.75rem 0',
    paddingLeft: '2rem',
    position: 'relative',
    color: 'var(--text-light)',
    borderBottom: '1px solid var(--border-color)',
  },
};
