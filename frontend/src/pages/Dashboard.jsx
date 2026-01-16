import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchTopCategories();
  }, [refreshTrigger]);

  const fetchTopCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await dashboardAPI.getTopCategories();
      setTopCategories(response.data || []);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // ✅ Total spent (object-based API response)
  const getTotalSpent = () => {
    const total = topCategories.reduce(
      (sum, item) => sum + (Number(item.total) || 0),
      0
    );
    return total.toFixed(2);
  };

  // ✅ Max value for progress bar
  const maxCategoryAmount = Math.max(
    ...topCategories.map((item) => Number(item.total) || 0),
    1
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Expense Tracker Dashboard</h1>
        <p>Manage your expenses and track spending by category</p>
      </div>

      <div className="dashboard-grid">
        <div className="left-section">
          <AddExpense onExpenseAdded={handleExpenseAdded} />
        </div>

        <div className="right-section">
          {loading ? (
            <div className="loading">Loading top categories...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="top-categories-card">
              <h3>Top Categories This Month</h3>

              {topCategories.length === 0 ? (
                <p className="no-data">No expenses yet</p>
              ) : (
                <>
                  <div className="categories-list">
                    {topCategories.map((item, index) => {
                      const name = item.category;
                      const amount = Number(item.total) || 0;

                      return (
                        <div key={index} className="category-item">
                          <div className="category-info">
                            <span className="category-name">{name}</span>
                            <span className="category-amount">
                              {amount.toFixed(2)}
                            </span>
                          </div>

                          {/* <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${(amount / maxCategoryAmount) * 100}%`,
                              }}
                            />
                          </div> */}
                        </div>
                      );
                    })}
                  </div>

                  <div className="total-section">
                    <strong>Total This Month: {getTotalSpent()}</strong>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <ExpenseList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Dashboard;
