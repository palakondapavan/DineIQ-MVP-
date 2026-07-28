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
        Numeric(10,2),
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

    order = relationship(
        "Order",
        back_populates="items"
    )

    variant = relationship(
        "MenuVariant"
    )