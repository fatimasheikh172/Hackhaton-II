# Feature Specification: Todo Console App

**Feature Branch**: `2-todo-console-app`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "# Specification: In-Memory Todo Console App

## Objective
Build a CLI tool to manage tasks during a single session (non-persistent).

## Data Model
**Task Object:**
- `id` (int or uuid): Unique identifier.
- `title` (str): Short summary.
- `description` (str): Detailed info.
- `status` (str/enum): \"Pending\" or \"Completed\".
- `created_at` (datetime): Timestamp.

## Functional Requirements

1.  **Add Task:**
    - Input: Title (required), Description (optional).
    - Output: Confirmation message with Task ID.
2.  **List Tasks:**
    - Input: None.
    - Output: A table displaying ID, Title, Status, and Created Date.
    - Logic: Use `rich` table for display. Color-code status (Green for done, Red for pending).
3.  **Update Task:**
    - Input: Task ID, New Title, New Description.
    - Logic: Check if ID exists. Update provided fields.
4.  **Delete Task:**
    - Input: Task ID.
    - Logic: Remove from memory. Return error if ID not found.
5.  **Mark Complete:**
    - Input: Task ID.
    - Logic: Change status to \"Completed\".

## User Interface (CLI)
Commands:
- `python main.py add \"Title\" --desc \"Description\"`
- `python main.py list`
- `python main.py update <ID> --title \"New\"`
- `python main.py delete <ID>`
- `python main.py complete <ID>`"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add New Task (Priority: P1)

As a user, I want to add new tasks to my todo list so I can keep track of things I need to do.

**Why this priority**: This is the foundational functionality that allows users to begin using the todo app - without the ability to add tasks, other features are meaningless.

**Independent Test**: Can be fully tested by running `python main.py add "My Task"` and verifying that a task is created with a unique ID and proper status.

**Acceptance Scenarios**:

1. **Given** I have the todo app installed, **When** I run `python main.py add "Buy groceries"`, **Then** a new task is created with a unique ID and status "Pending"
2. **Given** I have the todo app installed, **When** I run `python main.py add "Buy groceries" --desc "Milk, bread, eggs"`, **Then** a new task is created with title "Buy groceries", description "Milk, bread, eggs", and status "Pending"

---

### User Story 2 - List All Tasks (Priority: P1)

As a user, I want to see all my tasks in a formatted table so I can review what needs to be done.

**Why this priority**: Essential for users to see their tasks and manage them effectively. This provides visibility into all tasks.

**Independent Test**: Can be fully tested by adding a task and then running `python main.py list` to display the task in a properly formatted table.

**Acceptance Scenarios**:

1. **Given** I have added tasks to my todo list, **When** I run `python main.py list`, **Then** all tasks are displayed in a table with ID, Title, Status, and Created Date columns
2. **Given** I have tasks with different statuses, **When** I run `python main.py list`, **Then** completed tasks are shown in green and pending tasks are shown in red

---

### User Story 3 - Mark Task as Complete (Priority: P2)

As a user, I want to mark tasks as complete when I finish them so I can track my progress.

**Why this priority**: Critical for task management workflow - users need to indicate when tasks are completed.

**Independent Test**: Can be fully tested by adding a task, running `python main.py complete <ID>`, and verifying the task status changes to "Completed".

**Acceptance Scenarios**:

1. **Given** I have a pending task with ID 1, **When** I run `python main.py complete 1`, **Then** the task status changes to "Completed"
2. **Given** I have a task with an invalid ID, **When** I run `python main.py complete 999`, **Then** an appropriate error message is displayed

---

### User Story 4 - Update Task Details (Priority: P3)

As a user, I want to update task details like title and description so I can keep my tasks current.

**Why this priority**: Allows users to modify tasks when requirements or details change.

**Independent Test**: Can be fully tested by adding a task, updating its title with `python main.py update <ID> --title "New Title"`, and verifying the change.

**Acceptance Scenarios**:

1. **Given** I have a task with ID 1, **When** I run `python main.py update 1 --title "Updated Title"`, **Then** the task title is updated while other fields remain unchanged
2. **Given** I have a task with ID 1, **When** I run `python main.py update 1 --title "Updated Title" --desc "Updated Description"`, **Then** both the title and description are updated

---

### User Story 5 - Delete Task (Priority: P3)

As a user, I want to delete tasks I no longer need so I can keep my todo list clean.

**Why this priority**: Allows users to remove obsolete or irrelevant tasks from their list.

**Independent Test**: Can be fully tested by adding a task, deleting it with `python main.py delete <ID>`, and verifying it's no longer in the list.

**Acceptance Scenarios**:

1. **Given** I have a task with ID 1, **When** I run `python main.py delete 1`, **Then** the task is removed from memory and no longer appears in the list
2. **Given** I try to delete a task with an invalid ID, **When** I run `python main.py delete 999`, **Then** an appropriate error message is displayed

---

### Edge Cases

- What happens when trying to update/delete/complete a task that doesn't exist?
- How does the system handle tasks with special characters in titles or descriptions?
- What happens when no tasks exist and the user runs `list` command?
- How does the system handle very long titles or descriptions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add new tasks with a required title and optional description
- **FR-002**: System MUST assign a unique ID and creation timestamp to each new task
- **FR-003**: System MUST maintain tasks in memory during the current session using a simple global variable with list/dict
- **FR-004**: System MUST display all tasks in a formatted table with ID, Title, Status, and Created Date using rich library
- **FR-005**: System MUST color-code task status (green for completed, red for pending) using rich library
- **FR-006**: System MUST allow users to update existing task title and description by ID
- **FR-007**: System MUST allow users to delete tasks by ID
- **FR-008**: System MUST allow users to mark tasks as completed by ID
- **FR-009**: System MUST validate that requested task IDs exist before performing update/delete/complete operations
- **FR-010**: System MUST provide appropriate error messages when invalid task IDs are used
- **FR-011**: System MUST use typer library for CLI command parsing and handling

### Key Entities *(include if feature involves data)*

- **Task**: Represents a single todo item with id, title, description, status, and creation timestamp
- **TaskList**: Collection of Task objects maintained in memory during the session

## Clarifications

### Session 2025-12-27

- Q: How should the in-memory storage be implemented for the task repository? → A: Simple global variable with list/dict to store tasks in memory
- Q: Should `typer` and `rich` be added to `pyproject.toml` via UV? → A: Yes, add both typer and rich to pyproject.toml via UV
- Q: Is using a global Class instance (as a form of Singleton pattern) acceptable for the Repository in this session-based app? → A: Yes, a global class instance is acceptable for this simple CLI app

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new task in under 2 seconds
- **SC-002**: Users can list all tasks in under 1 second regardless of list size
- **SC-003**: 100% of valid operations (add, list, update, delete, complete) succeed without errors
- **SC-004**: Users can complete the primary task management workflow (add, list, mark complete) within 30 seconds
- **SC-005**: Error messages are displayed within 1 second when invalid operations are attempted