from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .token_utils import verify_token


security = HTTPBearer()


def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to get current user ID from JWT token"""
    token = credentials.credentials
    user_id = verify_token(token)
    return user_id