# Implementation Tasks: Todo Console App

**Feature**: Todo Console App
**Branch**: 2-todo-console-app
**Created**: 2025-12-27
**Status**: Draft

## Phase 1: Setup

### Goal
Initialize the repository with proper structure and dependencies as specified in the constitution and plan.

### Independent Test Criteria
- Project can be initialized with `uv`
- Dependencies (typer, rich) are properly installed
- Directory structure matches the planned architecture
- Basic project files are created with proper `__init__.py` files

### Tasks

- [X] T001 Initialize project with `uv init`
- [X] T002 Add dependencies: `uv add typer rich`
- [X] T003 Create directory structure: `src/`, `src/models/`, `src/repositories/`, `src/services/`, `src/cli/`, `tests/`
- [X] T004 Create empty `__init__.py` files in all directories
- [X] T005 Create `CLAUDE.md` file with project constitution content

## Phase 2: Foundational Components

### Goal
Implement the core data model and repository layer that will be used by all user stories.

### Independent Test Criteria
- Task dataclass can be instantiated with required fields
- InMemoryRepository can store, retrieve, update, and delete tasks
- Repository uses dictionary or list to store tasks as specified

### Tasks

- [X] T006 [P] Create `Task` dataclass in `src/models/task.py` with id, title, description, status, created_at
- [X] T007 [P] Create `InMemoryRepository` class in `src/repositories/memory_repo.py`
- [X] T008 Implement `add` method in `InMemoryRepository` to add tasks to storage
- [X] T009 Implement `get_all` method in `InMemoryRepository` to retrieve all tasks
- [X] T010 Implement `get_by_id` method in `InMemoryRepository` to retrieve specific task
- [X] T011 Implement `update` method in `InMemoryRepository` to update task fields
- [X] T012 Implement `delete` method in `InMemoryRepository` to remove tasks

## Phase 3: Service Layer

### Goal
Implement the business logic layer that bridges the repository and CLI, handling all core functionality.

### User Story
[US1] As a user, I want to add new tasks to my todo list so I can keep track of things I need to do.

### Independent Test Criteria
- Service can add tasks with required title and optional description
- Service can list all tasks with proper formatting
- Service validates task IDs before operations
- Service provides appropriate error messages for invalid operations

### Tasks

- [X] T013 Create `TodoService` class in `src/services/todo_service.py`
- [X] T014 Implement `add_task` method with title and optional description parameters
- [X] T015 Implement `list_tasks` method to return all tasks
- [X] T016 Implement `update_task` method to modify task fields by ID
- [X] T017 Implement `delete_task` method to remove tasks by ID
- [X] T018 Implement `complete_task` method to change task status to "Completed"
- [X] T019 Add proper error handling for invalid task IDs

## Phase 4: Interactive CLI Implementation for Add Task

### Goal
Implement the interactive CLI interface for adding tasks, which is the foundational functionality in a persistent session.

### User Story
[US1] As a user, I want to add new tasks to my todo list so I can keep track of things I need to do.

### Independent Test Criteria
- User can enter `add "Title"` in the interactive session and create a task
- User can enter `add "Title" --desc "Description"` in the interactive session and create a task with description
- Appropriate confirmation message with Task ID is displayed
- Error is shown when title is empty
- Data persists in memory during the session

### Tasks

- [X] T020 Create `main.py` in `src/cli/` with interactive REPL loop using Typer
- [X] T021 Implement the main interactive loop that maintains session state
- [X] T022 Implement `add` command within the interactive session with title parameter and optional description
- [X] T023 Connect `add` command to TodoService
- [X] T024 Display confirmation message with Task ID after adding
- [X] T025 Add validation to ensure title is provided

## Phase 5: Interactive CLI Implementation for List Tasks

### Goal
Implement the interactive CLI interface for listing all tasks with rich formatting.

### User Story
[US2] As a user, I want to see all my tasks in a formatted table so I can review what needs to be done.

### Independent Test Criteria
- User can enter `list` in the interactive session and see all tasks in a table
- Table displays ID, Title, Status, and Created Date columns
- Completed tasks are shown in green and pending tasks in red
- Appropriate message is shown when no tasks exist
- Data persists in memory during the session

### Tasks

- [X] T026 Implement `list` command within the interactive session
- [X] T027 Connect `list` command to TodoService
- [X] T028 Use Rich library to create formatted table for tasks
- [X] T029 Implement color-coding: green for completed, red for pending
- [X] T030 Handle case when no tasks exist

## Phase 6: Interactive CLI Implementation for Complete Task

### Goal
Implement the CLI interface for marking tasks as complete.

### User Story
[US3] As a user, I want to mark tasks as complete when I finish them so I can track my progress.

### Independent Test Criteria
- User can enter `complete <ID>` in the interactive session and change task status to "Completed"
- Appropriate confirmation message is displayed
- Error message is shown when task ID is invalid
- Data persists in memory during the session

### Tasks

- [X] T031 Implement `complete` command within the interactive session with ID parameter
- [X] T032 Connect `complete` command to TodoService
- [X] T033 Display confirmation message after marking task as complete
- [X] T034 Handle error case when task ID is not found

## Phase 7: Interactive CLI Implementation for Update Task

### Goal
Implement the CLI interface for updating task details.

### User Story
[US4] As a user, I want to update task details like title and description so I can keep my tasks current.

### Independent Test Criteria
- User can enter `update <ID> --title "New"` in the interactive session and update the title
- User can enter `update <ID> --desc "New"` in the interactive session and update the description
- User can enter `update <ID> --title "New" --desc "New"` in the interactive session and update both
- Appropriate confirmation message is displayed
- Error message is shown when task ID is invalid
- Data persists in memory during the session

### Tasks

- [X] T035 Implement `update` command within the interactive session with ID parameter
- [X] T036 Add optional `--title` parameter to `update` command
- [X] T037 Add optional `--description` parameter to `update` command
- [X] T038 Connect `update` command to TodoService
- [X] T039 Display confirmation message after updating task

## Phase 8: Interactive CLI Implementation for Delete Task

### Goal
Implement the CLI interface for deleting tasks.

### User Story
[US5] As a user, I want to delete tasks I no longer need so I can keep my todo list clean.

### Independent Test Criteria
- User can enter `delete <ID>` in the interactive session and remove the task
- Appropriate confirmation message is displayed
- Error message is shown when task ID is invalid
- Data persists in memory during the session

### Tasks

- [X] T040 Implement `delete` command within the interactive session with ID parameter
- [X] T041 Connect `delete` command to TodoService
- [X] T042 Display confirmation message after deleting task
- [X] T043 Handle error case when task ID is not found

## Phase 9: Polish & Cross-Cutting Concerns

### Goal
Finalize the application with proper error handling, documentation, and type safety.

### Independent Test Criteria
- All functions have proper type hints as required by constitution
- All classes and functions have Google-style docstrings
- No raw stack traces are exposed to users
- All error cases are handled gracefully
- Code follows PEP 8 standards

### Tasks

- [X] T043 Add type hints to all functions and classes throughout the codebase
- [X] T044 Add Google-style docstrings to all functions and classes
- [X] T045 Implement graceful error handling across all layers
- [X] T046 Verify PEP 8 compliance across all files
- [X] T047 Test all CLI commands manually to ensure they work as specified
- [X] T048 Update `pyproject.toml` with proper metadata for the application

## Dependencies

### User Story Completion Order
1. US1 (Add Task) - Foundation for all other functionality
2. US2 (List Tasks) - Requires US1 to have data to display
3. US3 (Complete Task) - Can work independently but builds on US1
4. US4 (Update Task) - Can work independently but builds on US1
5. US5 (Delete Task) - Can work independently but builds on US1

### Parallel Execution Examples

#### Story 1 (Add Task) - Can be developed independently
- Tasks T020-T025 can be implemented without other stories

#### Story 2 (List Task) - Depends on Story 1 for data
- Tasks T026-T030 require that tasks can be added first

#### Story 3 (Complete Task) - Can be developed in parallel with Stories 4-5
- Tasks T031-T034 can be implemented in parallel with update/delete after US1

#### Story 4 (Update Task) - Can be developed in parallel with Stories 3,5
- Tasks T035-T039 can be implemented in parallel with complete/delete after US1

#### Story 5 (Delete Task) - Can be developed in parallel with Stories 3,4
- Tasks T040-T043 can be implemented in parallel with complete/update after US1

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
- Complete Phase 1 (Setup)
- Complete Phase 2 (Foundational Components)
- Complete Phase 3 (Service Layer)
- Complete Phase 4 (Interactive Add Task CLI)
- Complete Phase 5 (Interactive List Task CLI)

This MVP would allow users to add and list tasks, providing core functionality for the todo app.

### Incremental Delivery
- After MVP: Add complete functionality (Phase 6 - Interactive Complete Task CLI)
- After complete: Add update functionality (Phase 7 - Interactive Update Task CLI)
- After update: Add delete functionality (Phase 8 - Interactive Delete Task CLI)
- Final: Polish and documentation (Phase 9)