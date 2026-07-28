from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.customer_menu import CustomerMenuResponse

from app.services.customer_menu_service import (
    CustomerMenuService,
)

router = APIRouter(
    prefix="/customer",
    tags=["Customer Menu"],
)


# ----------------------------------------
# Customer Menu
# ----------------------------------------

@router.get(
    "/menu",
    response_model=CustomerMenuResponse,
)
def get_customer_menu(
    db: Session = Depends(get_db),
):

    return CustomerMenuService.get_menu(db)