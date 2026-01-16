import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Expense Tracker</h1>
        <p>Manage your expenses efficiently and track your spending patterns</p>
        <div className="hero-buttons">
          {isAuthenticated() ? (
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Expenses</h3>
            <p>Add and manage your daily expenses with category classification</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Monthly Reports</h3>
            <p>View your monthly spending summary and top expense categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Multiple Categories</h3>
            <p>Organize expenses by categories for better tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data is secure with password encryption and token-based auth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
