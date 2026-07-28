from pydantic import BaseModel, Field
from typing import Optional


class CategoryBase(BaseModel):
    """
    Common fields shared by all category schemas.
    """

    category_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Category Name"
    )

    description: Optional[str] = Field(
        default=None,
        description="Category Description"
    )


class CategoryCreate(CategoryBase):
    """
    Schema used while creating a category.
    """
    pass


class CategoryUpdate(BaseModel):
    """
    Schema used while updating a category.
    """

    category_name: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100
    )

    description: Optional[str] = None


class CategoryResponse(CategoryBase):
    """
    Schema returned in API responses.
    """

    category_id: int

    model_config = {
        "from_attributes": True
    }