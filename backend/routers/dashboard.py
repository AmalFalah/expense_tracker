from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import date

from database.db import get_db
from models.expense import Expense
from models.category import Category
from core.dependencies import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/top-categories")
def top_categories(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    today = date.today()

    results = (
        db.query(
            Category.name.label("category"),
            func.sum(Expense.amount).label("total")
        )
        .join(Category, Expense.category_id == Category.id)
        .filter(
            Expense.user_id == user.id,
            extract("month", Expense.expense_date) == today.month,
            extract("year", Expense.expense_date) == today.year
        )
        .group_by(Category.name)
        .order_by(func.sum(Expense.amount).desc())
        .limit(5)
        .all()
    )

    # ✅ Convert tuples → dict (JSON-safe)
    return [
        {
            "category": row.category,
            "total": float(row.total)
        }
        for row in results
    ]
