from fastapi import APIRouter
from app.api.v1.auth import routes as auth_routes
from app.api.v1.tasks import routes as task_routes


api_router = APIRouter()

# Include authentication routes
api_router.include_router(auth_routes.router, prefix="/auth", tags=["auth"])

# Include task routes
api_router.include_router(task_routes.router, prefix="/tasks", tags=["tasks"])