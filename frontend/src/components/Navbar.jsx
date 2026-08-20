import React from 'react';

export default function Navbar() {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        <div style={styles.logo}>
          <h2 style={styles.logoText}>🧠 SmartBrief AI</h2>
        </div>
        <ul style={styles.navLinks}>
          <li>
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              style={styles.link}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavClick(e, '#how-it-works')}
              style={styles.link}
            >
              How It Works
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, '#about')}
              style={styles.link}
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    background: 'white',
    borderBottom: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow)',
    zIndex: 100,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  logo: {
    flex: 1,
  },
  logoText: {
    fontSize: '1.5rem',
    backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
  },
  link: {
    color: 'var(--text-dark)',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
};
