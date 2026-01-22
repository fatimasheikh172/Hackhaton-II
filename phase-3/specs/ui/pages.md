# UI Specifications - Dashboard & Landing

## Landing Page (Unauthenticated)
- **Hero:** Clean typography with "Get Started" primary button.
- **Visuals:** High-fidelity dashboard preview.
- **No mention of "Free" or pricing.** Focus on "Professional Grade Task Management".
- **Value Propositions:**
  - Secure Infrastructure: Better Auth with encrypted sessions
  - Cloud Persistence: Neon PostgreSQL keeps data synced
  - Instant Sync: Seamless frontend-backend connection

## Dashboard (Authenticated)
- **Layout:** Sticky Sidebar (Desktop) / Bottom Nav (Mobile).
- **Task List:** Filterable by Status (Pending, Completed).
- **Interactions:**
  - Hover on TaskCard: Shadow-lg and scale(1.02).
  - Task Completion: Green checkmark with strike-through animation.
- **Sidebar Navigation:**
  - Inbox: All tasks
  - Today: Today's tasks
  - Upcoming: Future tasks
- **Progress Dashboard:** Progress bar showing completion percentage at top
- **Glassmorphic Task Cards:** Transparent background with blur effect

## Authentication Pages
- **Login Page (`/login`):** Professional design using Better Auth
- **Register Page (`/register`):** Professional design using Better Auth
- **Use "Join the Productivity Suite" instead of any "Free" mentions**

## Implementation Guidelines
- Use Shadcn/UI for responsive dashboard
- Focus on whitespace and Slate-900 typography
- Ensure "Get Started" buttons are prominent with Deep Indigo (#4f46e5) color
- Implement glassmorphic design with backdrop-filter effects
- Add hover animations and smooth transitions