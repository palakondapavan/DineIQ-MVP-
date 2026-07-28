from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordRequestForm

from app.models.staff import Staff

from app.schemas.auth import Token

from app.core.security import (
    verify_password,
    create_access_token
)


class AuthService:

    # ------------------------------------
    # Login
    # ------------------------------------

    @staticmethod
    def login(
        db: Session,
        form_data: OAuth2PasswordRequestForm
    ) -> Token:

        # Swagger sends email in the "username" field
        email = form_data.username

        # -----------------------------
        # Find Staff
        # -----------------------------

        staff = (
            db.query(Staff)
            .filter(
                Staff.email == email
            )
            .first()
        )

        if not staff:
            raise ValueError(
                "Invalid email or password."
            )

        # -----------------------------
        # Check Status
        # -----------------------------

        if staff.status != "ACTIVE":
            raise ValueError(
                "Staff account is inactive."
            )

        # -----------------------------
        # Verify Password
        # -----------------------------

        if not verify_password(
            form_data.password,
            staff.password_hash
        ):
            raise ValueError(
                "Invalid email or password."
            )

        # -----------------------------
        # Create JWT Token
        # -----------------------------

        access_token = create_access_token(
            data={
                "staff_id": staff.staff_id,
                "email": staff.email,
                "role": staff.role
            }
        )

        return Token(
            access_token=access_token,
            token_type="bearer"
        )