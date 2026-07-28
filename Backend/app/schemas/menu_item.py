from typing import Optional

from pydantic import BaseModel, Field


class MenuItemBase(BaseModel):

    category_id: int

    item_name: str = Field(
        ...,
        min_length=2,
        max_length=150
    )

    food_type: str

    description: Optional[str] = None

    image_url: Optional[str] = None

    is_available: bool = True


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):

    category_id: Optional[int] = None
    item_name: Optional[str] = None
    food_type: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None


class MenuItemResponse(MenuItemBase):

    item_id: int

    model_config = {
        "from_attributes": True
    }