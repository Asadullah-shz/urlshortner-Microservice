# URL Service

The **URL Service** is the core functional service that handles the creation, redirection, and management of shortened URLs.

## Features
- **URL Shortening**: Generates unique 6-character short codes for long URLs.
- **Redirection**: Resolves short codes back to their original long URLs.
- **Admin Management**: Allows admins to view, update, and delete any URL.
- **User Dashboard**: Allows users to manage their own shortened URLs.

## Folder Structure
```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers for user and admin routes
├── middlewares/    # Auth and error middlewares
├── models/         # Mongoose schema for URLs
├── routes/         # Express routes
├── services/       # Core business logic (generation, redirection)
├── utils/          # Helper functions and validators
├── app.js          # Express app configuration
└── server.js       # Server initialization
```

## Running the Service
```bash
npm install
npm run dev
```
