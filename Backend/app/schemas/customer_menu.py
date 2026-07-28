from decimal import Decimal
from pydantic import BaseModel


class MenuVariantResponse(BaseModel):
    variant_id: int
    variant_name: str
    price: Decimal

    class Config:
        from_attributes = True


class MenuItemResponse(BaseModel):
    item_id: int
    item_name: str
    description: str | None
    image_url: str | None
    food_type: str
    is_available: bool
    variants: list[MenuVariantResponse]

    class Config:
        from_attributes = True


class CategoryResponse(BaseModel):
    category_id: int
    category_name: str
    description: str | None
    items: list[MenuItemResponse]

    class Config:
        from_attributes = True


class CustomerMenuResponse(BaseModel):
    categories: list[CategoryResponse]