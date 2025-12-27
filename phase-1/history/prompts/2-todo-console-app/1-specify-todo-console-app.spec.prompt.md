---
id: 1
title: "specify-todo-console-app"
stage: spec
date_iso: "2025-12-27"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "todo-console-app"
branch: "2-todo-console-app"
user: "user"
command: "/sp.specify"
labels: ["specification", "todo-app", "cli"]
links:
  spec: "specs/2-todo-console-app/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/2-todo-console-app/spec.md
  - specs/2-todo-console-app/checklists/requirements.md
tests_yaml: |
  - "spec creation"
  - "spec validation"
prompt_text: |
  # Specification: In-Memory Todo Console App

  ## Objective
  Build a CLI tool to manage tasks during a single session (non-persistent).

  ## Data Model
  **Task Object:**
  - `id` (int or uuid): Unique identifier.
  - `title` (str): Short summary.
  - `description` (str): Detailed info.
  - `status` (str/enum): "Pending" or "Completed".
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
      - Logic: Change status to "Completed".

  ## User Interface (CLI)
  Commands:
  - `python main.py add "Title" --desc "Description"`
  - `python main.py list`
  - `python main.py update <ID> --title "New"`
  - `python main.py delete <ID>`
  - `python main.py complete <ID>`
response_text: |
  Created specification for In-Memory Todo Console App at specs/2-todo-console-app/spec.md with user scenarios, functional requirements, and success criteria. Also created quality checklist at specs/2-todo-console-app/checklists/requirements.md.
outcome: |
  Specification successfully created with all mandatory sections completed. The spec includes user scenarios with acceptance criteria, functional requirements, and measurable success criteria. Quality validation checklist confirms all requirements are met.
evaluation: |
  The specification is complete and ready for the planning phase. All mandatory sections are filled out with testable requirements and measurable success criteria.
---

# Prompt: Specification for In-Memory Todo Console App

## User Input

```text
# Specification: In-Memory Todo Console App

## Objective
Build a CLI tool to manage tasks during a single session (non-persistent).

## Data Model
**Task Object:**
- `id` (int or uuid): Unique identifier.
- `title` (str): Short summary.
- `description` (str): Detailed info.
- `status` (str/enum): "Pending" or "Completed".
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
    - Logic: Change status to "Completed".

## User Interface (CLI)
Commands:
- `python main.py add "Title" --desc "Description"`
- `python main.py list`
- `python main.py update <ID> --title "New"`
- `python main.py delete <ID>`
- `python main.py complete <ID>`
```

## Assistant Response

Created specification for In-Memory Todo Console App at specs/2-todo-console-app/spec.md with user scenarios, functional requirements, and success criteria. Also created quality checklist at specs/2-todo-console-app/checklists/requirements.md.