# UI Components Specification

## Overview
This document outlines the reusable UI components for the hackathon-todo frontend application built with React and TypeScript.

## Component Categories

### Form Components

#### InputField
- Generic input component with validation
- Support for text, email, password types
- Error message display
- Label and placeholder support

#### Button
- Reusable button component
- Different variants (primary, secondary, danger)
- Loading state support
- Disabled state support

#### Form
- Form wrapper with validation support
- Error handling and display
- Submission handling

### Task Components

#### TaskCard
- Displays title, description, status, priority, and due date
- Buttons for edit, delete, and complete actions
- Visual indicators for task status and priority
- Clickable to view/edit details
- Responsive design for all screen sizes

#### TaskList
- Container for multiple TaskCard components
- Filtering controls for status, priority, and date
- Sorting options by title, due date, or priority
- Empty state handling with appropriate messaging
- Pagination support for large datasets

#### TaskForm
- Inputs for title and description
- Dropdown for status selection (pending, in-progress, completed)
- Dropdown for priority selection (low, medium, high)
- Date picker for due date
- Submit button with loading state
- Validation for required fields

### Navigation Components

#### Navbar
- Responsive navigation bar
- Logo display
- Navigation links
- User profile dropdown

#### Sidebar
- Secondary navigation
- Quick links
- User information

### Layout Components

#### Layout
- Main application layout wrapper
- Consistent padding and spacing
- Responsive design

#### Container
- Centered content container
- Responsive width constraints

### Authentication Components

#### AuthForm
- Email and password inputs for signin and signup
- Toggle between login and register views
- Form validation for email format and password strength
- Loading state during authentication requests
- Error display for authentication failures

### Data Display Components

#### Table
- Tabular data display
- Sortable columns
- Pagination support

#### Modal
- Overlay dialog component
- Confirm dialogs
- Form dialogs

### Feedback Components

#### Alert
- Informational messages
- Success, warning, error variants
- Dismissible option

#### LoadingSpinner
- Loading state indicator
- Different sizes

## Styling Guidelines
- Use Tailwind CSS utility classes
- Consistent color palette
- Responsive design principles
- Accessible color contrast
- Consistent spacing using Tailwind's spacing scale

## UI Responsiveness
- Implement mobile-first design approach using Tailwind CSS responsive utilities
- Use server components for static content that doesn't require interactivity
- Use client components for interactive elements (e.g., form submissions, dynamic updates)
- Implement proper loading states for asynchronous operations
- Ensure all interactive elements are accessible on both mobile and desktop
- Optimize component rendering for performance across different device sizes

## TypeScript Interfaces

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Interface
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
}
```

### AuthForm Props Interface
```typescript
interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess: () => void;
  onError: (error: string) => void;
}
```

For page specifications, see @specs/ui/pages.md.
For API integration, see @specs/api/rest-endpoints.md.