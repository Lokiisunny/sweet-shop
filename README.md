Sweet Shop Management System (React, Node, Express, MongoDB)
===========================================================

Stack
- Backend: Node.js, Express, JWT, Mongoose (MongoDB)
- Frontend: React (Vite)

Backend setup
1) cd backend && npm i
2) Copy .env: create backend/.env with:
   MONGODB_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=change-me
   PORT=4000
3) npm run dev

Frontend setup
1) cd frontend && npm i
2) create frontend/.env with:
   VITE_API_URL=http://localhost:4000/api
3) npm run dev

API endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/sweets (auth)
- GET /api/sweets/search (auth)
- POST /api/sweets (admin)
- PUT /api/sweets/:id (admin)
- DELETE /api/sweets/:id (admin)
- POST /api/sweets/:id/purchase (auth)
- POST /api/sweets/:id/restock (admin)

My AI Usage
- Generated initial scaffolding, routes, and UI; reviewed and adjusted manually.

Sweet Shop Management System
============================

Monorepo with backend (Express + TypeScript + Prisma + SQLite) and frontend (Vite + React + TypeScript).

Requirements covered
- REST API with JWT auth, protected sweets CRUD, purchase/restock with RBAC
- SQLite via Prisma with migrations and seed
- SPA with auth, dashboard, search/filter, purchase, admin CRUD
- Tests: Jest (backend), Vitest + RTL (frontend)

Getting started
1. Prerequisites: Node.js >= 18, npm
2. Backend
   - Copy `backend/.env.example` to `backend/.env` and adjust values
   - Install deps: `cd backend && npm i`
   - Generate client & migrate: `npm run generate && npm run migrate`
   - Seed: `npm run seed`
   - Dev server: `npm run dev` (http://localhost:4000)
   - Tests: `npm test`
3. Frontend
   - `cd ../frontend && npm i`
   - Dev: `npm run dev` (http://localhost:5173)
   - Set `VITE_API_URL` in `frontend/.env` to `http://localhost:4000/api`

API
- POST /api/auth/register
- POST /api/auth/login
- GET /api/sweets (auth)
- GET /api/sweets/search (auth)
- POST /api/sweets (admin)
- PUT /api/sweets/:id (admin)
- DELETE /api/sweets/:id (admin)
- POST /api/sweets/:id/purchase (auth)
- POST /api/sweets/:id/restock (admin)

My AI Usage
- Tools: "AI Assistant"
- How: Generated scaffolding, boilerplate, tests, and refactors; I reviewed and adapted.
- Impact: Accelerated setup, maintained TDD flow by writing tests alongside implementation.

Test Report
- Run `npm test` in `backend` and `frontend` to see results. Consider exporting coverage in CI.


