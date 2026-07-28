from sqlalchemy.orm import Session

from app.models.staff import Staff
from app.schemas.staff import (
    StaffCreate,
    StaffUpdate
)

from app.core.security import hash_password


class StaffService:

    # ------------------------------------
    # Get All Staff
    # ------------------------------------

    @staticmethod
    def get_all_staff(
        db: Session
    ):

        return (
            db.query(Staff)
            .order_by(
                Staff.staff_id
            )
            .all()
        )

    # ------------------------------------
    # Get Staff By ID
    # ------------------------------------

    @staticmethod
    def get_staff_by_id(
        db: Session,
        staff_id: int
    ):

        return (
            db.query(Staff)
            .filter(
                Staff.staff_id == staff_id
            )
            .first()
        )

    # ------------------------------------
    # Create Staff
    # ------------------------------------

    @staticmethod
    def create_staff(
        db: Session,
        staff: StaffCreate
    ):

        # Check duplicate mobile

        existing_mobile = (
            db.query(Staff)
            .filter(
                Staff.mobile == staff.mobile
            )
            .first()
        )

        if existing_mobile:
            raise ValueError(
                "Mobile number already exists."
            )

        # Check duplicate email

        existing_email = (
            db.query(Staff)
            .filter(
                Staff.email == staff.email
            )
            .first()
        )

        if existing_email:
            raise ValueError(
                "Email already exists."
            )

        new_staff = Staff(

            full_name=staff.full_name,

            mobile=staff.mobile,

            email=staff.email,

            password_hash=hash_password(
                staff.password
            ),

            role=staff.role,

            status=staff.status
        )

        db.add(new_staff)

        db.commit()

        db.refresh(new_staff)

        return new_staff

    # ------------------------------------
    # Update Staff
    # ------------------------------------

    @staticmethod
    def update_staff(
        db: Session,
        staff_id: int,
        staff: StaffUpdate
    ):

        existing = (
            db.query(Staff)
            .filter(
                Staff.staff_id == staff_id
            )
            .first()
        )

        if not existing:
            return None

        update_data = staff.model_dump(
            exclude_unset=True
        )

        # Hash password if updated

        if "password" in update_data:

            update_data["password_hash"] = (
                hash_password(
                    update_data.pop("password")
                )
            )

        for key, value in update_data.items():

            setattr(
                existing,
                key,
                value
            )

        db.commit()

        db.refresh(existing)

        return existing

    # ------------------------------------
    # Delete Staff
    # ------------------------------------

    @staticmethod
    def delete_staff(
        db: Session,
        staff_id: int
    ):

        existing = (
            db.query(Staff)
            .filter(
                Staff.staff_id == staff_id
            )
            .first()
        )

        if not existing:
            return False

        db.delete(existing)

        db.commit()

        return True