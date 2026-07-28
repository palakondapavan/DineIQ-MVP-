from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.enums import (
    StaffRole,
    StaffStatus
)


# ------------------------------------
# Base Schema
# ------------------------------------

class StaffBase(BaseModel):

    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    mobile: str = Field(
        ...,
        min_length=10,
        max_length=15
    )

    email: EmailStr

    role: StaffRole


# ------------------------------------
# Create Staff
# ------------------------------------

class StaffCreate(StaffBase):

    password: str = Field(
        ...,
        min_length=6,
        max_length=100
    )

    status: StaffStatus = StaffStatus.ACTIVE


# ------------------------------------
# Update Staff
# ------------------------------------

class StaffUpdate(BaseModel):

    full_name: Optional[str] = None

    mobile: Optional[str] = None

    email: Optional[EmailStr] = None

    role: Optional[StaffRole] = None

    status: Optional[StaffStatus] = None

    password: Optional[str] = None


# ------------------------------------
# Staff Response
# ------------------------------------

class StaffResponse(BaseModel):

    staff_id: int

    full_name: str

    mobile: str

    email: EmailStr

    role: StaffRole

    status: StaffStatus

    model_config = {
        "from_attributes": True
    }