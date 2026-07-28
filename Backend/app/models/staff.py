from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Boolean,
    TIMESTAMP,
    Enum
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base
from app.enums import StaffRole, StaffStatus


class Staff(Base):

    __tablename__ = "staff"
    __table_args__ = {"schema": "rms"}

    staff_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    mobile = Column(
        String(15),
        unique=True,
        nullable=False
    )
    
    mobile_verified = Column(   
        Boolean,
        nullable=False,
        default=False,
        server_default="false"
    )

    mobile_verified_at = Column(
        TIMESTAMP,
        nullable=True
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    role = Column(
        Enum(
            StaffRole,
            name="staff_role",
            schema="rms",
            create_type=False
        ),
        nullable=False
    )

    status = Column(
        Enum(
            StaffStatus,
            name="staff_status",
            schema="rms",
            create_type=False
        ),
        nullable=False,
        server_default=StaffStatus.ACTIVE.value
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

    # ------------------------------------
    # Relationships
    # ------------------------------------

    waiter_orders = relationship(
        "Order",
        foreign_keys="Order.waiter_id",
        back_populates="waiter"
    )

    chef_orders = relationship(
        "Order",
        foreign_keys="Order.chef_id",
        back_populates="chef"
    )
    
    
    table_requests = relationship(
        "TableRequest",
        back_populates="waiter"
    )
    
    sessions = relationship(
        "CustomerSession",
        back_populates="waiter"
    )
    
    service_requests = relationship(
        "ServiceRequest"
    )
    
    
    def __repr__(self):

        return (
            f"<Staff("
            f"id={self.staff_id}, "
            f"name='{self.full_name}', "
            f"role='{self.role.value}', "
            f"status='{self.status.value}')>"
        )
        
