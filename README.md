# Task Flow Frontend

This repository contains the React + Vite frontend for Task Flow.

Backend repository:
https://github.com/Amitkumarpatwa/Task-flow-backend.git

## Features
- User registration and login UI
- Protected dashboard pages
- Task CRUD flows connected to backend APIs
- Token-based authentication state management

## Tech Stack
- React
- Vite
- React Router
- Axios

## Prerequisites
- Node.js 18+
- Running backend API from:
  https://github.com/Amitkumarpatwa/Task-flow-backend.git

## Local Setup
1. Install dependencies:
   npm install
2. Create a .env file in project root:
   VITE_API_BASE_URL=http://localhost:5000/api/v1
3. Start the frontend:
   npm run dev

## Scripts
- npm run dev
- npm run build
- npm run lint
- npm run preview

## Project Structure
- frontend/src/components: shared UI components
- frontend/src/pages: route-level pages
- frontend/src/contexts: auth state/context
- frontend/src/api: axios client

## API Docs
When backend is running, Swagger docs are available at:
http://localhost:5000/api-docs
