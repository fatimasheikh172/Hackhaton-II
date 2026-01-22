from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid
from datetime import timezone


class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False, max_length=255)
    full_name: Optional[str] = Field(default=None, max_length=255)


class User(UserBase, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str = Field(nullable=False, max_length=255)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class UserCreate(UserBase):
    password: str
    email: str
    full_name: Optional[str] = None


class UserLogin(SQLModel):
    email: str
    password: str


class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime