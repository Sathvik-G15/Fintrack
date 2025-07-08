import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './CSS/CategoryPieChart.module.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff6666'];

export default function CategoryPieChart({ transactions }) {
  const categoryTotals = {};

  transactions.forEach(({ category, amount }) => {
    if (!category) return;
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  return (
    <div className={styles.chartContainer}>
      <h2>Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
