# Quickstart Guide: Todo Console App

## Prerequisites
- Python 3.13+
- UV package manager

## Setup
1. Initialize the project:
```bash
uv init
```

2. Add required dependencies:
```bash
uv add typer rich
```

## Project Structure
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

## Running the Application
```bash
python src/cli/main.py --help
```

## Available Commands
- `python src/cli/main.py add "Task Title" --desc "Task Description"` - Add a new task
- `python src/cli/main.py list` - List all tasks
- `python src/cli/main.py update <ID> --title "New Title" --desc "New Description"` - Update a task
- `python src/cli/main.py delete <ID>` - Delete a task
- `python src/cli/main.py complete <ID>` - Mark task as complete

## Development
1. Install dependencies: `uv add typer rich`
2. Implement models in `src/models/`
3. Implement repositories in `src/repositories/`
4. Implement services in `src/services/`
5. Implement CLI in `src/cli/`
6. Test all commands manually