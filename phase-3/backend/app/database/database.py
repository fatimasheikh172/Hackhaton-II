from sqlmodel import create_engine, Session
from typing import Generator
from ..core.config import settings
from ..models.user import User
from ..models.task import Task
from sqlmodel import SQLModel


# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=True,  # Set to False in production
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)


def create_db_and_tables():
    """Create database tables for all models"""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session