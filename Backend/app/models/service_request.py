from enum import Enum

from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    TIMESTAMP,
    Enum as SQLEnum
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class ServiceRequestType(str, Enum):
    WAITER = "WAITER"
    WATER = "WATER"
    BILL = "BILL"
    ASSISTANCE = "ASSISTANCE"


class ServiceRequestStatus(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"


class ServiceRequest(Base):

    __tablename__ = "service_requests"
    __table_args__ = {"schema": "rms"}

    request_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    session_id = Column(
        BigInteger,
        ForeignKey(
            "rms.customer_sessions.session_id"
        ),
        nullable=False
    )

    waiter_id = Column(
        BigInteger,
        ForeignKey("rms.staff.staff_id"),
        nullable=True
    )

    request_type = Column(
        SQLEnum(
            ServiceRequestType,
            name="service_request_type",
            schema="rms",
            create_type=False
        ),
        nullable=False
    )

    status = Column(
        SQLEnum(
            ServiceRequestStatus,
            name="service_request_status",
            schema="rms",
            create_type=False
        ),
        nullable=False,
        default=ServiceRequestStatus.PENDING
    )

    requested_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    completed_at = Column(
        TIMESTAMP,
        nullable=True
    )

    session = relationship(
        "CustomerSession",
        back_populates="service_requests"
    )

    waiter = relationship(
        "Staff"
    )