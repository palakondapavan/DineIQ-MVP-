from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload

from app.models.category import Category
from app.models.menu_item import MenuItem

from app.schemas.customer_menu import (
    CustomerMenuResponse,
    CategoryResponse,
    MenuItemResponse,
    MenuVariantResponse,
)


class CustomerMenuService:

    @staticmethod
    def get_menu(db: Session) -> CustomerMenuResponse:

        categories = (
            db.query(Category)
            .options(
                selectinload(Category.menu_items).selectinload(
                    MenuItem.variants
                )
            )
            .order_by(Category.category_name)
            .all()
        )

        response_categories = []

        for category in categories:

            response_items = []

            for item in category.menu_items:

                if not item.is_available:
                    continue

                response_variants = []

                for variant in item.variants:

                    if not variant.is_available:
                        continue

                    response_variants.append(
                        MenuVariantResponse(
                            variant_id=variant.variant_id,
                            variant_name=variant.variant_name,
                            price=variant.price,
                        )
                    )

                response_items.append(
                    MenuItemResponse(
                        item_id=item.item_id,
                        item_name=item.item_name,
                        description=item.description,
                        image_url=item.image_url,
                        food_type=item.food_type,
                        is_available=item.is_available,
                        variants=response_variants,
                    )
                )

            response_categories.append(
                CategoryResponse(
                    category_id=category.category_id,
                    category_name=category.category_name,
                    description=category.description,
                    items=response_items,
                )
            )

        return CustomerMenuResponse(
            categories=response_categories
        )