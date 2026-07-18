# Auth Service

The **Auth Service** handles all user authentication, authorization, and profile management for the microservices ecosystem. It issues JWT tokens which are then used across other services.

## Features
- User Registration & Login (hashed passwords using bcrypt).
- JWT Token issuance for secure cross-service communication.
- Profile Management (updating user details, uploading profile pictures).

## Folder Structure
```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers for auth and profile
├── middlewares/    # Custom middlewares
├── models/         # Mongoose schemas for User
├── routes/         # Express routes
├── services/       # External integrations (e.g., ImageKit)
├── app.js          # Express app configuration
└── server.js       # Server initialization
```

## Running the Service
```bash
npm install
npm run dev
```
