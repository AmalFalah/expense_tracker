# Expense Tracker Frontend

A modern React-based frontend for the Expense Tracker application, built with Vite, featuring real-time expense management, category tracking, and detailed spending analytics.

## Features

- **User Authentication**: Register and login with secure JWT token management
- **Expense Management**: Add, view, and organize expenses by category
- **Monthly Dashboard**: View top spending categories and monthly summaries
- **Category Tracking**: Organize expenses into multiple categories
- **Real-time Updates**: Instant feedback on expense additions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Easy on the eyes with a modern dark UI

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Top navigation bar
│   │   └── ProtectedRoute.jsx  # Route protection for authenticated users
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Dashboard.jsx       # Main dashboard with expenses & categories
│   │   ├── AddExpense.jsx      # Expense form component
│   │   └── ExpenseList.jsx     # Monthly expenses display
│   ├── services/
│   │   └── api.js              # API service with axios
│   ├── styles/
│   │   ├── Navigation.css
│   │   ├── Auth.css
│   │   ├── Home.css
│   │   ├── Dashboard.css
│   │   └── Expenses.css
│   ├── App.jsx                 # Main app with routing
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview the production build locally

## API Integration

The frontend communicates with the backend API endpoints:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token

### Expenses
- `POST /expenses/` - Add a new expense
- `GET /expenses/monthly` - Get monthly expenses

### Categories
- `GET /categories/` - Get all categories
- `POST /categories/` - Create a new category (admin only)

### Dashboard
- `GET /dashboard/top-categories` - Get top 5 categories this month

## Key Components

### AuthContext
Manages user authentication state including:
- User information
- JWT token storage and retrieval
- Login/logout functionality
- Authentication checks

### API Service
Centralized API client with:
- Axios instance configuration
- Automatic token injection in headers
- Request/response interceptors
- Organized endpoint groupings

### ProtectedRoute
HOC that ensures:
- User is authenticated before accessing routes
- Automatic redirect to login if not authenticated
- Loading state during auth verification

## Styling

The application uses CSS with CSS variables for theming:
- Primary color: `#6366f1` (Indigo)
- Secondary color: `#8b5cf6` (Violet)
- Dark theme with accessible contrast ratios

## Environment Setup

Make sure your backend is running before starting the frontend:

```bash
# Backend terminal
cd backend
python -m uvicorn main:app --reload
```

The frontend automatically connects to `http://localhost:8000` for API calls.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- JWT tokens are stored in localStorage
- Authorization headers are automatically included in API requests
- Always use HTTPS in production
- Store sensitive credentials securely

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Verify `API_BASE_URL` in `src/services/api.js`

### Login Issues
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify credentials match backend database

### Styling Issues
- Clear Vite cache: `rm -rf node_modules/.vite`
- Rebuild: `npm run dev`

## Contributing

When adding new features:
1. Create new pages in `src/pages/`
2. Add API methods to `src/services/api.js`
3. Create corresponding CSS files in `src/styles/`
4. Use existing components as templates

## License

This project is part of the Expense Tracker application suite.
