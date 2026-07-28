from sqlalchemy.orm import Session

from app.models.restaurant_table import RestaurantTable
from app.schemas.restaurant_table import (
    RestaurantTableCreate,
    RestaurantTableUpdate
)


class RestaurantTableService:

    @staticmethod
    def get_all_tables(db: Session):
        return db.query(RestaurantTable).all()

    @staticmethod
    def get_table_by_id(
        db: Session,
        table_id: int
    ):
        return (
            db.query(RestaurantTable)
            .filter(
                RestaurantTable.table_id == table_id
            )
            .first()
        )

    @staticmethod
    def create_table(
        db: Session,
        table: RestaurantTableCreate
    ):

        new_table = RestaurantTable(
            table_number=table.table_number,
            capacity=table.capacity,
            section=table.section,
            status=table.status,
            qr_code=table.qr_code,
            is_active=table.is_active
        )

        db.add(new_table)
        db.commit()
        db.refresh(new_table)

        return new_table

    @staticmethod
    def update_table(
        db: Session,
        table_id: int,
        table: RestaurantTableUpdate
    ):

        existing = (
            db.query(RestaurantTable)
            .filter(RestaurantTable.table_id == table_id)
            .first()
        )

        if not existing:
            return None

        update_data = table.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(existing, key, value)

        db.commit()
        db.refresh(existing)

        return existing

    @staticmethod
    def delete_table(
        db: Session,
        table_id: int
    ):

        existing = (
            db.query(RestaurantTable)
            .filter(RestaurantTable.table_id == table_id)
            .first()
        )

        if not existing:
            return False

        db.delete(existing)
        db.commit()

        return True