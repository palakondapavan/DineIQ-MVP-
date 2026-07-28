from fastapi import APIRouter

from app.routers.category import router as category_router
from app.routers.menu_item import router as menu_item_router
from app.routers.menu_variant import router as menu_variant_router
from app.routers.staff import router as staff_router
from app.routers.restaurant_table import router as restaurant_table_router
from app.routers.customer_session import router as customer_session_router
from app.routers.order import router as order_router
from app.routers.bill import router as bill_router
from app.routers.payment import router as payment_router
from app.routers.auth import router as auth_router
from app.routers.kitchen import router as kitchen_router
from app.routers.table_request import router as table_request_router    
from app.routers.customer import router as customer_router    
from app.routers.service_request import router as service_request_router
from app.routers.waiter_dashboard import router as waiter_dashboard_router
from app.routers.kitchen_dashboard import router as kitchen_dashboard_router
from app.routers.customer_menu import router as customer_menu_router

api_router = APIRouter(
    prefix="/api/v1"
)

api_router.include_router(category_router)
api_router.include_router(menu_item_router)
api_router.include_router(menu_variant_router)
api_router.include_router(staff_router)
api_router.include_router(restaurant_table_router)
api_router.include_router(customer_session_router)
api_router.include_router(order_router)
api_router.include_router(bill_router)
api_router.include_router(payment_router)
api_router.include_router(auth_router)
api_router.include_router(kitchen_router)
api_router.include_router(table_request_router)
api_router.include_router(customer_router)
api_router.include_router(service_request_router )
api_router.include_router(waiter_dashboard_router)
api_router.include_router(kitchen_dashboard_router)
api_router.include_router(customer_menu_router)
