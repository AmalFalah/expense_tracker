from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import extract
from datetime import date

from database.db import get_db
from models.expense import Expense
from schemas.expense import ExpenseCreate
from core.dependencies import get_current_user

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/")
def add_expense(data: ExpenseCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    expense = Expense(
        user_id=user.id,
        category_id=data.category_id,
        amount=data.amount,
        description=data.description,
        expense_date=data.expense_date
    )
    db.add(expense)
    db.commit()
    return {"message": "Expense added"}

@router.get("/monthly")
def monthly_expenses(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()
    expenses = db.query(Expense).filter(
        Expense.user_id == user.id,
        extract('month', Expense.expense_date) == today.month,
        extract('year', Expense.expense_date) == today.year
    ).all()
    
    # Return expenses with category data
    return [
        {
            "id": expense.id,
            "user_id": expense.user_id,
            "category_id": expense.category_id,
            "category": {"id": expense.category.id, "name": expense.category.name} if expense.category else None,
            "amount": expense.amount,
            "description": expense.description,
            "expense_date": expense.expense_date.isoformat() if expense.expense_date else None,
            "created_at": expense.created_at.isoformat() if expense.created_at else None
        }
        for expense in expenses
    ]
