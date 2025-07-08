import React from 'react';
import styles from './CSS/DashboardCards.module.css';

export default function DashboardCards({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recent = transactions.slice(-3).reverse();

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <h3>Total Expenses</h3>
        <p>${total.toFixed(2)}</p>
      </div>
      <div className={styles.card}>
        <h3>Recent Transactions</h3>
        <ul>
          {recent.map(t => (
            <li key={t._id}>{t.description} - ${t.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
