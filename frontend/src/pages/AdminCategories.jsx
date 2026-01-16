import React, { useState, useEffect } from 'react';
import { categoriesAPI, usersAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const AdminCategories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState('');
  const [usersError, setUsersError] = useState('');
  const [success, setSuccess] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories');
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const response = await usersAPI.getAllUsers();
      setUsers(response.data);
      setShowUsers(true);
    } catch (err) {
      setUsersError(err.response?.data?.detail || 'Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.deleteUser(userId);
        setSuccess('User deleted successfully!');
        setTimeout(() => {
          setSuccess('');
          fetchUsers();
        }, 2000);
      } catch (err) {
        setUsersError(err.response?.data?.detail || 'Failed to delete user');
      }
    }
  };

  const handlePromoteUser = async (userId) => {
    if (window.confirm('Promote this user to admin?')) {
      try {
        await usersAPI.promoteUser(userId);
        setSuccess('User promoted to admin!');
        setTimeout(() => {
          setSuccess('');
          fetchUsers();
        }, 2000);
      } catch (err) {
        setUsersError(err.response?.data?.detail || 'Failed to promote user');
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    setLoading(true);

    try {
      await categoriesAPI.createCategory(categoryName);
      setSuccess(`Category "${categoryName}" added successfully!`);
      setCategoryName('');
      fetchCategories(); // Refresh list
    } catch (err) {
      if (err.response?.status === 403) {
        setError('You do not have permission to add categories (admin only)');
      } else {
        setError(err.response?.data?.detail || 'Failed to add category');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1> Admin Dashboard</h1>
        <p>Manage categories and users (Admin Only)</p>
      </div>

      <div className="admin-grid">
        {/* Add Category Form */}
        <div className="admin-card">
          <h2>Add New Category</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleAddCategory}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="e.g., Food, Transportation, Entertainment"
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary"
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="admin-card">
          <h2>Existing Categories</h2>
          {categories.length === 0 ? (
            <p className="no-data">No categories yet. Add your first one!</p>
          ) : (
            <div className="categories-grid">
              {categories.map((cat) => (
                <div key={cat.id} className="category-badge">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-id">ID: {cat.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Users Section */}
      <div className="admin-section">
        <div className="admin-header">
          <h2>👥 User Management</h2>
          <button 
            onClick={fetchUsers} 
            disabled={usersLoading}
            className="btn-primary"
          >
            {usersLoading ? 'Loading Users...' : 'View All Users'}
          </button>
        </div>

        {usersError && <div className="error-message">{usersError}</div>}

        {showUsers && (
          <div className="admin-card">
            {users.length === 0 ? (
              <p className="no-data">No users found.</p>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge role-${u.role}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {u.role === 'user' && (
                            <button 
                              onClick={() => handlePromoteUser(u.id)}
                              className="btn-promote"
                              title="Promote to admin"
                            >
                               Promote
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            className="btn-delete"
                            title="Delete user"
                          >
                             Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
