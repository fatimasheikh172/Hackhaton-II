from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from fastapi import HTTPException, status
from ..core.config import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token with expiration"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)  # Default 30 minutes

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        print(f"Token payload: {payload}")
        print(f"Extracted user_id: {user_id}, type: {type(user_id)}")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        return user_id
    except jwt.JWTError as e:
        print(f"JWT Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )