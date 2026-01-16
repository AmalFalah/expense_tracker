from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# IMPORTANT: import models so SQLAlchemy registers them
from models.user import User
from models.expense import Expense
from models.category import Category
