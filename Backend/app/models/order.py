from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Numeric,
    TIMESTAMP,
    ForeignKey,
    Text
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Order(Base):

    __tablename__ = "orders"
    __table_args__ = {"schema": "rms"}

    order_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    session_id = Column(
        BigInteger,
        ForeignKey("rms.customer_sessions.session_id"),
        nullable=False
    )

    waiter_id = Column(
        BigInteger,
        ForeignKey("rms.staff.staff_id"),
        nullable=True
    )

    chef_id = Column(
        BigInteger,
        ForeignKey("rms.staff.staff_id"),
        nullable=True
    )

    status = Column(
        String(20),
        nullable=False,
        server_default="PLACED"
    )

    remarks = Column(
        Text,
        nullable=True
    )

    total_amount = Column(
        Numeric(10, 2),
        nullable=False,
        server_default="0"
    )

    # Matches PostgreSQL column
    ordered_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    # ------------------------------------
    # Relationships
    # ------------------------------------

    session = relationship(
        "CustomerSession",
        back_populates="orders"
    )

    waiter = relationship(
        "Staff",
        foreign_keys=[waiter_id],
        back_populates="waiter_orders"
    )

    chef = relationship(
        "Staff",
        foreign_keys=[chef_id],
        back_populates="chef_orders"
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin"
    )

