# Feature Specification: User Authentication

**Feature Branch**: `001-user-auth`
**Created**: 2026-01-03
**Status**: Draft
**Input**: User description: "User Authentication with Better Auth, JWT tokens, and protected routes in Next.js frontend"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - User Sign Up (Priority: P1)

As a visitor, I can sign up with email and password to create an account.

**Why this priority**: Without the ability to create accounts, no other functionality in the application would be accessible to new users.

**Independent Test**: Can be fully tested by visiting the sign-up form, entering valid credentials, and successfully creating an account that persists in the system.

**Acceptance Scenarios**:

1. **Given** I am a visitor on the sign-up page, **When** I enter a valid email and password and submit the form, **Then** I am successfully registered and logged in to the application
2. **Given** I am a visitor on the sign-up page, **When** I enter an invalid email or password, **Then** I see appropriate error messages and my account is not created
3. **Given** I am a visitor on the sign-up page, **When** I enter an email that already exists, **Then** I see an error message indicating the email is already in use

---

### User Story 2 - User Sign In (Priority: P1)

As a visitor, I can sign in with email and password to access the application.

**Why this priority**: Essential for existing users to access the application and its protected features.

**Independent Test**: Can be fully tested by creating an account, logging out, then logging back in with the same credentials.

**Acceptance Scenarios**:

1. **Given** I am a visitor on the sign-in page, **When** I enter my registered email and correct password, **Then** I am successfully logged in to the application
2. **Given** I am a visitor on the sign-in page, **When** I enter an incorrect password, **Then** I see an error message and remain on the sign-in page
3. **Given** I am a visitor on the sign-in page, **When** I enter an email that doesn't exist, **Then** I see an appropriate error message

---

### User Story 3 - Session Persistence (Priority: P2)

As a user, I remain logged in across page refreshes and browser sessions.

**Why this priority**: Improves user experience by preventing the need to log in repeatedly when using the application.

**Independent Test**: Can be fully tested by logging in, refreshing the page, and verifying that the user remains authenticated.

**Acceptance Scenarios**:

1. **Given** I am logged in to the application, **When** I refresh the page, **Then** I remain logged in and my session persists
2. **Given** I am logged in to the application, **When** I close and reopen the browser, **Then** I remain logged in (if "remember me" was selected)

---

### User Story 4 - User Log Out (Priority: P2)

As a user, I can log out to securely end my session.

**Why this priority**: Critical for security, especially when using shared devices or public computers.

**Independent Test**: Can be fully tested by logging in, then logging out, and verifying that protected pages require authentication.

**Acceptance Scenarios**:

1. **Given** I am logged in to the application, **When** I click the logout button, **Then** my session is terminated and I am redirected to the login page
2. **Given** I am logged in to the application, **When** my JWT token expires, **Then** I am automatically logged out and prompted to log in again

---

### User Story 5 - Protected Route Access (Priority: P3)

As an unauthenticated user, I am redirected to the login page when accessing protected routes.

**Why this priority**: Essential for security to ensure that sensitive functionality is only accessible to authenticated users.

**Independent Test**: Can be fully tested by attempting to access a protected route while not logged in and verifying redirection to the login page.

**Acceptance Scenarios**:

1. **Given** I am not logged in to the application, **When** I try to access a protected route, **Then** I am redirected to the login page
2. **Given** I am logged in to the application, **When** I access a protected route, **Then** I can view the content without being redirected

---

### Edge Cases

- What happens when a JWT token is manually tampered with or forged?
- How does the system handle simultaneous logins from different devices?
- What occurs when the authentication server is temporarily unavailable?
- How does the system handle expired JWT tokens during API requests?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST allow visitors to sign up with email and password
- **FR-002**: System MUST allow visitors to sign in with email and password
- **FR-003**: System MUST create and manage secure authentication tokens
- **FR-004**: System MUST maintain user session state across page navigation
- **FR-005**: System MUST redirect unauthenticated users to login when accessing protected routes
- **FR-006**: System MUST provide login interface with both sign-in and sign-up forms
- **FR-007**: System MUST redirect users to main application after successful login
- **FR-008**: System MUST securely terminate user sessions on logout
- **FR-009**: System MUST verify authentication tokens for protected API requests
- **FR-010**: System MUST automatically create user accounts during sign-up process
- **FR-011**: System MUST securely share BETTER_AUTH_SECRET between frontend and backend services using environment variables
- **FR-012**: System MUST automatically attach JWT tokens to all API requests using interceptors or HTTP client wrappers
- **FR-013**: System MUST use FastAPI dependency injection with Depends() to extract and verify user from JWT token
- **FR-014**: System MUST validate that authenticated user owns the task by comparing user_id with task.user_id at each protected endpoint
- **FR-015**: System MUST return HTTP 401 for authentication failures and HTTP 403 for authorization failures
- **FR-016**: System MUST configure HTTP client interceptors to automatically add Authorization header with JWT token to all API requests
- **FR-017**: System MUST validate JWT tokens using the same BETTER_AUTH_SECRET across all services
- **FR-018**: System MUST implement proper error handling for expired or invalid JWT tokens

### Key Entities *(include if feature involves data)*

- **User**: Represents an authenticated user with email and password credentials
- **Session**: Represents an active user session for maintaining authentication state
- **Authentication Token**: Secure token containing user identity information for API authentication

## Clarifications

### Session 2026-01-03

- Q: How to securely share BETTER_AUTH_SECRET between frontend and backend services? → A: Environment variables in deployment
- Q: What are the exact steps for frontend to attach JWT to every API request? → A: Interceptors/axios wrappers
- Q: What is the exact FastAPI middleware code structure to verify JWT and get current user? → A: Dependency injection with Depends
- Q: How to enforce task ownership by comparing decoded user_id with task.user_id? → A: Endpoint-level validation
- Q: What HTTP status codes to return on auth failure (401 vs 403)? → A: 401 for auth failures, 403 for authorization

### JWT Integration Implementation Details

- **BETTER_AUTH_SECRET Sharing**: The same BETTER_AUTH_SECRET value must be set in environment variables for both frontend (NEXT_PUBLIC_BETTER_AUTH_URL and BETTER_AUTH_SECRET) and backend (BETTER_AUTH_SECRET) services to enable proper JWT token validation across services
- **Frontend JWT Attachment Steps**:
  1. Import Better Auth client in Next.js frontend
  2. Use the client's getSession() method to get current user session
  3. Extract the JWT token from the session
  4. Configure HTTP client (e.g., axios) with an interceptor that adds Authorization: Bearer {token} header to all API requests
  5. Handle token expiration by redirecting to login page when API returns 401
- **Frontend Code Example for JWT Interceptor**:
  ```javascript
  // api/axios-interceptor.js
  import axios from 'axios';
  import { authClient } from './auth-client'; // Better Auth client instance

  // Request interceptor to add JWT token
  axios.interceptors.request.use(
    async (config) => {
      const session = await authClient.getSession();
      if (session?.user) {
        config.headers.Authorization = `Bearer ${session.user.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token expiration
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Redirect to login page
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  export default axios;
  ```
- **FastAPI JWT Verification Middleware**:
  1. Create a dependency function that extracts the Authorization header from the request
  2. Decode and verify the JWT token using the same BETTER_AUTH_SECRET
  3. Extract user information from the token payload
  4. Return the user data for use in route handlers
  5. Use FastAPI's Depends() to inject this authentication dependency into protected endpoints
- **FastAPI Code Example for JWT Dependency**:
  ```python
  # auth/dependencies.py
  from fastapi import Depends, HTTPException, status
  from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
  import jwt
  from typing import Dict, Any

  security = HTTPBearer()

  def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
      try:
          # Decode JWT token using the same BETTER_AUTH_SECRET
          token_payload = jwt.decode(
              credentials.credentials,
              settings.BETTER_AUTH_SECRET,
              algorithms=["HS256"]
          )
          return token_payload  # Contains user information
      except jwt.ExpiredSignatureError:
          raise HTTPException(
              status_code=status.HTTP_401_UNAUTHORIZED,
              detail="Token has expired"
          )
      except jwt.JWTError:
          raise HTTPException(
              status_code=status.HTTP_401_UNAUTHORIZED,
              detail="Invalid token"
          )

  # Usage in route handlers
  @app.get("/api/tasks")
  async def get_tasks(current_user: Dict = Depends(get_current_user)):
      user_id = current_user.get("user_id")
      # Return tasks for the authenticated user
      return get_user_tasks(user_id)
  ```
- **Task Ownership Enforcement**:
  1. In each protected endpoint that accesses a specific task, retrieve the authenticated user from the dependency
  2. Fetch the task from the database using the provided task ID
  3. Compare the authenticated user's ID with the task.user_id field
  4. If IDs don't match, raise an HTTPException with status code 403 (Forbidden)
- **Task Ownership Code Example**:
  ```python
  # routes/tasks.py
  from fastapi import Depends, HTTPException, status
  from auth.dependencies import get_current_user

  @app.get("/api/tasks/{task_id}")
  async def get_task(
      task_id: str,
      current_user: Dict = Depends(get_current_user)
  ):
      task = get_task_by_id(task_id)
      if not task:
          raise HTTPException(
              status_code=status.HTTP_404_NOT_FOUND,
              detail="Task not found"
          )

      # Verify task ownership
      if task.user_id != current_user.get("user_id"):
          raise HTTPException(
              status_code=status.HTTP_403_FORBIDDEN,
              detail="Access denied: You do not own this task"
          )

      return task

  @app.put("/api/tasks/{task_id}")
  async def update_task(
      task_id: str,
      task_update: TaskUpdate,
      current_user: Dict = Depends(get_current_user)
  ):
      task = get_task_by_id(task_id)
      if not task:
          raise HTTPException(
              status_code=status.HTTP_404_NOT_FOUND,
              detail="Task not found"
          )

      # Verify task ownership
      if task.user_id != current_user.get("user_id"):
          raise HTTPException(
              status_code=status.HTTP_403_FORBIDDEN,
              detail="Access denied: You do not own this task"
          )

      # Update task logic here
      return update_task_in_db(task_id, task_update)
  ```
- **HTTP Status Codes**: Return HTTP 401 for authentication failures (invalid/missing token) and HTTP 403 for authorization failures (valid token but insufficient permissions for specific resource)
- **HTTP Error Response Examples**:
  - Authentication Error (401):
    ```json
    {
      "detail": "Authentication credentials were not provided, are invalid, or have expired"
    }
    ```
  - Authorization Error (403):
    ```json
    {
      "detail": "Access to the requested resource is forbidden - you do not have permission to access this resource"
    }
    ```

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can complete account creation in under 30 seconds
- **SC-002**: 95% of users successfully complete the sign-in process on first attempt
- **SC-003**: Users remain logged in across browser refreshes with 99% reliability
- **SC-004**: Unauthorized access attempts to protected routes are properly redirected to login 100% of the time
- **SC-005**: Users can securely log out and their session is terminated immediately 100% of the time