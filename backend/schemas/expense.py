from pydantic import BaseModel
from datetime import date, datetime

class ExpenseCreate(BaseModel):
    amount: float
    category_id: int
    description: str | None = None
    expense_date: date

class ExpenseResponse(BaseModel):
    id: int
    amount: float
    category_id: int
    description: str | None = None
    expense_date: date
    created_at: datetime
    
    class Config:
        from_attributes = True
