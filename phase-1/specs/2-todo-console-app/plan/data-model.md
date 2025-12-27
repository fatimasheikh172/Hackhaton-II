# Data Model: Todo Console App

## Entities

### Task
**Description**: Represents a single todo item with id, title, description, status, and creation timestamp

**Fields**:
- `id`: int or str (unique identifier)
- `title`: str (required, short summary)
- `description`: str (optional, detailed info)
- `status`: str (enum: "Pending" or "Completed")
- `created_at`: datetime (timestamp when task was created)

**Validation Rules**:
- `id` must be unique within the session
- `title` is required and must not be empty
- `status` must be one of "Pending" or "Completed"
- `created_at` is set automatically when task is created

**State Transitions**:
- Initial state: "Pending"
- Can transition to: "Completed"

### TaskList
**Description**: Collection of Task objects maintained in memory during the session

**Fields**:
- `_tasks`: List[Task] (private list storing all tasks)

**Operations**:
- Add Task
- Get all Tasks
- Get Task by ID
- Update Task
- Delete Task
- Mark Task as Complete

## Relationships
- TaskList contains multiple Task entities
- Each Task belongs to one TaskList (in memory)

## Constraints
- Task IDs must be unique within the TaskList
- Tasks are only persisted for the duration of the session
- No duplicate tasks allowed