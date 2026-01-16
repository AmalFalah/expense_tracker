from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from models.category import Category
from schemas.category import CategoryCreate
from core.dependencies import admin_required

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", dependencies=[Depends(admin_required)])
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    category = Category(name=data.name)
    db.add(category)
    db.commit()
    return {"message": "Category added"}

@router.get("/")
def list_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()
