from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Integer,
    Boolean,
    TIMESTAMP,
    Text,
    Enum
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class RestaurantTable(Base):
    """
    Restaurant Tables Model
    """

    __tablename__ = "restaurant_tables"
    __table_args__ = {"schema": "rms"}

    table_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    table_number = Column(
        String(20),
        unique=True,
        nullable=False
    )

    capacity = Column(
        Integer,
        nullable=False
    )

    section = Column(
        Enum(
            "NON_AC",
            "AC",
            name="table_section"
        ),
        nullable=False
    )

    status = Column(
        Enum(
            "AVAILABLE",
            "OCCUPIED",
            "RESERVED",
            "OUT_OF_SERVICE",
            name="table_status"
        ),
        nullable=False,
        server_default="AVAILABLE"
    )

    qr_code = Column(
        Text,
        nullable=True
    )

    is_active = Column(
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

    sessions = relationship(
        "CustomerSession",
        back_populates="table"
    )

    def __repr__(self):
        return (
            f"<RestaurantTable("
            f"id={self.table_id}, "
            f"table='{self.table_number}', "
            f"status='{self.status}')>"
        )
        
    table_requests = relationship(
        "TableRequest",
        back_populates="table",
        cascade="all, delete-orphan"
    )