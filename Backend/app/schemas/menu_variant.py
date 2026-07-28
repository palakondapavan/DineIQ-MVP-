from typing import Optional
from pydantic import BaseModel, Field


class MenuVariantBase(BaseModel):

    item_id: int

    variant_name: str = Field(
        ...,
        min_length=2,
        max_length=100
    )

    price: float

    is_available: bool = True


class MenuVariantCreate(MenuVariantBase):
    pass


class MenuVariantUpdate(BaseModel):

    item_id: Optional[int] = None
    variant_name: Optional[str] = None
    price: Optional[float] = None
    is_available: Optional[bool] = None


class MenuVariantResponse(MenuVariantBase):

    variant_id: int

    model_config = {
        "from_attributes": True
    }