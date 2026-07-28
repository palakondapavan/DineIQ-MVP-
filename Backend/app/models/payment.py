from sqlalchemy import (
    Column,
    BigInteger,
    Numeric,
    String,
    TIMESTAMP,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class Payment(Base):

    __tablename__ = "payments"
    __table_args__ = {"schema": "rms"}

    payment_id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    bill_id = Column(
        BigInteger,
        ForeignKey("rms.bills.bill_id"),
        nullable=False,
        unique=True
    )

    payment_method = Column(
        String(30),
        nullable=False
    )

    amount = Column(
        Numeric(10, 2),
        nullable=False
    )

    payment_status = Column(
        String(20),
        nullable=False,
        server_default="PENDING"
    )

    transaction_reference = Column(
        String(100),
        nullable=True
    )

    paid_at = Column(
        TIMESTAMP,
        nullable=True
    )

    bill = relationship(
        "Bill",
        back_populates="payment"
    )