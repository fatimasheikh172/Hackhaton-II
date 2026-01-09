from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional
from datetime import datetime
import uuid
import os

# Use a temporary database for testing
test_db_path = 'backend/test_todo_app.db'
if os.path.exists(test_db_path):
    os.remove(test_db_path)

# Create a new database engine with the test database
engine = create_engine(f"sqlite:///{test_db_path}")

# Import the User model
from backend.app.models.user import User

# Create the tables
SQLModel.metadata.create_all(engine)

# Check the actual schema
import sqlite3
conn = sqlite3.connect(test_db_path)
cursor = conn.cursor()
cursor.execute('PRAGMA table_info(users);')
schema = cursor.fetchall()
print("Users table schema:")
for col in schema:
    print(f"  {col}")

# Try to insert a test user
try:
    with Session(engine) as session:
        # Create a new user
        new_user = User(
            email="test@example.com",
            full_name="Test User",
            hashed_password="hashed_password_here"
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        print(f"\nUser created successfully!")
        print(f"User ID: {new_user.id}")
        print(f"User Email: {new_user.email}")
except Exception as e:
    print(f"\nError creating user: {e}")
    import traceback
    traceback.print_exc()

conn.close()