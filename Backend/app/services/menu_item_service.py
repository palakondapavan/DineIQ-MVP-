from sqlalchemy.orm import Session

from app.models.menu_item import MenuItem
from app.schemas.menu_item import (
    MenuItemCreate,
    MenuItemUpdate
)


class MenuItemService:

    @staticmethod
    def get_all_menu_items(db: Session):
        return db.query(MenuItem).all()

    @staticmethod
    def get_menu_item_by_id(
        db: Session,
        item_id: int
    ):
        return (
            db.query(MenuItem)
            .filter(MenuItem.item_id == item_id)
            .first()
        )

    @staticmethod
    def create_menu_item(
        db: Session,
        menu_item: MenuItemCreate
    ):

        new_item = MenuItem(
            category_id=menu_item.category_id,
            item_name=menu_item.item_name,
            food_type=menu_item.food_type,
            description=menu_item.description,
            image_url=menu_item.image_url,
            is_available=menu_item.is_available
        )

        db.add(new_item)
        db.commit()
        db.refresh(new_item)

        return new_item

    @staticmethod
    def update_menu_item(
        db: Session,
        item_id: int,
        menu_item: MenuItemUpdate
    ):

        existing = (
            db.query(MenuItem)
            .filter(MenuItem.item_id == item_id)
            .first()
        )

        if not existing:
            return None

        update_data = menu_item.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(existing, key, value)

        db.commit()
        db.refresh(existing)

        return existing

    @staticmethod
    def delete_menu_item(
        db: Session,
        item_id: int
    ):

        existing = (
            db.query(MenuItem)
            .filter(MenuItem.item_id == item_id)
            .first()
        )

        if not existing:
            return False

        db.delete(existing)
        db.commit()

        return True