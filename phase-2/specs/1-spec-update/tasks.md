# Tasks: Full-Stack Todo Application with Authentication

## Phase 1: Setup (Project Initialization)

- [ ] T001 Create root directory structure (backend/, frontend/, specs/, .specify/)
- [ ] T002 [P] Create docker-compose.yml with services: frontend, backend, postgres (neon-db equivalent)
- [ ] T003 [P] Create root CLAUDE.md file with project instructions
- [ ] T004 [P] Create backend/ directory structure (models/, services/, api/, auth/, tests/)
- [ ] T005 [P] Create frontend/ directory structure (src/components/, src/pages/, src/services/, src/lib/, tests/)
- [ ] T006 [P] Create requirements.txt and package.json files with required dependencies
- [ ] T007 Initialize git repository with proper .gitignore

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T008 Implement database schema in backend/models.py per @specs/database/schema.md
- [ ] T009 Create database connection setup in backend/db.py with SQLModel
- [ ] T010 Create main.py with create_all for database initialization
- [ ] T011 Implement JWT verification dependency in backend/auth/ using PyJWT
- [ ] T012 [P] Set up environment variables handling (BETTER_AUTH_SECRET, DATABASE_URL, etc.)
- [ ] T013 [P] Configure CORS middleware in FastAPI for frontend origin (localhost:3000)

## Phase 3: [US1-US4] Authentication System

- [ ] T014 [US1] Create User registration endpoint in backend/api/auth.py
- [ ] T015 [US1] [P] Create User login endpoint in backend/api/auth.py with JWT token issuance
- [ ] T016 [US1] [P] Implement password hashing with bcrypt in user service
- [ ] T017 [US2] Create logout endpoint in backend/api/auth.py
- [ ] T018 [US3] Implement JWT token validation middleware with user_id extraction
- [ ] T019 [US3] [P] Create endpoint to get current user profile information
- [ ] T020 [US4] Implement session persistence mechanisms
- [ ] T021 [US1] [P] Create auth pages in frontend per @specs/ui/pages.md (signin/signup)
- [ ] T022 [US1] [P] Install and configure Better Auth in frontend
- [ ] T023 [US1] [P] Create AuthForm component in frontend per @specs/ui/components.md

## Phase 4: [US5] Create a New Task

- [ ] T024 [US5] Create Task model in backend/models.py per @specs/database/schema.md
- [ ] T025 [US5] Create task creation endpoint in backend/api/tasks.py
- [ ] T026 [US5] Implement user_id validation in task creation (enforce from JWT token)
- [ ] T027 [US5] Create frontend API client in /lib/api.ts with createTask function
- [ ] T028 [US5] Create TaskForm component in frontend per @specs/ui/components.md
- [ ] T029 [US5] Create task creation modal/form in frontend

## Phase 5: [US6] View My Tasks with Filtering

- [ ] T030 [US6] Create task listing endpoint in backend/api/tasks.py with filters/sort
- [ ] T031 [US6] Implement user_id validation in task listing (enforce from JWT token)
- [ ] T032 [US6] Create getTasks function in frontend API client
- [ ] T033 [US6] Create TaskList component in frontend per @specs/ui/components.md
- [ ] T034 [US6] Create TaskCard component in frontend per @specs/ui/components.md
- [ ] T035 [US6] Create tasks list page in frontend per @specs/ui/pages.md

## Phase 6: [US7] Update Task Details

- [ ] T036 [US7] Create task update endpoint in backend/api/tasks.py
- [ ] T037 [US7] Implement user_id validation in task update (enforce from JWT token)
- [ ] T038 [US7] Create updateTask function in frontend API client
- [ ] T039 [US7] Enhance TaskForm component for editing functionality
- [ ] T040 [US7] Create task editing page in frontend per @specs/ui/pages.md

## Phase 7: [US8] Delete My Task

- [ ] T041 [US8] Create task deletion endpoint in backend/api/tasks.py
- [ ] T042 [US8] Implement user_id validation in task deletion (enforce from JWT token)
- [ ] T043 [US8] Create deleteTask function in frontend API client
- [ ] T044 [US8] Add delete functionality to TaskCard component
- [ ] T045 [US8] Implement confirmation dialog for task deletion

## Phase 8: [US9] Multi-User Isolation & Edge Cases

- [ ] T046 [US9] Implement comprehensive user_id validation across all task endpoints
- [ ] T047 [US9] Add proper error handling for unauthorized access (403 responses)
- [ ] T048 [US9] [P] Handle no tasks display with appropriate messaging
- [ ] T049 [US9] [P] Handle invalid tokens with proper redirect to login
- [ ] T050 [US9] [P] Handle non-existent task IDs (404 responses)
- [ ] T051 [US9] [P] Implement error boundaries and loading states in frontend

## Phase 9: Integration & UI Protection

- [ ] T052 [US1] Protect task routes with session checks in frontend
- [ ] T053 [US1] [P] Redirect to signin if unauthenticated in frontend
- [ ] T054 [P] Create .env.example with BETTER_AUTH_SECRET, DATABASE_URL
- [ ] T055 [P] Add CORS middleware in FastAPI for frontend origin
- [ ] T056 [P] Test endpoints with FastAPI docs (Swagger UI)

## Phase 10: Testing & Validation

- [ ] T057 Create E2E test: Signup flow verification
- [ ] T058 [P] Create E2E test: Create task flow verification
- [ ] T059 [P] Create E2E test: Multi-user isolation verification (accessing other user's tasks fails)
- [ ] T060 [P] Implement responsive checks with Tailwind media queries
- [ ] T061 [P] Add due_date field to tasks if not already implemented
- [ ] T062 Run docker-compose validation for complete stack

## Phase 11: Polish & Cross-Cutting Concerns

- [ ] T063 Add proper logging throughout the application
- [ ] T064 Implement input validation and sanitization
- [ ] T065 Add unit and integration tests for critical paths
- [ ] T066 Configure environment variables for different environments
- [ ] T067 [P] Add proper error handling and user feedback mechanisms
- [ ] T068 [P] Optimize database queries with proper indexing
- [ ] T069 Run integration tests to verify complete flow (signup, create task, list only own tasks)

## Dependencies

### User Story Completion Order
- [US1-US4] (Authentication) must be completed before [US5-US9] (Task operations)
- [US5] (Create Task) is prerequisite for [US6-US8] (View/Update/Delete)
- [US6-US8] can be developed in parallel after [US5] is complete
- [US9] (Multi-user isolation) is applied across all previous stories

### Parallel Execution Examples
- T024-T026 (Task model, creation endpoint, validation) can run in parallel with T027-T029 (API client, form, modal)
- T030-T031 (Listing endpoint, validation) can run in parallel with T032-T035 (API client, components, page)

## Implementation Strategy

### MVP Scope (Minimal Viable Product)
Focus on completing US1 (Authentication) and US5 (Task Creation) to establish the core functionality.

### Incremental Delivery
Each phase builds upon the previous one, with each user story being independently testable. Complete authentication first, then add task operations progressively.