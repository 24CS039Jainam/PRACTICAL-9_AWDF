# AWDF Practical 9 — In-Memory Caching and Query Optimization

**Student:** Jainam Khetani  
**Roll No:** 24CS039  
**Course:** Advanced Web Development Frameworks (ITUE301)

## What this practical implements

- Express + MongoDB + Mongoose backend
- JWT authentication from previous practicals
- `node-cache` server-side in-memory caching
- 60-second TTL by default
- Cached `GET /tasks`
- Separately cached `GET /tasks/:id`
- Cache invalidation after POST, PUT and DELETE
- Cache hit/miss counters
- Debug endpoint for cache statistics
- Clean JSON validation/error responses
- A switch to measure uncached performance without editing source code

## Project structure

```text
24CS039_awdf_practical9/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── src/
│   ├── cache/
│   │   └── cache.js
│   ├── config/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errors.js
│   │   ├── logger.js
│   │   └── validateTask.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       ├── cache.js
│       └── tasks.js
└── docs/
    ├── screenshot-checklist.md
    └── response-time-table.md
```

## Run locally

1. Install Node.js 18+.
2. Run:

```bash
npm install
```

3. Copy `.env.example` to `.env`.
4. Put your MongoDB Atlas connection string in `MONGO_URI`.
5. Set a private `JWT_SECRET`.
6. Start:

```bash
npm start
```

The API runs on `http://localhost:5000`.

## Important: measuring uncached vs cached

The practical asks for 3 readings in each condition.

### Condition A — uncached

Set:

```env
CACHE_ENABLED=false
```

Restart the server. Login, obtain a JWT, and send `GET /tasks` three times.

Record Postman's **Time** value.

### Condition B — cached

Set:

```env
CACHE_ENABLED=true
```

Restart the server. Send `GET /tasks` three times.

The first request should normally show:

```json
"cache": "MISS"
```

and later requests should show:

```json
"cache": "HIT"
```

Record all three Postman times.

Do not invent measurements in the report. Enter the actual values displayed by your Postman run.

## Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`

### Protected task endpoints

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### Cache debugging

- `GET /debug/cache/stats`
- `DELETE /debug/cache/reset`

All task/cache-debug requests require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## GitHub

The practical explicitly asks for the same repository to be updated and for a caching-specific commit. Recommended commit:

```text
feat: add node-cache and task query optimization
```

`.env` is ignored and must never be committed.

### Cache-key correctness

The all-task cache key includes the authenticated user ID, and the single-task cache key includes both the user ID and task ID. This prevents one user's cached data from being returned to another authenticated user.
