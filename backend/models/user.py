from sqlalchemy import Column, Integer, String, Boolean
from database.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="user")  # admin / user
    is_deleted = Column(Boolean, default=False, index=True)  # soft delete flag
