from sqlmodel import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os


# Create the database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # Set to True to see SQL queries in development
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,    # Recycle connections every 5 minutes
)


# Create a configured "SessionLocal" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session():
    """
    Dependency function that provides a SQLModel session for use with FastAPI.

    Yields a session for use in API endpoints and automatically closes it.
    """
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def create_db_and_tables():
    """
    Create database tables based on SQLModel models.

    This function should be called during application startup to ensure
    all required tables exist in the database.
    """
    from app.models.user import User
    from app.models.task import Task

    # Import all models to ensure they are registered with SQLModel
    # This is necessary for create_all() to work properly

    # Create all tables
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)