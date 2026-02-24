# SkillSphere

SkillSphere is a full-stack TypeScript project focused on helping users understand their skills, improve with targeted guidance, and prepare strong resume content.

The current codebase includes a React + Vite frontend, an Express + MongoDB backend, authentication, and a protected dashboard. The product vision extends this into AI-powered skill advice and resume assistance.

## Core Idea

SkillSphere is built to answer:

- What skills does a user already have?
- What should they improve next?
- How can they present those skills clearly in a resume?

## Current Features

- Public landing page with `Home`, `Features`, `About`, and `Contact` sections
- Authentication APIs (`signup`, `login`, `current-user`, `refresh-token`)
- JWT-based protected routes
- Role-aware dashboard APIs (user/admin checks)
- Protected frontend dashboard route
- Dark/light theme support

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Redux Toolkit, React Router
- Backend: Express, TypeScript, Mongoose, JWT, bcrypt
- Tooling: ESLint, tsx, dotenv

## Project Structure

```text
src/
  apps/
    frontend/
      components/
      constants/
      contexts/
      pages/
      redux/
      routes/
      services/
      types/
    backend/
      database/
      middlewares/
      modules/
      utils/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
DBURL=add your db connection string 
JWT_SECRET=replace-with-a-strong-secret
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_VERSION=dev
```

Notes:

- `DBURL` is required for authentication and user-backed features.
- If `DBURL` is missing, the server still starts, but DB-dependent endpoints will not work.
- `VITE_API_BASE_URL` is optional for same-origin usage; defaults to `window.location.origin`.

### 3. Run development server

```bash
npm run dev
```

This starts the Express server with Vite middleware on `http://localhost:3000`.

## Scripts

- `npm run dev` - Start backend server (with Vite middleware in development)
- `npm run dev:backend` - Alias for backend dev server
- `npm run dev:frontend` - Start Vite frontend only on port `3000`
- `npm run build` - Type-check and build production frontend bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Overview

Base URL: `/api`


## Product Roadmap

Planned SkillSphere modules:

- Skill assessment and profiling engine
- AI-driven personalized learning/advice
- Resume AI assistant for role-targeted resume generation
- Skill-gap insights and progress analytics

## Troubleshooting

- `JWT_SECRET is not configured`: add `JWT_SECRET` in `.env`.
- `DBURL is not set`: add `DBURL` to connect MongoDB.
- If build/typecheck fails due missing optional UI libs in legacy files, install missing packages or remove unused imports/components before running `npm run build`.
