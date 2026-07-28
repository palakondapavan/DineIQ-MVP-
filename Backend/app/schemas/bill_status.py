from enum import Enum


class BillStatus(str, Enum):

    PENDING = "PENDING"

    PAID = "PAID"

    CANCELLED = "CANCELLED"