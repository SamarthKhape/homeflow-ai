# Member 2 — REST API, Database & Business Logic

Node.js + Express REST API with persistent JSON-file storage for a ₹0 local prototype. No cloud database or paid service is required.

## Requirements
- Node.js 20 or newer
- npm

## Setup (Windows / VS Code)
1. Extract this ZIP.
2. Open the extracted `member2-rest-api` folder in VS Code.
3. In Terminal, run `npm install`.
4. Copy `.env.example` to `.env` (on Windows: `copy .env.example .env` in Command Prompt, or `Copy-Item .env.example .env` in PowerShell).
5. Run `npm run dev` or `npm start`.
6. Open `http://localhost:3000/health`. Expected JSON: `{"success":true,"message":"API is running","storage":"json-file"}`.

The app creates `data/db.json` automatically. Data persists across server restarts. Do not delete this file if you want to keep your data.

## Important storage note
This JSON store is suitable for a single-process prototype/demo. It is not designed for concurrent multi-process production traffic. For production or multiple users/devices, use MongoDB or another database and add authentication/authorization. This prototype does not implement user accounts; records are shared by all API clients.

## API response format
Success: `{ "success": true, "data": ... }`
Error: `{ "success": false, "error": { "message": "...", "details": [...] } }`

## Endpoints

### Tasks
- `POST /api/tasks` — create
- `GET /api/tasks` — list; optional `?status=pending|in_progress|completed&priority=low|medium|high`
- `GET /api/tasks/:id` — read one
- `PATCH /api/tasks/:id` — update selected fields
- `DELETE /api/tasks/:id` — delete

Task body example:
```json
{
  "title": "Submit assignment",
  "description": "Finish API documentation",
  "dueDate": "2026-12-01",
  "priority": "high",
  "status": "pending"
}
```
`dueDate` may be omitted or `null`. Valid statuses: `pending`, `in_progress`, `completed`. Valid priorities: `low`, `medium`, `high`.

### Shopping items
- `POST /api/shopping` — create
- `GET /api/shopping` — list; optional `?status=pending|purchased`
- `GET /api/shopping?status=pending` — pending only
- `GET /api/shopping?status=purchased` — purchased only
- `GET /api/shopping/:id` — read one
- `PATCH /api/shopping/:id` — update selected fields
- `DELETE /api/shopping/:id` — delete

Shopping body example:
```json
{
  "name": "Rice",
  "quantity": 2,
  "unit": "kg",
  "status": "pending"
}
```
Quantity must be a number greater than zero. Valid statuses: `pending`, `purchased`.

### Reminders
- `POST /api/reminders` — create
- `GET /api/reminders` — list; optional `?status=pending|completed`
- `GET /api/reminders/:id` — read one
- `PATCH /api/reminders/:id` — update selected fields
- `DELETE /api/reminders/:id` — delete

Reminder body example:
```json
{
  "title": "Doctor appointment",
  "date": "2026-12-03",
  "time": "10:30",
  "status": "pending"
}
```
Date must be a real `YYYY-MM-DD` calendar date. Time must use 24-hour `HH:mm`. Valid statuses: `pending`, `completed`. This API stores reminders; it does not send push notifications or run a scheduler.

### Conversations (reserved for AI integration)
- `POST /api/conversations`
- `GET /api/conversations`
- `GET /api/conversations/:id`
- `PATCH /api/conversations/:id`
- `DELETE /api/conversations/:id`

Body example:
```json
{ "title": "Planning my day", "messages": [] }
```

### General
- `GET /health` — health check
- `GET /` — API welcome
- `404` for unknown routes
- Centralized error handler returns JSON.
- CORS is configured using `CORS_ORIGIN` (comma-separated origins). Set `*` only for local testing if needed; do not use it with credentials.

## Test with curl (PowerShell-compatible examples)
Create task:
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/tasks -ContentType "application/json" -Body '{"title":"Test task","priority":"high"}'
```
List tasks:
```powershell
Invoke-RestMethod http://localhost:3000/api/tasks
```
Filter:
```powershell
Invoke-RestMethod "http://localhost:3000/api/tasks?status=pending&priority=high"
```
Create shopping item:
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/shopping -ContentType "application/json" -Body '{"name":"Milk","quantity":2,"unit":"litre"}'
```
Create reminder:
```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/reminders -ContentType "application/json" -Body '{"title":"Meeting","date":"2026-12-03","time":"14:00"}'
```
Delete a record by using its returned `data.id`:
```powershell
Invoke-RestMethod -Method Delete -Uri http://localhost:3000/api/tasks/PASTE_ID_HERE
```

## Member 1 integration
Call these URLs from the frontend/agent. Keep API keys and secrets on the server, never in frontend code. Service modules under `src/services/` can also be imported directly by other backend modules.
