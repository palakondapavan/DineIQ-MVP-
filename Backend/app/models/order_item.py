from sqlalchemy import (
    Column,
    BigInteger,
    Integer,
    Numeric,
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):

    __tablename__ = "order_items"
    __table_args__ = {"schema": "rms"}

    order_item_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    order_id = Column(
        BigInteger,
        ForeignKey("rms.orders.order_id"),
        nullable=False
    )

    variant_id = Column(
        BigInteger,
        ForeignKey("rms.menu_variants.variant_id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    price_at_order = Column(
        Numeric(10, 2),
        nullable=False
    )

    item_status = Column(
        String(20),
        nullable=False,
        server_default="PLACED"
    )

    special_instruction = Column(
        Text,
        nullable=True
    )

    rejection_reason = Column(
        Text,
        nullable=True
    )

    # ----------------------------------------
    # Relationships
    # ----------------------------------------

    order = relationship(
        "Order",
        back_populates="items"
    )

    variant = relationship(
        "MenuVariant",
        back_populates="order_items"
    )

    # ----------------------------------------
    # Computed Properties
    # Used by OrderItemResponse schema
    # ----------------------------------------

    @property
    def variant_name(self):
        return self.variant.variant_name

    @property
    def item_name(self):
        return self.variant.menu_item.item_name

    @property
    def image_url(self):
        return self.variant.menu_item.image_url

    @property
    def food_type(self):
        return self.variant.menu_item.food_type