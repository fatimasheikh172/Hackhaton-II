# Frontend Development Guidelines

This document outlines the frontend development standards and practices for the hackathon-todo project.

## Technology Stack

- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Custom fetch wrapper or SWR/React Query for data fetching
- **State Management**: React Context API or Zustand for global state

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Authentication-related pages
│   ├── api/            # Client-side API routes (if needed)
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Utility functions
├── public/             # Static assets
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Development Patterns

### Components
- Use functional components with TypeScript interfaces
- Follow the container/presentational pattern where appropriate
- Implement proper prop validation and default values
- Use React.memo for performance optimization when needed

### API Integration
- Create a centralized API client for all backend communication
- Implement proper error handling and loading states
- Use SWR or React Query for server state management
- Implement request/response type definitions

### Styling
- Use Tailwind CSS utility classes for styling
- Create reusable component classes in a consistent design system
- Implement dark mode support where applicable
- Follow responsive design principles

### TypeScript
- Define clear interfaces for all props and data structures
- Use strict TypeScript configuration
- Implement proper error types for API responses
- Use generic types where appropriate for reusability