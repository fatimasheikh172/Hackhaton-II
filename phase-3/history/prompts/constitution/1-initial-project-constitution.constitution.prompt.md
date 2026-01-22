---
id: 1
title: Initial Project Constitution
stage: constitution
date_iso: 2026-01-03
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-api-auth-user
user: Claude
command: sp.constitution
labels: ["constitution", "setup", "monorepo", "todo-app"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - .spec-kit/config.yaml
  - CLAUDE.md
  - frontend/CLAUDE.md
  - backend/CLAUDE.md
  - docker-compose.yml
  - specs/overview.md
  - specs/features/task-crud.md
  - specs/features/authentication.md
  - specs/api/rest-endpoints.md
  - specs/database/schema.md
  - specs/ui/pages.md
  - specs/ui/components.md
  - .specify/memory/constitution.md
tests_yaml: []
---

## Prompt

```
Create the initial project constitution for a full-stack Todo web application in Phase II. Use a monorepo structure named "hackathon-todo".

Set up:
- .spec-kit/config.yaml exactly as shown in the guide with phase2-web (current)
- Root CLAUDE.md with full content from the guide (project overview, how to use specs, referencing, structure, commands)
- /frontend/CLAUDE.md with all frontend guidelines (Next.js App Router, TypeScript, Tailwind, api client, patterns)
- /backend/CLAUDE.md with all backend guidelines (FastAPI, SQLModel, routes structure, conventions)
- Empty frontend/ and backend/ folders ready for Next.js and FastAPI apps
- docker-compose.yml skeleton for running both services
- Initial specs files:
  - specs/overview.md (use provided content)
  - specs/features/task-crud.md (use provided content)
  - specs/features/authentication.md (create based on Better Auth + JWT requirements)
  - specs/api/rest-endpoints.md (update to new simplified endpoints: /api/tasks with GET/POST, /api/tasks/{id} with GET/PUT/DELETE/PATCH complete)
  - specs/database/schema.md (include users table managed by Better Auth and tasks table with user_id foreign key)
  - specs/ui/pages.md and specs/ui/components.md (initial empty stubs)

Ensure all cross-references use correct @specs/ paths. Make the project ready for spec-driven development with Claude Code.
```

## Response

I have successfully created the initial project constitution for the full-stack Todo web application "hackathon-todo" with a monorepo structure. All requested files have been created:

1. **Configuration files:**
   - `.spec-kit/config.yaml` with phase2-web configuration
   - Root `CLAUDE.md` with full content from the guide
   - `frontend/CLAUDE.md` with frontend guidelines (Next.js, TypeScript, Tailwind)
   - `backend/CLAUDE.md` with backend guidelines (FastAPI, SQLModel)
   - `docker-compose.yml` skeleton for both services

2. **Specification files:**
   - `specs/overview.md` with project overview
   - `specs/features/task-crud.md` with task management requirements
   - `specs/features/authentication.md` with Better Auth + JWT requirements
   - `specs/api/rest-endpoints.md` with simplified REST endpoints
   - `specs/database/schema.md` with users and tasks tables
   - `specs/ui/pages.md` and `specs/ui/components.md` with initial stubs

3. **Project constitution:**
   - `.specify/memory/constitution.md` with project principles and governance

All cross-references use the correct @specs/ paths as requested, and the project is now ready for spec-driven development with Claude Code.