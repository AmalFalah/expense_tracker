import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (email, password) =>
    api.post('/auth/register', { email, password }),
  login: (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email);   // OAuth2 expects "username"
  formData.append('password', password);

  return api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
},
};

// Expenses endpoints
export const expensesAPI = {
  addExpense: (categoryId, amount, description, expenseDate) =>
    api.post('/expenses/', {
      category_id: categoryId,
      amount,
      description,
      expense_date: expenseDate,
    }),
  getMonthlyExpenses: () =>
    api.get('/expenses/monthly'),
};

// Categories endpoints
export const categoriesAPI = {
  getCategories: () =>
    api.get('/categories/'),
  createCategory: (name) =>
    api.post('/categories/', { name }),
};

// Dashboard endpoints
export const dashboardAPI = {
  getTopCategories: () =>
    api.get('/dashboard/top-categories'),
};

// Users endpoints
export const usersAPI = {
  getAllUsers: () =>
    api.get('/users/'),
  promoteUser: (userId) =>
    api.post(`/users/promote/${userId}`),
  deleteUser: (userId) =>
    api.delete(`/users/${userId}`),
};

export default api;
