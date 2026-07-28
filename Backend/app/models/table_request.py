from sqlalchemy import (
    Column,
    BigInteger,
    TIMESTAMP,
    ForeignKey,
    Enum
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

import enum

from app.database import Base
from sqlalchemy import String

# ----------------------------------------
# Table Request Status Enum
# ----------------------------------------

class TableRequestStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"


# ----------------------------------------
# Table Request Model
# ----------------------------------------

class TableRequest(Base):

    __tablename__ = "table_requests"
    __table_args__ = {"schema": "rms"}

    request_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    table_id = Column(
        BigInteger,
        ForeignKey(
            "rms.restaurant_tables.table_id"
        ),
        nullable=False
    )
    
    customer_name = Column(
        String(100),
        nullable=False
    )

    customer_mobile = Column(
        String(15),
        nullable=False
    )

    waiter_id = Column(
        BigInteger,
        ForeignKey(
            "rms.staff.staff_id"
        ),
        nullable=True
    )

    status = Column(
        Enum(
            TableRequestStatus,
            name="table_request_status",
            schema="rms"
        ),
        nullable=False,
        server_default="PENDING"
    )

    requested_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    accepted_at = Column(
        TIMESTAMP,
        nullable=True
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    table = relationship(
        "RestaurantTable",
        back_populates="table_requests"
    )

    waiter = relationship(
        "Staff",
        back_populates="table_requests"
    )