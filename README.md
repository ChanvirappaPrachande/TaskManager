# Task Manager

A full-stack Task Manager built with **Next.js 15 (App Router)**, **Prisma**, and **PostgreSQL**.

---

# Tech Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | Next.js 16, React, CSS          |
| Backend  | Next.js API Routes (App Router) |
| ORM      | Prisma                          |
| Database | PostgreSQL                      |
| API Docs | Swagger / OpenAPI               |

---

# Project Structure

```
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET /api/tasks, POST /api/tasks
│   │       └── [id]/
│   │           └── route.ts      # PATCH /api/tasks/:id, DELETE /api/tasks/:id
│   ├── api-docs/
│   │   └── page.tsx              # Swagger UI
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Server component — fetches tasks via Prisma
├── components/
│   ├── Taskmanager.tsx           # Orchestrates state
│   ├── Taskform.tsx              # Add task form
│   ├── Tasklist.tsx              # Filter bar + list
│   └── Taskitem.tsx              # Single task row (toggle, edit, delete)
├── lib/
│   ├── prisma.ts                 # Prisma singleton client
│   ├── api.ts                    # Fetch helpers (client-side)
│   ├── swagger.ts                # Swagger configuration
│   └── types.ts                  # Shared TypeScript types
└── prisma/
    └── schema.prisma
```

---

# Setup & Run

## 1 Install dependencies

```bash
npm install
```

---

## 2 Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/taskmanager"
```

---

## 3 Run database migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 4 Start the dev server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# API Documentation

Interactive API documentation is available via **Swagger UI**.

Open in browser:

```
http://localhost:3000/api-docs
```

The documentation is generated automatically using **Swagger / OpenAPI** via **next-swagger-doc**.

Swagger provides:

- Interactive API testing
- Request/response schema visualization
- Endpoint documentation
- Example payloads

---

# API Endpoints

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/tasks`     | Return all tasks                  |
| POST   | `/api/tasks`     | Create a new task                 |
| PATCH  | `/api/tasks/:id` | Update title or completion status |
| DELETE | `/api/tasks/:id` | Delete a task                     |

---

# Example Requests

## Create Task

**POST `/api/tasks`**

```json
{
  "title": "Buy groceries"
}
```

Response:

```json
{
  "id": "clx123",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-04-09T10:20:33.000Z",
  "updatedAt": "2026-04-09T10:20:33.000Z"
}
```

---

## Update Task

**PATCH `/api/tasks/:id`**

Toggle completion:

```json
{
  "completed": true
}
```

Edit title:

```json
{
  "title": "Buy more groceries"
}
```

---

## Delete Task

**DELETE `/api/tasks/:id`**

Response:

```json
{
  "message": "Task deleted successfully"
}
```

---

# Assumptions & Trade-offs

- **Server-side initial render**: The homepage fetches tasks directly via Prisma (server component) for fast first paint, then all mutations go through API routes from the client.
- **Optimistic-free updates**: Each task shows its own loading state to keep error handling simple.
- **No authentication**: Authentication is intentionally excluded for simplicity.
- **Client-side filtering**: Task filters (all / active / completed) are done in-memory since the dataset is expected to be small.
- **Inline editing**: Double-click a task title to enter edit mode; press Escape to cancel.

---

# Future Improvements

Possible extensions:

- Authentication (JWT / OAuth)
- Pagination for large task sets
- Server-side filtering
- Drag-and-drop task ordering
- Unit + integration tests
- Deployment with **Vercel**

---
