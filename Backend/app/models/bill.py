from sqlalchemy import (
    Column,
    BigInteger,
    Numeric,
    TIMESTAMP,
    ForeignKey,
    String
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Bill(Base):

    __tablename__ = "bills"
    __table_args__ = {"schema": "rms"}

    bill_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    session_id = Column(
        BigInteger,
        ForeignKey("rms.customer_sessions.session_id"),
        nullable=False
    )
    

    subtotal = Column(
        Numeric(10, 2),
        nullable=False
    )

    gst = Column(
        Numeric(10, 2),
        nullable=False,
        server_default="0"
    )

    discount = Column(
        Numeric(10, 2),
        nullable=False,
        server_default="0"
    )

    grand_total = Column(
        Numeric(10, 2),
        nullable=False
    )

    bill_status = Column(
        String(20),
        nullable=False,
        server_default="PENDING"
    )

    generated_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    # -----------------------------
    # Relationships
    # -----------------------------

    session = relationship(
        "CustomerSession",
        back_populates="bills"
    )


    
    payment = relationship(
        "Payment",
        back_populates="bill",
        uselist=False
    )