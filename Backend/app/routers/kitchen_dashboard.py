from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.enums import StaffRole

from app.schemas.kitchen_dashboard import (
    KitchenDashboardResponse
)

from app.services.kitchen_dashboard_service import (
    KitchenDashboardService
)

router = APIRouter(
    prefix="/kitchen",
    tags=["Kitchen Dashboard"]
)


@router.get(
    "/dashboard",
    response_model=KitchenDashboardResponse
)
def kitchen_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user.role not in (
        StaffRole.CHEF,
        StaffRole.ADMIN
    ):

        raise HTTPException(
            status_code=403,
            detail="Only chefs or admins can access the kitchen dashboard."
        )

    return KitchenDashboardService.get_dashboard(
        db
    )