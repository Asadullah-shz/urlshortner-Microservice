# Analytics Service

The **Analytics Service** is responsible for recording and tracking user clicks on shortened URLs. It maintains analytics records, tracking which short codes are accessed, when, and by whom.

## Features
- Records individual click events (timestamps, user info) for shortened URLs.
- Provides analytics data fetching capabilities (e.g., retrieving total clicks for a specific short link).
- Secured via JWT authentication from the API Gateway.

## Folder Structure
```
src/
├── controllers/    # Handles incoming analytics requests
├── middlewares/    # JWT Authentication middleware
├── models/         # Mongoose schema for Analytics records
├── routes/         # Express routes for analytics endpoints
├── services/       # Core logic for recording clicks
├── app.js          # Express app configuration
└── server.js       # Server initialization
```

## Running the Service
```bash
npm install
npm run dev
```
