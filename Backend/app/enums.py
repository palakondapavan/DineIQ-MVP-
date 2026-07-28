from enum import Enum


# ==========================
# Staff Roles
# ==========================

class StaffRole(str, Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    WAITER = "WAITER"
    CHEF = "CHEF"
    CASHIER = "CASHIER"


# ==========================
# Staff Status
# ==========================

class StaffStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


# ==========================
# Table Status
# ==========================

class TableStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"
    RESERVED = "RESERVED"
    OUT_OF_SERVICE = "OUT_OF_SERVICE"


# ==========================
# Table Section
# ==========================

class TableSection(str, Enum):
    AC = "AC"
    NON_AC = "NON_AC"
    OUTDOOR = "OUTDOOR"
    VIP = "VIP"


# ==========================
# Food Type
# ==========================

class FoodType(str, Enum):
    VEG = "VEG"
    NON_VEG = "NON_VEG"
    EGG = "EGG"


# ==========================
# Order Status
# ==========================

class OrderStatus(str, Enum):
    PLACED = "PLACED"
    ACCEPTED = "ACCEPTED"
    PREPARING = "PREPARING"
    READY = "READY"
    SERVED = "SERVED"
    CANCELLED = "CANCELLED"


# ==========================
# Customer Session Status
# ==========================

class SessionStatus(str, Enum):
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


# ==========================
# Bill Status
# ==========================

class BillStatus(str, Enum):
    PENDING = "PENDING"
    PAID = "PAID"


# ==========================
# Payment Method
# ==========================

class PaymentMethod(str, Enum):
    CASH = "CASH"
    CARD = "CARD"
    UPI = "UPI"


# ==========================
# Payment Status
# ==========================

class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


# ==========================
# Menu Variant
# ==========================

class VariantName(str, Enum):
    MINI = "Mini"
    HALF = "Half"
    FULL = "Full"
    REGULAR = "Regular"
    LARGE = "Large"
    FAMILY = "Family"