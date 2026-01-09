---
id: 1
title: Clarify Better Auth JWT Integration
stage: spec
date: 2026-01-03
surface: agent
model: Claude Sonnet 4.5
feature: authentication
branch: 001-user-auth
user: user
command: /sp.clarify
labels: ["authentication", "jwt", "better-auth", "fastapi", "integration"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/features/authentication.md
tests: []
---

# Prompt

```
/sp.clarify @specs/features/authentication.md @specs/api/rest-endpoints.md

Clarify how Better Auth JWT integration works with FastAPI backend when they are separate services.

Specifically:
- How to share BETTER_AUTH_SECRET securely between frontend and backend
- Exact steps for frontend to attach JWT to every API request
- Exact FastAPI middleware code structure to verify JWT and get current user
- How to enforce task ownership (compare decoded user_id with task.user_id)
- What HTTP status codes to return on auth failure (401 vs 403)

Provide code examples and update the specs if needed.
```

# Response

Successfully updated the authentication specification with detailed clarifications about Better Auth JWT integration with FastAPI backend, including:

1. Detailed explanation of how to securely share BETTER_AUTH_SECRET between services using environment variables
2. Step-by-step process for frontend to attach JWT to API requests with code examples for axios interceptors
3. Complete FastAPI middleware code structure for JWT verification using dependency injection
4. Task ownership enforcement patterns with code examples comparing user_id with task.user_id
5. Clear guidelines on HTTP status codes (401 vs 403) with error response examples

The specification now includes practical implementation examples for both frontend and backend, providing developers with a comprehensive guide for implementing the JWT integration.

# Outcome

The authentication specification has been enhanced with detailed implementation guidance, code examples, and best practices for integrating Better Auth with FastAPI backend services, resolving all the ambiguities in the original specification.

# Evaluation

All requested clarifications have been addressed and documented in the specification, with practical code examples provided for both frontend and backend implementations.