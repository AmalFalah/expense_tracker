# Environment Setup Instructions

## Prerequisites

Make sure you have installed:
- Node.js (v20 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Python 3.8+ - [Download](https://www.python.org/)
- Git (optional)

Verify installations:
```bash
node --version
npm --version
python --version
```

## Backend Setup

### 1. Install Python Dependencies

From the `expense2/backend` directory:

```bash
# On Windows
pip install -r requirement.txt

# On Mac/Linux
pip3 install -r requirement.txt
```

Or install individually:
```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib[bcrypt] python-dotenv
```

### 2. Initialize Database

The database will auto-create on first run, but you can optionally pre-create it:

```bash
python -c "from database.db import engine; from database.base import Base; Base.metadata.create_all(bind=engine)"
```

### 3. Run Backend Server

From `expense2/backend`:

```bash
python -m uvicorn main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### 4. Access Backend APIs

- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc
- **Base URL**: http://localhost:8000

## Frontend Setup

### 1. Install Node Dependencies

From `expense2/frontend` directory:

```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- vite
- eslint
- And development dependencies

### 2. Run Development Server

From `expense2/frontend`:

```bash
npm run dev
```

Expected output:
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 3. Access Frontend

Open browser to: http://localhost:5173

## Complete Startup Sequence

### Terminal 1 - Backend
```bash
cd expense2/backend
python -m uvicorn main:app --reload
# Wait for "Application startup complete"
```

### Terminal 2 - Frontend
```bash
cd expense2/frontend
npm run dev
# Wait for "ready in XXX ms"
```

### Terminal 3 (Optional) - Code Editor
```bash
cd expense2
code .  # Opens VS Code
```

Then open http://localhost:5173 in your browser.

## Environment Variables

### Backend (.env file - optional)

Create `expense2/backend/.env`:

```env
DATABASE_URL=sqlite:///./expense.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend

API URL is hardcoded to `http://localhost:8000` in `src/services/api.js`

To change it, edit that file or create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Then update `src/services/api.js` to use `import.meta.env.VITE_API_BASE_URL`

## Database

The application uses SQLite by default.

### Database File Location
```
expense2/backend/expense.db
```

### Reset Database

```bash
# Delete the database file
rm expense2/backend/expense.db

# Or on Windows
del expense2/backend/expense.db

# Restart backend - new database will be created
```

### View Database

Using SQLite CLI:
```bash
sqlite3 expense2/backend/expense.db
.tables                    # List all tables
SELECT * FROM users;       # View users
SELECT * FROM expenses;    # View expenses
.quit                      # Exit
```

## Troubleshooting Setup Issues

### Python Issues

**"python command not found"**
```bash
# Use python3 instead
python3 -m pip install -r requirement.txt
python3 -m uvicorn main:app --reload
```

**"ModuleNotFoundError: No module named 'fastapi'"**
```bash
pip install fastapi uvicorn
# Or reinstall all
pip install -r requirement.txt
```

### Node/npm Issues

**"npm command not found"**
- Reinstall Node.js from nodejs.org
- Or use a Node version manager (nvm, fnm)

**"Port 5173 already in use"**
```bash
# Use different port
npm run dev -- --port 3000
```

**"node_modules missing"**
```bash
npm install
```

**Old dependencies causing issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts

**"Port 8000 already in use"**
```bash
# Use different port
python -m uvicorn main:app --reload --port 8001

# Then update frontend src/services/api.js:
# const API_BASE_URL = 'http://localhost:8001';
```

**Check what's using a port**
```bash
# Windows
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :8000
```

### CORS Errors

If you see CORS errors:
1. Verify backend is running
2. Check frontend API URL matches backend URL
3. Ensure CORS middleware is configured in backend (it is by default)

### Database Locked

If database is locked:
```bash
# Stop backend
# Delete database
rm expense2/backend/expense.db
# Restart backend
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Edit React files and see changes instantly
- Backend: Edit Python files and server restarts automatically

### Browser DevTools

Open DevTools in frontend:
- Windows/Linux: F12 or Ctrl+Shift+I
- Mac: Cmd+Option+I

Useful tabs:
- **Console**: See JavaScript errors
- **Network**: See API requests/responses
- **Storage**: View localStorage (including JWT token)
- **Application**: Debug React components

### View API Responses

In Chrome DevTools → Network tab:
1. Make an API request (e.g., login)
2. Click on the request in Network tab
3. View "Response" to see JSON

### Test API Directly

Using curl:
```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get categories
curl http://localhost:8000/categories/
```

## Next: Start Development

Once everything is running:

1. Open http://localhost:5173
2. Click "Register" to create an account
3. Login with your credentials
4. Start adding expenses!

## Getting Help

Check:
1. Browser console (F12 → Console)
2. Backend terminal for errors
3. Frontend terminal for errors
4. This troubleshooting guide
5. Backend API docs at http://localhost:8000/docs

---

**Ready to start? Run both servers and enjoy building!** 🚀
