from sqlalchemy import (
    Column,
    BigInteger,
    String,
    TIMESTAMP,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class CustomerSession(Base):
    __tablename__ = "customer_sessions"
    __table_args__ = {"schema": "rms"}

    session_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    table_id = Column(
        BigInteger,
        ForeignKey("rms.restaurant_tables.table_id"),
        nullable=False
    )
    
    waiter_id = Column(
        BigInteger,
        ForeignKey("rms.staff.staff_id"),
        nullable=True
    )

    customer_name = Column(
        String(100),
        nullable=True
    )

    customer_mobile = Column(
        String(15),
        nullable=True
    )

    status = Column(
        String(20),
        nullable=False,
        server_default="ACTIVE"
    )

    started_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    ended_at = Column(
        TIMESTAMP,
        nullable=True
    )

    table = relationship(
        "RestaurantTable",
        back_populates="sessions"
    )

    orders = relationship(
        "Order",
        back_populates="session",
        cascade="all, delete-orphan"
    )
    
    bills = relationship(
        "Bill",
        back_populates="session"
    )
    
    waiter = relationship(
        "Staff",
        back_populates="sessions"
    )
    
    service_requests = relationship(
        "ServiceRequest",
        back_populates="session",
        cascade="all, delete-orphan"
    )