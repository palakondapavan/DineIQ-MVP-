from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class TableSection(str, Enum):
    AC = "AC"
    NON_AC = "NON_AC"


class TableStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"
    RESERVED = "RESERVED"
    OUT_OF_SERVICE = "OUT_OF_SERVICE"


class RestaurantTableBase(BaseModel):

    table_number: str = Field(
        ...,
        min_length=1,
        max_length=20
    )

    capacity: int = Field(
        ...,
        ge=1,
        le=20
    )

    section: TableSection

    status: TableStatus = TableStatus.AVAILABLE

    qr_code: Optional[str] = None

    is_active: bool = True


class RestaurantTableCreate(RestaurantTableBase):
    pass


class RestaurantTableUpdate(BaseModel):

    table_number: Optional[str] = None
    capacity: Optional[int] = None
    section: Optional[TableSection] = None
    status: Optional[TableStatus] = None
    qr_code: Optional[str] = None
    is_active: Optional[bool] = None


class RestaurantTableResponse(RestaurantTableBase):

    table_id: int

    model_config = {
        "from_attributes": True
    }