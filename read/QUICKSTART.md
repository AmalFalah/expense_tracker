# Expense Tracker - Quick Start Guide

## Overview

You now have a complete expense tracking application with:
- **FastAPI Backend** with authentication, expense management, and analytics
- **React Frontend** with a modern UI for managing expenses

## Quick Start

### 1. Start the Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

Backend will run on: `http://localhost:8000`

### 2. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 3. Open Your Browser

Navigate to: `http://localhost:5173`

## Features Available

### User Management
- Register new account
- Login with email and password
- Automatic session management with JWT tokens

### Expense Tracking
- Add new expenses with amount, category, description, and date
- View all expenses for the current month
- See total monthly spending

### Dashboard Analytics
- View top 5 spending categories
- See spending distribution by category
- Monthly spending summary

## Default Test Account (Backend)

You can test login with:
- **Email**: admin@test.com
- **Password**: admin123

Or register a new account at `/register`

## File Structure Summary

```
expense2/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── routers/                # API endpoints
│   │   ├── auth.py             # Authentication routes
│   │   ├── expenses.py         # Expense CRUD
│   │   ├── categories.py       # Category management
│   │   └── dashboard.py        # Analytics
│   ├── models/                 # SQLAlchemy models
│   ├── schemas/                # Pydantic schemas
│   ├── services/               # Business logic
│   ├── core/                   # Core configs
│   ├── database/               # Database setup
│   └── utils/                  # Utility functions
└── frontend/
    ├── src/
    │   ├── pages/              # Page components
    │   ├── components/         # Reusable components
    │   ├── services/           # API client
    │   ├── contexts/           # Context providers
    │   ├── styles/             # CSS files
    │   └── App.jsx             # Main component
    └── package.json            # Dependencies
```

## API Endpoints Reference

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Login and get token

### Expenses
- `POST /expenses/` - Add expense
- `GET /expenses/monthly` - Get monthly expenses

### Categories
- `GET /categories/` - List categories
- `POST /categories/` - Create category (admin only)

### Dashboard
- `GET /dashboard/top-categories` - Top 5 categories this month

## Key Technologies

**Backend:**
- FastAPI - Modern Python web framework
- SQLAlchemy - ORM
- SQLite - Database
- JWT - Authentication
- Bcrypt - Password hashing

**Frontend:**
- React 19 - UI library
- Vite - Build tool
- Axios - HTTP client
- React Router - Navigation
- CSS3 - Styling

## Common Tasks

### Add a New Expense
1. Go to Dashboard
2. Fill in the "Add New Expense" form
3. Select category
4. Enter amount and description
5. Click "Add Expense"

### View Monthly Expenses
- Go to Dashboard
- Scroll down to see the expense table
- Expenses for current month are displayed

### Check Spending by Category
- On Dashboard right side, see "Top Categories This Month"
- Categories are sorted by spending amount

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
# Install required packages
pip install -r requirement.txt
```

### Frontend won't start
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

### Can't login
- Check backend is running
- Verify credentials are correct
- Clear browser cache: Ctrl+Shift+Delete

### CORS errors
- Ensure backend CORS is configured (it is by default)
- Check frontend API URL in `src/services/api.js`

## Next Steps

1. **Create categories** - Categories can be managed via API
2. **Add more expenses** - Test with various amounts and dates
3. **Customize styling** - Modify CSS files in `src/styles/`
4. **Add more features** - Extend the dashboard with charts/graphs

## Production Deployment

### Backend
```bash
pip install -r requirement.txt
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Frontend
```bash
npm run build
# Deploy the 'dist' folder to your server
```

## Support

For issues:
1. Check console (F12 → Console tab)
2. Verify backend is running
3. Check network tab for API calls
4. Review browser console for detailed errors

---

**Happy expense tracking! 💰**
