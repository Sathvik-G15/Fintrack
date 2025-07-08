import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './CSS/MonthlyBarChart.module.css';

export default function MonthlyBarChart({ transactions }) {
  const monthlyTotals = {};

  transactions.forEach(({ amount, date }) => {
    const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
  });

  const data = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total: parseFloat(total.toFixed(2)),
  }));

  return (
    <div className={styles.chartContainer}>
      <h2>Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#6c63ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
