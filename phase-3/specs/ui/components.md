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
- Display individual task information
- Status indicator
- Priority indicator
- Due date display
- Quick action buttons (edit, delete, mark complete)

#### TaskList
- Container for multiple TaskCard components
- Filtering controls
- Sorting options
- Empty state handling

#### TaskForm
- Form for creating and editing tasks
- Title input
- Description textarea
- Status selection
- Priority selection
- Due date picker

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

For page specifications, see @specs/ui/pages.md.
For API integration, see @specs/api/rest-endpoints.md.