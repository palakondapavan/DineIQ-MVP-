from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Numeric,
    Boolean,
    TIMESTAMP,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class MenuVariant(Base):
    """
    SQLAlchemy model for the menu_variants table.
    """

    __tablename__ = "menu_variants"
    __table_args__ = {"schema": "rms"}

    variant_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    item_id = Column(
        BigInteger,
        ForeignKey("rms.menu_items.item_id"),
        nullable=False
    )

    variant_name = Column(
        String(100),
        nullable=False
    )

    price = Column(
        Numeric(10, 2),
        nullable=False
    )

    is_available = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    # Relationship with MenuItem
    menu_item = relationship(
        "MenuItem",
        back_populates="variants"
    )

    order_items = relationship(
        "OrderItem",
        back_populates="variant"
    )

    def __repr__(self):
        return (
            f"<MenuVariant("
            f"variant_id={self.variant_id}, "
            f"variant_name='{self.variant_name}', "
            f"price={self.price})>"
        )