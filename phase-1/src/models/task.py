from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Task:
    """
    Represents a single todo item with id, title, description, status, and creation timestamp.
    """
    id: int
    title: str
    description: Optional[str] = None
    status: str = "Pending"  # Can be "Pending" or "Completed"
    created_at: datetime = None

    def __post_init__(self):
        """Set created_at to current datetime if not provided."""
        if self.created_at is None:
            self.created_at = datetime.now()