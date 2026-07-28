from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.bill import (
    BillGenerate,
    BillResponse
)

from app.services.bill_service import (
    BillService
)

from app.dependencies.auth import (
    require_roles
)

router = APIRouter(
    prefix="/bills",
    tags=["Bills"]
)


# --------------------------------------------------
# Generate Bill
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.post(
    "/generate",
    response_model=BillResponse,
    status_code=status.HTTP_201_CREATED
)
def generate_bill(
    bill: BillGenerate,
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

        return BillService.generate_bill(
            db,
            bill
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# --------------------------------------------------
# Get All Bills
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[BillResponse]
)
def get_all_bills(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    return BillService.get_all_bills(db)


# --------------------------------------------------
# Get Bill By ID
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.get(
    "/{bill_id}",
    response_model=BillResponse
)
def get_bill(
    bill_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    bill = BillService.get_bill(
        db,
        bill_id
    )

    if not bill:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bill not found."
        )

    return bill


# --------------------------------------------------
# Mark Bill Paid
# ADMIN, MANAGER, CASHIER
# --------------------------------------------------

@router.put(
    "/{bill_id}/pay",
    response_model=BillResponse
)
def mark_bill_paid(
    bill_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "ADMIN",
            "MANAGER",
            "CASHIER"
        )
    )
):

    bill = BillService.mark_bill_paid(
        db,
        bill_id
    )

    if not bill:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bill not found."
        )

    return bill


# ----------------------------------------
# Cancel Bill
# ----------------------------------------

@router.put(
    "/{bill_id}/cancel",
    response_model=BillResponse
)
def cancel_bill(
    bill_id: int,
    db: Session = Depends(get_db)
):

    try:

        bill = BillService.cancel_bill(
            db,
            bill_id
        )

        if not bill:

            raise HTTPException(
                status_code=404,
                detail="Bill not found."
            )

        return bill

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )