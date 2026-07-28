from app.database import SessionLocal
from app.models.category import Category

db = SessionLocal()

try:

    categories = db.query(Category).all()

    for category in categories:
        print(category.category_name)

finally:
    db.close()