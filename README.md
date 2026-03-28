# Scalable REST API with Authentication & Role-Based Access

This is a full-stack project built using an advanced MVC architecture in Node.js/Express, with a dynamic frontend built in React (Vite). It serves as a comprehensive backend demonstration encompassing token-based authentication, role-based access control, schema validation, and secure RESTful design.

## Features Let's Create!
- **Authentication**: JWT-based secure user registration and secure login. Passwords securely hashed via bcrypt.
- **Role-Based Access Control**: Separate privileges for `user` and `admin` roles.
- **REST APIs**: Full CRUD for a "Task" entity, with relation back to the authenticated user.
- **Advanced Architecture**: Strict separation of concerns (Routes → Controllers → Services → Repositories → Models).
- **Security**: Includes input data sanitization via `express-validator` and basic API hardening using helmet and cors.
- **Frontend Dashboard**: A custom-designed React dashboard that communicates seamlessly with the REST API.

## Project Structure
This repository contains two main folders:
- `backend/`: Node.js Express server.
- `frontend/`: React Vite application.

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a MongoDB Atlas Database URI)

## Setup & Running Locally

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI="mongodb://localhost:27017/internship_db"
   JWT_SECRET="YOUR_SUPER_SECRET_KEY"
   JWT_EXPIRES_IN="1d"
   ```
   *(Note: Replace `MONGO_URI` with your own if using Atlas).*
4. Start the server (Development mode):
   ```bash
   node src/server.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```

## Documentation
The API documentation is generated using Swagger. When the backend server is running, you can view the docs at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)
