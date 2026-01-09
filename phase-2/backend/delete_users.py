#!/usr/bin/env python3
"""
Script to delete specific users by email from the database
"""

import os
import sys
from sqlmodel import SQLModel, create_engine, Session, select
from app.models.user import User
from app.models.task import Task
from app.database.database import engine


def delete_users_by_email(emails_to_delete):
    """Delete users by their email addresses"""
    with Session(engine) as session:
        deleted_count = 0

        for email in emails_to_delete:
            # Find user by email
            statement = select(User).where(User.email == email)
            user = session.exec(statement).first()

            if user:
                # Delete user's tasks first (due to foreign key constraints)
                task_statement = select(Task).where(Task.user_id == str(user.id))
                user_tasks = session.exec(task_statement).all()

                for task in user_tasks:
                    session.delete(task)

                # Delete the user
                session.delete(user)
                deleted_count += 1
                print(f"Deleted user with email: {email}")
            else:
                print(f"User with email {email} not found in database")

        session.commit()
        print(f"Successfully deleted {deleted_count} users and their associated tasks")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python clear_users.py <email1> [email2] [email3] ...")
        print("Example: python clear_users.py user@example.com another@example.com")
        sys.exit(1)

    emails_to_delete = sys.argv[1:]

    # Check if database file exists
    if not os.path.exists("todo_app.db"):
        print("Database file does not exist!")
        sys.exit(1)

    delete_users_by_email(emails_to_delete)
    print("Users have been deleted successfully!")