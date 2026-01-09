from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ....auth.dependencies import get_current_user_id
from ....schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
from ....models.task import Task
from ....database.database import get_session
from sqlmodel import Session, select, and_
from sqlalchemy import func
from datetime import datetime, timezone
import uuid


router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=TaskListResponse)
def get_tasks(
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session),
    status: Optional[str] = Query(None, description="Filter by task status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    limit: int = Query(20, ge=1, le=100, description="Number of tasks to return"),
    offset: int = Query(0, ge=0, description="Number of tasks to skip")
):
    """
    Get all tasks for the authenticated user with optional filtering and pagination.
    """
    # Build query with user_id filter
    query = select(Task).where(Task.user_id == current_user_id)

    # Apply filters
    if status:
        query = query.where(Task.status == status)
    if priority:
        query = query.where(Task.priority == priority)

    # Apply pagination
    query = query.offset(offset).limit(limit)

    tasks = session.exec(query).all()

    # Get total count for pagination
    count_query = select(Task).where(Task.user_id == current_user_id)
    if status:
        count_query = count_query.where(Task.status == status)
    if priority:
        count_query = count_query.where(Task.priority == priority)
    # Execute the count query separately
    total = session.exec(select(func.count()).select_from(count_query.subquery())).one()

    # Convert tasks to response format
    task_responses = []
    for task in tasks:
        task_responses.append(TaskResponse(
            id=task.id,
            title=task.title,
            description=task.description,
            status=task.status,
            priority=task.priority,
            due_date=task.due_date,
            user_id=task.user_id,
            created_at=task.created_at,
            updated_at=task.updated_at
        ))

    return TaskListResponse(
        tasks=task_responses,
        total=total
    )


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user.
    """
    # Create task with current user_id
    db_task = Task(
        **task_create.model_dump(),
        user_id=current_user_id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return TaskResponse(
        id=db_task.id,
        title=db_task.title,
        description=db_task.description,
        status=db_task.status,
        priority=db_task.priority,
        due_date=db_task.due_date,
        user_id=db_task.user_id,
        created_at=db_task.created_at,
        updated_at=db_task.updated_at
    )


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the authenticated user.
    """
    # Check if task exists and belongs to current user
    task = session.exec(
        select(Task).where(
            and_(Task.id == task_id, Task.user_id == current_user_id)
        )
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return TaskResponse(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        due_date=task.due_date,
        user_id=task.user_id,
        created_at=task.created_at,
        updated_at=task.updated_at
    )


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: uuid.UUID,
    task_update: TaskUpdate,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Update a specific task by ID for the authenticated user.
    """
    # Check if task exists and belongs to current user
    task = session.exec(
        select(Task).where(
            and_(Task.id == task_id, Task.user_id == current_user_id)
        )
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update task with provided fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    task.updated_at = datetime.now(timezone.utc)
    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskResponse(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        due_date=task.due_date,
        user_id=task.user_id,
        created_at=task.created_at,
        updated_at=task.updated_at
    )


@router.patch("/{task_id}/complete", response_model=TaskResponse)
def mark_task_complete(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Mark a specific task as complete for the authenticated user.
    """
    # Check if task exists and belongs to current user
    task = session.exec(
        select(Task).where(
            and_(Task.id == task_id, Task.user_id == current_user_id)
        )
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update task status to completed
    task.status = "completed"
    task.updated_at = datetime.now(timezone.utc)
    session.add(task)
    session.commit()
    session.refresh(task)

    return TaskResponse(
        id=task.id,
        title=task.title,
        description=task.description,
        status=task.status,
        priority=task.priority,
        due_date=task.due_date,
        user_id=task.user_id,
        created_at=task.created_at,
        updated_at=task.updated_at
    )


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: uuid.UUID,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task by ID for the authenticated user.
    """
    # Check if task exists and belongs to current user
    task = session.exec(
        select(Task).where(
            and_(Task.id == task_id, Task.user_id == current_user_id)
        )
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    session.delete(task)
    session.commit()

    # For 204 No Content, return nothing