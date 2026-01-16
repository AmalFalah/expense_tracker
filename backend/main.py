from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine
from database.base import Base

from routers import auth, categories, expenses, dashboard, users

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expense Tracker API",
    description="API for tracking expenses and managing categories",
    version="1.0.0"
)

# Add OpenAPI security configuration for Swagger
app.openapi_tags = [
    {
        "name": "Auth",
        "description": "Authentication endpoints",
    },
    {
        "name": "Expenses",
        "description": "Expense management endpoints",
    },
    {
        "name": "Categories",
        "description": "Category management endpoints",
    },
    {
        "name": "Dashboard",
        "description": "Dashboard analytics endpoints",
    },
    {
        "name": "Users",
        "description": "User management endpoints (Admin only)",
    },
]

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Allow frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(expenses.router)
app.include_router(dashboard.router)
app.include_router(users.router)



# admin123-hashed: $2b$12$G8Nf.U0kboZje.285SGqJuKn.gBUtcF5YEybl5RpVjczxtdoLf2Dq
#amal-hashed: $2b$12$G3QW5dBHIdDFwQPI9Be.jeyGYEuyQSdLWRXFhXADvATGSUxtNDEYS