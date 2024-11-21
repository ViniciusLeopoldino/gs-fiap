import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <b>&copy; 2024 Porto Auto-Check</b>
    </footer>
  );
};

export default Footer;
