import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../components/CSS/Dashboard.module.css';
import CategoryPieChart from '../components/CategoryPieChart';
import MonthlyChart from '../components/MonthlyBarChart';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [monthYear, setMonthYear] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log('ENV:', process.env.REACT_APP_API_URL);

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  const transactionsThisMonth = transactions.filter(tx => {
    const date = new Date(tx.date);
    const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return ym === monthYear;
  });

  const totalThisMonth = transactionsThisMonth
    .reduce((sum, tx) => sum + tx.amount, 0)
    .toFixed(2);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <div className={styles.controls}>
        <label htmlFor="monthPicker">Select Month:</label>
        <input
          type="month"
          id="monthPicker"
          value={monthYear}
          onChange={(e) => setMonthYear(e.target.value)}
          className={styles.monthInput}
        />
      </div>

      <div className={styles.summary}>
        <div className={styles.card}>
          <h3>Total Spent ({monthYear})</h3>
          <p>₹ {totalThisMonth}</p>
        </div>
      </div>

      <CategoryPieChart transactions={transactionsThisMonth} />
      <MonthlyChart transactions={transactions} />
      
    </div>
  );
}
