from typing import Optional

from pydantic import BaseModel, EmailStr

from app.enums import StaffRole


# ------------------------------------
# Register
# ------------------------------------

class RegisterRequest(BaseModel):

    full_name: str

    mobile: str

    email: EmailStr

    password: str

    role: StaffRole


# ------------------------------------
# Login
# ------------------------------------

class LoginRequest(BaseModel):

    email: EmailStr

    password: str


# ------------------------------------
# JWT Token
# ------------------------------------

class Token(BaseModel):

    access_token: str

    token_type: str = "bearer"


# ------------------------------------
# Token Data
# ------------------------------------

class TokenData(BaseModel):

    staff_id: Optional[int] = None

    email: Optional[EmailStr] = None

    role: Optional[StaffRole] = None