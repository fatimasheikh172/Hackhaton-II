# CLI Contracts: Todo Console App

## Command Interface Specifications

### Add Command
```
python main.py add "Title" --desc "Description"
```

**Input Parameters**:
- `title` (str, required): Task title/summary
- `--desc` or `--description` (str, optional): Task description

**Output**:
- Confirmation message with Task ID
- Format: "Task created with ID: {id}"

**Error Cases**:
- Empty title: Return error message
- Invalid parameters: Return usage help

### List Command
```
python main.py list
```

**Input Parameters**:
- None

**Output**:
- Formatted table with columns: ID, Title, Status, Created Date
- Color-coded status (Green for completed, Red for pending)
- Format: Rich table display

**Error Cases**:
- No tasks exist: Display "No tasks found" message

### Update Command
```
python main.py update <ID> --title "New Title" --desc "New Description"
```

**Input Parameters**:
- `id` (int, required): Task identifier
- `--title` (str, optional): New task title
- `--desc` (str, optional): New task description

**Output**:
- Confirmation message: "Task {id} updated successfully"

**Error Cases**:
- Task ID not found: Return error message
- Invalid ID format: Return error message

### Delete Command
```
python main.py delete <ID>
```

**Input Parameters**:
- `id` (int, required): Task identifier

**Output**:
- Confirmation message: "Task {id} deleted successfully"

**Error Cases**:
- Task ID not found: Return error message
- Invalid ID format: Return error message

### Complete Command
```
python main.py complete <ID>
```

**Input Parameters**:
- `id` (int, required): Task identifier

**Output**:
- Confirmation message: "Task {id} marked as completed"

**Error Cases**:
- Task ID not found: Return error message
- Invalid ID format: Return error message
- Task already completed: Return appropriate message

## Error Handling Contract

All commands must:
- Catch exceptions and return user-friendly error messages
- Not expose raw stack traces
- Follow consistent error message format
- Return appropriate exit codes (0 for success, non-zero for errors)