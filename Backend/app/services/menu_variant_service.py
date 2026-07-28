from sqlalchemy.orm import Session

from app.models.menu_variant import MenuVariant
from app.schemas.menu_variant import (
    MenuVariantCreate,
    MenuVariantUpdate
)


class MenuVariantService:

    @staticmethod
    def get_all_menu_variants(db: Session):
        return db.query(MenuVariant).all()

    @staticmethod
    def get_menu_variant_by_id(
        db: Session,
        variant_id: int
    ):
        return (
            db.query(MenuVariant)
            .filter(MenuVariant.variant_id == variant_id)
            .first()
        )

    @staticmethod
    def create_menu_variant(
        db: Session,
        variant: MenuVariantCreate
    ):

        new_variant = MenuVariant(
            item_id=variant.item_id,
            variant_name=variant.variant_name,
            price=variant.price,
            is_available=variant.is_available
        )

        db.add(new_variant)
        db.commit()
        db.refresh(new_variant)

        return new_variant

    @staticmethod
    def update_menu_variant(
        db: Session,
        variant_id: int,
        variant: MenuVariantUpdate
    ):

        existing = (
            db.query(MenuVariant)
            .filter(MenuVariant.variant_id == variant_id)
            .first()
        )

        if not existing:
            return None

        update_data = variant.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(existing, key, value)

        db.commit()
        db.refresh(existing)

        return existing

    @staticmethod
    def delete_menu_variant(
        db: Session,
        variant_id: int
    ):

        existing = (
            db.query(MenuVariant)
            .filter(MenuVariant.variant_id == variant_id)
            .first()
        )

        if not existing:
            return False

        db.delete(existing)
        db.commit()

        return True