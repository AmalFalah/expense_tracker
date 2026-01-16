# Expense Tracker – Project Documentation

## Project Summary

This is a **full-stack Expense Tracker application** developed using **React** for the frontend and **FastAPI** for the backend. The application allows users to register, log in, add expenses, categorize them, and view their expenses securely. Role-based access is implemented for admin-specific features.

---

## Technologies Used

### Frontend

* React (Vite)
* React Router DOM
* Context API for authentication
* Axios for API calls
* CSS for styling

### Backend

* FastAPI
* SQLAlchemy ORM
* SQLite database
* JWT-based authentication
* Passlib for password hashing

---

## Key Features Implemented

* User registration and login
* JWT authentication and protected routes
* Role-based access control (User / Admin)
* Add, view, and manage expenses
* Expense categorization
* Monthly expense filtering
* Admin management of categories
* Secure backend APIs

---

## Frontend Overview

* Built a responsive React UI
* Implemented authentication using Context API
* Created protected routes for authenticated users
* Developed pages for login, registration, dashboard, expense list, and adding expenses
* Integrated frontend with backend APIs using Axios

---

## Backend Overview

* Designed relational database models (User, Category, Expense)
* Implemented RESTful APIs using FastAPI
* Integrated JWT authentication and authorization
* Used SQLAlchemy for database interactions
* Implemented role-based admin access

---

## Database Design

* One User can have multiple Expenses
* One Category can have multiple Expenses
* Expenses are linked to both User and Category

---

## Application Flow

1. User registers or logs in
2. JWT token is generated and stored
3. User accesses protected pages
4. Expenses are added and stored in the database
5. Expenses are fetched and displayed based on user and month
6. Admin users can manage categories

---

## Conclusion

This project demonstrates a complete **full-stack application** with authentication, authorization, database relationships, and frontend-backend integration. It showcases practical implementation of modern web development concepts using React and FastAPI.
