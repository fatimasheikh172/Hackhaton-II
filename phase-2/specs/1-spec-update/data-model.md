# Data Model

## User Entity
- **Fields**:
  - id: UUID (Primary Key)
  - email: String (unique, required)
  - username: String (optional, unique)
  - first_name: String (optional)
  - last_name: String (optional)
  - is_verified: Boolean (default: false)
  - is_active: Boolean (default: true)
  - created_at: DateTime (auto-generated)
  - updated_at: DateTime (auto-generated)
- **Relationships**: One-to-many with Task entity
- **Validation**: Email format validation, uniqueness constraints

## Task Entity
- **Fields**:
  - id: UUID (Primary Key)
  - title: String (required, 1-200 characters)
  - description: Text (optional)
  - status: String (required, enum: pending/in-progress/completed)
  - priority: String (required, enum: low/medium/high)
  - due_date: DateTime (optional)
  - user_id: UUID (Foreign Key to User)
  - created_at: DateTime (auto-generated)
  - updated_at: DateTime (auto-generated)
- **Relationships**: Many-to-one with User entity
- **Validation**: Title length constraints, status/priority enums, foreign key constraint
- **State Transitions**: pending → in-progress → completed

## Authentication Data
- **Session**: JWT token with user_id, expiration time
- **Security**: Password hashing using bcrypt, secure token generation