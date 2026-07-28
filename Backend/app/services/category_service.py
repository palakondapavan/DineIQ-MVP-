from sqlalchemy.orm import Session

from app.models.category import Category
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate
)


class CategoryService:

    @staticmethod
    def get_all_categories(db: Session):
        """
        Get all categories.
        """
        return db.query(Category).all()

    @staticmethod
    def get_category_by_id(db: Session, category_id: int):
        """
        Get category by ID.
        """
        return (
            db.query(Category)
            .filter(Category.category_id == category_id)
            .first()
        )

    @staticmethod
    def create_category(
        db: Session,
        category: CategoryCreate
    ):
        """
        Create new category.
        """

        new_category = Category(
            category_name=category.category_name,
            description=category.description
        )

        db.add(new_category)
        db.commit()
        db.refresh(new_category)

        return new_category

    @staticmethod
    def update_category(
        db: Session,
        category_id: int,
        category: CategoryUpdate
    ):
        """
        Update category.
        """

        existing_category = (
            db.query(Category)
            .filter(Category.category_id == category_id)
            .first()
        )

        if not existing_category:
            return None

        if category.category_name is not None:
            existing_category.category_name = category.category_name

        if category.description is not None:
            existing_category.description = category.description

        db.commit()
        db.refresh(existing_category)

        return existing_category

    @staticmethod
    def delete_category(
        db: Session,
        category_id: int
    ):
        """
        Delete category.
        """

        category = (
            db.query(Category)
            .filter(Category.category_id == category_id)
            .first()
        )

        if not category:
            return False

        db.delete(category)
        db.commit()

        return True