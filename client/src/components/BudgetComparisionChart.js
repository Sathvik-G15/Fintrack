import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './CSS/BudgetComparisionChart.module.css';

export default function BudgetComparisonChart({ budgets, transactions }) {
  const spentByCategory = {};

  transactions.forEach(({ category, amount }) => {
    if (!category) return;
    spentByCategory[category] = (spentByCategory[category] || 0) + amount;
  });

  const data = Object.keys(budgets).map(category => ({
    category,
    spent: spentByCategory[category] || 0,
    budget: budgets[category],
  }));

  return (
    <div className={styles.chartContainer}>
      <h2>Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
          <Bar dataKey="spent" fill="#8884d8" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
