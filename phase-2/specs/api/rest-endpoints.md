# REST API Endpoints Specification

## Overview
This document defines the REST API endpoints for the hackathon-todo application. The API follows RESTful conventions with JSON request/response format and proper HTTP status codes. All endpoints require authentication using JWT tokens except for public authentication endpoints.

## Base URL
The API is served from the `/api` path on the backend server.

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication Endpoints

#### User Registration
- **POST** `/api/auth/register`
  - Description: Register a new user account
  - Headers: None required
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "SecurePassword123!"
    }
    ```
  - Response: 201 Created with user information and JWT token
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "email": "user@example.com",
      "username": "optional username",
      "first_name": "optional first name",
      "last_name": "optional last name",
      "token": "jwt_token_string"
    }
    ```
  - Error Responses: 400, 409, 422, 500

#### User Login
- **POST** `/api/auth/login`
  - Description: Authenticate user and return JWT token
  - Headers: None required
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "SecurePassword123!"
    }
    ```
  - Response: 200 OK with JWT token and user information
  - Response Schema:
    ```json
    {
      "user": {
        "id": "uuid",
        "email": "user@example.com",
        "username": "optional username",
        "first_name": "optional first name",
        "last_name": "optional last name"
      },
      "token": "jwt_token_string"
    }
    ```
  - Error Responses: 400, 401, 422, 500

#### User Logout
- **POST** `/api/auth/logout`
  - Description: Invalidate user session and JWT token
  - Headers: Authorization: Bearer <token>
  - Response: 200 OK
  - Response Schema:
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
  - Error Responses: 401, 500

#### Get Current User
- **GET** `/api/auth/me`
  - Description: Get information about the authenticated user
  - Headers: Authorization: Bearer <token>
  - Response: 200 OK with user information
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "email": "user@example.com",
      "username": "optional username",
      "first_name": "optional first name",
      "last_name": "optional last name",
      "is_verified": false,
      "is_active": true,
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-01T10:00:00Z"
    }
    ```
  - Error Responses: 401, 500

### Task Management Endpoints

#### Get All Tasks
- **GET** `/api/tasks`
  - Description: Retrieve all tasks for the authenticated user
  - Headers: Authorization: Bearer <token>
  - Query Parameters:
    - `status` (optional): Filter by task status (pending, in-progress, completed)
    - `priority` (optional): Filter by priority (low, medium, high)
    - `sort` (optional): Sort by field (created_at, title, due_date) with optional direction (asc/desc)
    - `limit` (optional): Number of tasks to return (default: 20, max: 100)
    - `offset` (optional): Number of tasks to skip (for pagination)
  - Response: 200 OK with array of tasks
  - Response Schema:
    ```json
    {
      "tasks": [
        {
          "id": "uuid",
          "title": "Task title",
          "description": "Task description (optional)",
          "status": "pending",
          "priority": "medium",
          "due_date": "2023-12-31T23:59:59Z",
          "user_id": "uuid",
          "created_at": "2023-11-01T10:00:00Z",
          "updated_at": "2023-11-01T10:00:00Z"
        }
      ],
      "total": 15,
      "limit": 20,
      "offset": 0
    }
    ```
  - Error Responses: 401, 500

#### Create Task
- **POST** `/api/tasks`
  - Description: Create a new task for the authenticated user
  - Headers: Authorization: Bearer <token>
  - Request Body:
    ```json
    {
      "title": "Task title",
      "description": "Task description (optional)",
      "status": "pending",
      "priority": "medium",
      "due_date": "2023-12-31T23:59:59Z" (optional)
    }
    ```
  - Response: 201 Created with the created task
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description (optional)",
      "status": "pending",
      "priority": "medium",
      "due_date": "2023-12-31T23:59:59Z",
      "user_id": "uuid",
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-01T10:00:00Z"
    }
    ```
  - Error Responses: 400, 401, 422, 500

#### Get Task by ID
- **GET** `/api/tasks/{id}`
  - Description: Retrieve a specific task by ID
  - Headers: Authorization: Bearer <token>
  - Path Parameter: `id` - Task ID (UUID format)
  - Response: 200 OK with task details
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description (optional)",
      "status": "pending",
      "priority": "medium",
      "due_date": "2023-12-31T23:59:59Z",
      "user_id": "uuid",
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-01T10:00:00Z"
    }
    ```
  - Error Responses: 401, 403, 404, 500

#### Update Task
- **PUT** `/api/tasks/{id}`
  - Description: Fully update a specific task by ID
  - Headers: Authorization: Bearer <token>
  - Path Parameter: `id` - Task ID (UUID format)
  - Request Body:
    ```json
    {
      "title": "Updated task title",
      "description": "Updated task description",
      "status": "in-progress",
      "priority": "high",
      "due_date": "2023-12-31T23:59:59Z"
    }
    ```
  - Response: 200 OK with updated task
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "title": "Updated task title",
      "description": "Updated task description",
      "status": "in-progress",
      "priority": "high",
      "due_date": "2023-12-31T23:59:59Z",
      "user_id": "uuid",
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-02T15:30:00Z"
    }
    ```
  - Error Responses: 400, 401, 403, 404, 422, 500

#### Partially Update Task
- **PATCH** `/api/tasks/{id}`
  - Description: Partially update a specific task by ID
  - Headers: Authorization: Bearer <token>
  - Path Parameter: `id` - Task ID (UUID format)
  - Request Body (any combination of):
    ```json
    {
      "title": "Updated task title",
      "status": "completed",
      "priority": "low"
    }
    ```
  - Response: 200 OK with updated task
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "title": "Updated task title",
      "description": "Task description (optional)",
      "status": "completed",
      "priority": "low",
      "due_date": "2023-12-31T23:59:59Z",
      "user_id": "uuid",
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-02T16:45:00Z"
    }
    ```
  - Error Responses: 400, 401, 403, 404, 422, 500

#### Mark Task Complete
- **PATCH** `/api/tasks/{id}/complete`
  - Description: Mark a specific task as complete
  - Headers: Authorization: Bearer <token>
  - Path Parameter: `id` - Task ID (UUID format)
  - Response: 200 OK with updated task (status: "completed")
  - Response Schema:
    ```json
    {
      "id": "uuid",
      "title": "Task title",
      "description": "Task description (optional)",
      "status": "completed",
      "priority": "medium",
      "due_date": "2023-12-31T23:59:59Z",
      "user_id": "uuid",
      "created_at": "2023-11-01T10:00:00Z",
      "updated_at": "2023-11-02T17:00:00Z"
    }
    ```
  - Error Responses: 400, 401, 403, 404, 500

#### Delete Task
- **DELETE** `/api/tasks/{id}`
  - Description: Delete a specific task by ID
  - Headers: Authorization: Bearer <token>
  - Path Parameter: `id` - Task ID (UUID format)
  - Response: 204 No Content
  - Error Responses: 401, 403, 404, 500

## Common Error Responses

### 400 Bad Request
- Description: The request was malformed or contained invalid data
- Response Body:
  ```json
  {
    "detail": "Error message describing the issue"
  }
  ```

### 401 Unauthorized
- Description: Authentication token is missing, invalid, or expired
- Response Body:
  ```json
  {
    "detail": "Authentication credentials were not provided, are invalid, or have expired"
  }
  ```

### 403 Forbidden
- Description: User is authenticated but does not have permission to access the specific resource (e.g., attempting to access another user's task)
- Response Body:
  ```json
  {
    "detail": "Access to the requested resource is forbidden - you do not have permission to access this resource"
  }
  ```

### 404 Not Found
- Description: The requested resource does not exist
- Response Body:
  ```json
  {
    "detail": "The requested resource was not found"
  }
  ```

### 409 Conflict
- Description: Resource conflict (e.g., email already exists during registration)
- Response Body:
  ```json
  {
    "detail": "Resource conflict occurred"
  }
  ```

### 422 Unprocessable Entity
- Description: The request was well-formed but contains semantic errors
- Response Body:
  ```json
  {
    "detail": "Validation error message"
  }
  ```

### 500 Internal Server Error
- Description: An unexpected error occurred on the server
- Response Body:
  ```json
  {
    "detail": "An internal server error occurred"
  }
  ```

## Request/Response Examples

### Example Task Object
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the project",
  "status": "pending",
  "priority": "high",
  "due_date": "2023-12-31T23:59:59Z",
  "user_id": "123e4567-e89b-12d3-a456-426614174001",
  "created_at": "2023-11-01T10:00:00Z",
  "updated_at": "2023-11-01T10:00:00Z"
}
```

## Clarifications

### Session 2026-01-03

- Q: How to handle authentication vs authorization failures? → A: Return HTTP 401 for authentication failures (invalid/missing token) and HTTP 403 for authorization failures (user lacks permission to access specific resource)

## CORS Configuration

- Enable CORS middleware in FastAPI to allow requests from frontend origin
- Configure allowed origins to include localhost:3000 (development) and production domain
- Allow credentials to be sent with cross-origin requests (for session cookies)
- Enable standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Allow custom headers including Authorization for JWT token transmission

For database schema details, see @specs/database/schema.md.
For feature specifications, see @specs/features/task-crud.md and @specs/features/authentication.md.