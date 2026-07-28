from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    Text
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class MenuItem(Base):
    __tablename__ = "menu_items"
    __table_args__ = {"schema": "rms"}

    item_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    category_id = Column(
        BigInteger,
        ForeignKey("rms.categories.category_id"),
        nullable=False
    )

    item_name = Column(
        String(150),
        nullable=False
    )

    food_type = Column(
        String(20),
        nullable=False
    )
    
    fulfillment_type = Column(
        String(20),
        nullable=False,
        server_default="KITCHEN"
    )

    description = Column(
        Text,
        nullable=True
    )

    image_url = Column(
        Text,
        nullable=True
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

    # Relationship with Category
    category = relationship(
        "Category",
        back_populates="menu_items"
    )

    # Relationship with Menu Variants
    variants = relationship(
        "MenuVariant",
        back_populates="menu_item",
        cascade="all, delete-orphan"
    )