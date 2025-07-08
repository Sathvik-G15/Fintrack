import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CSS/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>FinTrack</div>
      <ul className={styles.links}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/budgets">Budgets</Link></li>
      </ul>
    </nav>
  );
}
