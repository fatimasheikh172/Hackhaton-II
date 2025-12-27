<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- Modified principles: N/A (new constitution)
- Added sections: Technology Stack, Architecture Principles, Workflow Rules
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated to align with constitution principles
  - .specify/templates/spec-template.md ✅ updated to align with constitution principles
  - .specify/templates/tasks-template.md ✅ updated to align with constitution principles
- Follow-up TODOs: None
-->

# Todo App Constitution

## Core Principles

### Technology Stack

Python 3.13+ with UV for dependency management, Typer for CLI, Rich for console output, and in-memory storage for Phase 1. All components must align with this stack and follow its constraints.

### Architecture: Separation of Concerns

Keep UI (CLI) separate from Logic (Service) and Data (Repository). Each layer must have clear boundaries and responsibilities with no cross-contamination between layers.

### Type Safety (NON-NEGOTIABLE)

Use Python Type Hints strictly throughout the codebase. All functions, classes, and variables must be properly typed to ensure compile-time error detection and code clarity.

### Documentation Standards

Maintain Google-style docstrings for all functions and classes. Documentation must be comprehensive, accurate, and kept in sync with code changes to ensure maintainability.

### Error Handling

Implement graceful error handling throughout the application. No raw stack traces should be exposed to users; all errors must be caught and handled with appropriate user feedback.

### Clean Code and Standards

Follow PEP 8 standards strictly. Code must be clean, readable, and maintainable with consistent formatting, naming conventions, and structure across the entire codebase.

## Architecture Principles

The application must maintain clear separation between UI (CLI), Logic (Service), and Data (Repository) layers. Type hints are mandatory for all functions and classes. Documentation must follow Google-style docstrings. Error handling must be graceful without exposing raw stack traces to users.

## Workflow Rules

No manual coding is allowed - all code must be generated via prompts. Prioritize functional implementation for Phase I, with TDD applied when specifically requested. All code must follow PEP 8 standards and include proper type hints and documentation.

## Governance

This constitution supersedes all other development practices. All code changes must comply with these principles. Amendments require documentation and approval before implementation. All pull requests and reviews must verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2025-12-27 | **Last Amended**: 2025-12-27
