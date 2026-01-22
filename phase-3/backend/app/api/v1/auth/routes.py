from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from typing import Any
from passlib.context import CryptContext
from datetime import timedelta
import uuid
from ....database.database import get_session
from ....models.user import User, UserCreate, UserLogin
from ....schemas.user import UserResponse
from ....auth.token_utils import create_access_token
from ....auth.dependencies import get_current_user_id
from ....core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


import traceback

@router.post("/register", response_model=UserResponse)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user"""
    try:
        # Validate email format (basic validation)
        if not user_create.email or '@' not in user_create.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )

        # Validate password strength (minimum length)
        if len(user_create.password) < 6:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 6 characters long"
            )

        # Check if user already exists
        existing_user = session.exec(select(User).where(User.email == user_create.email)).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Hash the password
        hashed_password = get_password_hash(user_create.password)

        # Create new user
        db_user = User(
            email=user_create.email,
            full_name=user_create.full_name,
            hashed_password=hashed_password
        )
        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        return UserResponse(
            id=db_user.id,
            email=db_user.email,
            full_name=db_user.full_name,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        # Log the actual error for debugging
        print(f"Registration error: {e}")
        print(f"Error type: {type(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login")
def login(user_login: UserLogin, session: Session = Depends(get_session)):
    """Authenticate user and return access token"""
    try:
        # Find user by email
        user = session.exec(select(User).where(User.email == user_login.email)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Verify password
        if not verify_password(user_login.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        # Log the actual error for debugging
        print(f"Login error: {e}")
        print(f"Error type: {type(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )


@router.get("/profile", response_model=UserResponse)
def get_profile(
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """Get current user's profile information"""
    # Debug the user ID
    print(f"Profile endpoint - current_user_id: {current_user_id}, type: {type(current_user_id)}")

    # Convert the string user_id to UUID for comparison with database
    try:
        user_uuid = uuid.UUID(current_user_id)
        user = session.exec(select(User).where(User.id == user_uuid)).first()
    except ValueError:
        # If current_user_id is not a valid UUID string
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )

    print(f"Profile endpoint - found user: {user}")

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        created_at=user.created_at,
        updated_at=user.updated_at
    )