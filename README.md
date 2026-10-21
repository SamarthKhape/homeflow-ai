# HomeFlow AI — Frontend

Premium React + Vite frontend for the HomeFlow AI household-management hackathon project.

## Stack
- React + Vite
- React Router (declarative routing)
- Tailwind CSS v4 with the official Vite plugin
- Lucide React
- Native Fetch API
- JavaScript / JSX

## Run
```bash
npm install
npm run dev
```
Then open the URL printed by Vite (normally `http://localhost:5173`).

## Environment
Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCKS=true
```

Set `VITE_USE_MOCKS=false` only after the backend endpoint contracts are confirmed.

## Backend contract placeholders
The frontend currently expects:
- `POST /api/chat` → `{ message, workflow? }` or `{ reply, workflow? }`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/shopping`
- `POST /api/shopping`
- `PATCH /api/shopping/:id`
- `DELETE /api/shopping/:id`
- `GET /api/reminders`
- `POST /api/reminders`
- `PATCH /api/reminders/:id`
- `DELETE /api/reminders/:id`

These are integration placeholders, not claims about the teammate's backend. Confirm exact routes and schemas before production integration.

## Mock mode
Mock mode is enabled by default so the frontend can be developed before the backend is ready. Mock UI is visibly marked as development mode and must not be treated as real execution.

## Features
- Responsive dark AI SaaS dashboard
- Dashboard overview cards, priority tasks, recent activity
- AI assistant chat with suggested prompts and loading/error states
- Workflow execution panel with Pending/Running/Completed/Failed status support
- Task creation, filtering and completion
- Shopping list add/remove/purchase controls and filters
- Reminder creation and scheduling UI
- Responsive sidebar/mobile navigation
- Accessible focus states and empty/error/loading states
- Centralized API client + service modules
- `.env.example` and integration documentation
