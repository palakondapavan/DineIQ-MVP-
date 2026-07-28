from sqlalchemy import Column, BigInteger, String, Text, TIMESTAMP
from sqlalchemy.sql import func

from app.database import Base
from sqlalchemy.orm import relationship



class Category(Base):
    """
    SQLAlchemy model for the categories table.
    """

    __tablename__ = "categories"
    __table_args__ = {"schema": "rms"}

    category_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    category_name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )
    
    
    menu_items = relationship(
        "MenuItem",
        back_populates="category",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Category(category_id={self.category_id}, category_name='{self.category_name}')>"