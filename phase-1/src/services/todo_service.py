from typing import List, Optional
from src.models.task import Task
from src.repositories.memory_repo import InMemoryRepository


class TodoService:
    """
    Service class that handles business logic for todo operations.
    """

    def __init__(self, repository: InMemoryRepository = None):
        """
        Initialize the service with a repository.

        Args:
            repository: The repository to use for data storage (defaults to new InMemoryRepository)
        """
        self.repository = repository or InMemoryRepository()

    def add_task(self, title: str, description: str = None) -> Task:
        """
        Add a new task with the given title and optional description.

        Args:
            title: The title of the task
            description: The description of the task (optional)

        Returns:
            The created task with assigned ID and timestamp

        Raises:
            ValueError: If title is empty or None
        """
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        task = Task(
            id=0,  # Will be assigned by repository
            title=title.strip(),
            description=description.strip() if description else None,
            status="Pending"
        )
        return self.repository.add(task)

    def list_tasks(self) -> List[Task]:
        """
        Get all tasks.

        Returns:
            A list of all tasks
        """
        return self.repository.get_all()

    def update_task(self, task_id: int, title: str = None, description: str = None) -> Optional[Task]:
        """
        Update an existing task's title and/or description.

        Args:
            task_id: The ID of the task to update
            title: New title (optional)
            description: New description (optional)

        Returns:
            The updated task if found, None otherwise
        """
        # Prepare update parameters, cleaning the strings if provided
        clean_title = title.strip() if title else None
        clean_description = description.strip() if description else None

        return self.repository.update(
            task_id=task_id,
            title=clean_title,
            description=clean_description
        )

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: The ID of the task to delete

        Returns:
            True if the task was found and deleted, False otherwise
        """
        return self.repository.delete(task_id)

    def complete_task(self, task_id: int) -> Optional[Task]:
        """
        Mark a task as completed.

        Args:
            task_id: The ID of the task to mark as completed

        Returns:
            The updated task if found, None otherwise
        """
        return self.repository.update(task_id=task_id, status="Completed")

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id: The ID of the task to retrieve

        Returns:
            The task if found, None otherwise
        """
        return self.repository.get_by_id(task_id)