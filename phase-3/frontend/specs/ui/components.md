# UI Component Specs

## Theme
- **Background:** Use Tailwind 'slate' palette (slate-50, slate-100 for backgrounds)
- **Primary Actions:** Use 'indigo-600' for primary actions and buttons
- **Success State:** Use 'green-500' for task completion and success indicators
- **Glassmorphism Effect:** Use backdrop-filter with blur and semi-transparent backgrounds

## Layout Structure (Three-Zone Layout)

### 1. Sidebar (Navigation)
- Width: 280px on desktop, collapses to hamburger menu on mobile
- Background: `bg-white/80 dark:bg-slate-900/80` with glassmorphism effect
- Contains:
  - Filters (All, Pending, Completed)
  - Categories (Work, Personal, etc.)
  - User Profile section with logout button

### 2. Main Content Area
- Task list cards with glassmorphism effect
- Each card has:
  - "Complete" toggle (checkbox)
  - "Edit" icon button
  - "Delete" icon button
  - Status badges (pending/completed)

### 3. Floating Action Button
- "Add Task" button positioned at bottom right
- Triggers a modal dialog for task creation
- Uses indigo-600 color with subtle shadow

## Components

### Task Card Component
- Glassmorphism background: `bg-white/70 dark:bg-slate-800/70`
- Border: `border border-slate-200/50 dark:border-slate-700/50`
- Rounded corners: `rounded-xl`
- Shadow: `shadow-sm`
- Hover effect: `hover:shadow-md transition-all duration-200`

### Status Badges
- **Pending:** `bg-amber-100/80 text-amber-800 border border-amber-200/50`
- **Completed:** `bg-green-100/80 text-green-800 border border-green-200/50`
- **In Progress:** `bg-blue-100/80 text-blue-800 border border-blue-200/50`

### Empty State
- Centered illustration or icon
- "No tasks found" message
- Subtle animation using framer-motion

### Skeleton Loaders
- Shimmer effect for loading states
- Use glassmorphism styling during loading

## Responsive Design
- Mobile-first approach
- Sidebar collapses to hamburger menu on screens < 768px
- Floating action button moves to bottom center on mobile
- Task cards stack vertically with full width on mobile

## Animations
- Smooth transitions for task completion
- Framer-motion for list animations (add/delete)
- Modal entrance/exit animations