from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
from datetime import datetime
import uuid
from datetime import timezone


class TaskBase(SQLModel):
    title: str = Field(max_length=255, nullable=False)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: str = Field(default="pending", max_length=20)
    priority: str = Field(default="medium", max_length=10)
    due_date: Optional[datetime] = Field(default=None)
    user_id: str = Field(max_length=255, nullable=False)  # Store user_id as string from JWT


class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskCreate(TaskBase):
    # user_id is set by the backend from JWT, so it's not required in creation
    pass