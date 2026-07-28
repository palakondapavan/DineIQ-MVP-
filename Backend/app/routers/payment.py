from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse
)

from app.services.payment_service import (
    PaymentService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


# --------------------------------------------------
# Make Payment
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.post(
    "/pay",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED
)
def make_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    try:

        return PaymentService.make_payment(
            db,
            payment
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# --------------------------------------------------
# Get All Payments
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[PaymentResponse]
)
def get_all_payments(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    return PaymentService.get_all_payments(db)


# --------------------------------------------------
# Get Payment By ID
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.get(
    "/{payment_id}",
    response_model=PaymentResponse
)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    payment = PaymentService.get_payment(
        db,
        payment_id
    )

    if not payment:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found."
        )

    return payment