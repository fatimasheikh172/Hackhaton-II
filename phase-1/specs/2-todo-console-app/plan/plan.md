# Implementation Plan: Todo Console App

**Feature**: Todo Console App
**Branch**: 2-todo-console-app
**Created**: 2025-12-27
**Status**: Draft

## Technical Context

### Architecture Overview
- **UI Layer**: CLI interface using Typer
- **Logic Layer**: Service layer for business logic
- **Data Layer**: In-memory repository using simple global variable with list/dict
- **Dependencies**: typer (CLI), rich (display), python 3.13+

### Technology Stack
- Python 3.13+
- Typer for CLI command handling
- Rich for formatted console output
- UV for dependency management
- In-memory storage (no database)

### Current Unknowns
- None identified - all requirements clarified in specification

### System Constraints
- Single session operation (non-persistent)
- CLI-only interface
- Console-based output
- Type safety required (PEP 484)

## Constitution Check

### Compliance Verification
- [x] Technology stack alignment (Python, Typer, Rich, UV)
- [x] Architecture: Separation of concerns (UI/Logic/Data layers)
- [x] Type safety compliance (mandatory type hints)
- [x] Documentation standards (Google-style docstrings)
- [x] Error handling (graceful, no raw stack traces)
- [x] Code standards (PEP 8 compliance)
- [x] Workflow rules (no manual coding, all via prompts)

### Gate Status
- [x] All constitution requirements satisfied
- [x] No violations identified

## Phase 0: Outline & Research

### Research Summary
Based on the specification and clarifications, no additional research is needed as all requirements are clearly defined:
- In-memory storage approach: Simple global variable with list/dict
- Dependencies: typer and rich libraries
- Architecture: Global class instance acceptable for repository

## Phase 1: Design & Contracts

### Data Model
The data model has been established in the specification:
- Task entity with id, title, description, status, created_at
- TaskList as collection of Task objects

### API Contracts
CLI Commands defined:
- `python main.py add "Title" --desc "Description"` - Add new task
- `python main.py list` - List all tasks
- `python main.py update <ID> --title "New" --desc "New"` - Update task
- `python main.py delete <ID>` - Delete task
- `python main.py complete <ID>` - Mark task as complete

### Project Structure
```
todo-app/
├── pyproject.toml
├── src/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── task.py
│   ├── repositories/
│   │   ├── __init__.py
│   │   └── memory_repo.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── todo_service.py
│   └── cli/
│       ├── __init__.py
│       └── main.py
└── tests/
    └── __init__.py
```

## Implementation Approach

### Phase 1: Project Setup
1. Initialize project using `uv init`
2. Add dependencies: `uv add typer rich`
3. Create folder structure as defined above

### Phase 2: Core Logic (The Backend)
4. Implement Model: Create `Task` data class in `src/models/task.py`
5. Implement Repository: Create `TaskRepository` in `src/repositories/memory_repo.py`
   - Methods: `add`, `get_all`, `get_by_id`, `update`, `delete`
   - Store data in a private list `_tasks = []`

### Phase 3: Service Layer
6. Implement Service: Create `TodoService` in `src/services/todo_service.py` to handle business logic (e.g., toggling status)

### Phase 4: Interactive CLI Interface (The Frontend)
7. Implement Interactive CLI: Create `src/cli/main.py` using `typer` with interactive REPL loop
   - Implement persistent session that maintains in-memory state
   - Support commands: add, list, update, delete, complete
   - Wire up commands to the Service layer
   - Implement `rich` console printing for the "List" command
   - Add exit/quit command to end session

### Phase 5: Verification
8. Manual testing of all 5 commands in persistent session

## Risk Analysis

### High-Risk Areas
- In-memory storage persistence across operations
- Type safety in all layers
- Error handling without exposing stack traces

### Mitigation Strategies
- Comprehensive type hints throughout
- Proper error handling at each layer
- Validation at service and repository levels

## Success Criteria

### Implementation Goals
- All functional requirements from spec implemented
- Constitution compliance maintained
- Clean separation of concerns
- Proper error handling
- Type safety throughout
- Google-style documentation