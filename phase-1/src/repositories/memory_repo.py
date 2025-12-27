from typing import Dict, List, Optional
from src.models.task import Task


class InMemoryRepository:
    """
    Repository class that stores tasks in memory using a dictionary.
    """

    def __init__(self):
        """Initialize the repository with an empty dictionary to store tasks."""
        self._tasks: Dict[int, Task] = {}
        self._next_id = 1

    def get_next_id(self) -> int:
        """Get the next available ID and increment the counter."""
        current_id = self._next_id
        self._next_id += 1
        return current_id

    def add(self, task: Task) -> Task:
        """
        Add a task to the repository.

        Args:
            task: The task to add

        Returns:
            The added task with assigned ID
        """
        if task.id is None or task.id == 0:
            task.id = self.get_next_id()
        self._tasks[task.id] = task
        return task

    def get_all(self) -> List[Task]:
        """
        Retrieve all tasks from the repository.

        Returns:
            A list of all tasks
        """
        return list(self._tasks.values())

    def get_by_id(self, task_id: int) -> Optional[Task]:
        """
        Retrieve a specific task by its ID.

        Args:
            task_id: The ID of the task to retrieve

        Returns:
            The task if found, None otherwise
        """
        return self._tasks.get(task_id)

    def update(self, task_id: int, title: str = None, description: str = None, status: str = None) -> Optional[Task]:
        """
        Update an existing task's fields.

        Args:
            task_id: The ID of the task to update
            title: New title (optional)
            description: New description (optional)
            status: New status (optional)

        Returns:
            The updated task if found, None otherwise
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None

        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if status is not None:
            task.status = status

        return task

    def delete(self, task_id: int) -> bool:
        """
        Remove a task from the repository.

        Args:
            task_id: The ID of the task to remove

        Returns:
            True if the task was found and removed, False otherwise
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False