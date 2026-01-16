from sqlalchemy import Column, Integer, Float, String, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.base import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    amount = Column(Float, nullable=False)
    description = Column(String)
    expense_date = Column(Date, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationship to category
    category = relationship("Category", back_populates="expenses")
