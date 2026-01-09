---
id: 3
title: API Auth Tasks Update
stage: spec
date_iso: 2026-01-03
surface: agent
model: claude-sonnet-4-5-20250929
feature: api-auth-tasks
branch: 001-api-auth-tasks
user: Claude
command: sp.specify
labels: ["api", "authentication", "tasks", "jwt"]
links:
  spec: specs/api/rest-endpoints.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/api/rest-endpoints.md
  - specs/api/checklists/requirements.md
tests_yaml: []
---

## Prompt

```
/sp.specify specs/api/rest-endpoints.md

Update to use authenticated user from JWT instead of user_id in URL.

New endpoints:
- GET /api/tasks
- POST /api/tasks
- GET /api/tasks/{id}
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}
- PATCH /api/tasks/{id}/complete

All endpoints require Authorization: Bearer <token> header and automatically filter by authenticated user.
```

## Response

I have successfully updated the API specification to include the new PATCH /api/tasks/{id}/complete endpoint as requested. The API specification already followed the pattern of using JWT authentication and filtering by authenticated user rather than including user_id in URLs. The update adds the new endpoint for marking tasks as complete while maintaining all existing functionality.

The API specification now includes:
- GET /api/tasks - Retrieve all tasks for authenticated user
- POST /api/tasks - Create a new task for authenticated user
- GET /api/tasks/{id} - Retrieve a specific task by ID
- PUT /api/tasks/{id} - Fully update a specific task
- PATCH /api/tasks/{id} - Partially update a specific task
- PATCH /api/tasks/{id}/complete - Mark a specific task as complete
- DELETE /api/tasks/{id} - Delete a specific task

All endpoints require Authorization: Bearer <token> header and automatically filter by authenticated user.