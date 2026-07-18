# Project Roadmap & Next Phases

This document outlines the upcoming architecture and features planned for the URL Shortener Platform. The project will evolve from simple microservices to a highly scalable, event-driven architecture using API Gateways, message queues, and caching.

---

## 1. API Gateway

The API Gateway will act as the single entry point for all client requests, routing them to the appropriate microservices.

### Responsibilities:
- **Routing**:
  - `/api/auth/*` ➔ Routes to the **Auth Service**
  - `/api/urls/*` ➔ Routes to the **URL Service**
- **Forward Headers**: The gateway will automatically extract the `Authorization: Bearer xxxx` token and forward it to the appropriate backend service.
- **CORS Management**: Instead of configuring CORS in every single service, it will be configured centrally in the gateway.
- **Centralized Logging**: Log all incoming requests in one place (e.g., `POST /api/auth/login`, `GET /api/urls`, `DELETE /api/urls/123`).
- **Rate Limiting (Future)**: Protect the backend services against spam and abuse.

### Proposed Gateway Structure:
```text
gateway-service/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── url.routes.js
│   ├── middleware/
│   └── config/
```

---

## 2. Analytics Service

After the API Gateway is built, we will introduce a dedicated **Analytics Service**. Its sole responsibility is to record and analyze URL click events.

### Entity: `ClickEvent`
- **URL ID**: The shortened URL that was clicked.
- **User ID**: (Optional) If the user clicking is logged in.
- **IP Address**: To track geographical data.
- **Country**: Derived from IP.
- **Device & Browser**: User agent tracking.
- **Referrer**: Where the click came from.
- **Timestamp**: Exact time of the click.

### Current Progress (Where to start tomorrow)
**Completed Today:**
- [x] Initialized `analytics-service` server, nodemon, and express.
- [x] Configured `.env` and `analyticDB.js` to successfully connect to MongoDB.
- [x] Created `AnalyticsModel` with `urlId`, `userID`, `shortCode`, and `clickedAt` references.
- [x] Built the `createClickRecord` service to isolate database logic.
- [x] Created the Controller and Express Router for `POST /analytics/click`.
- [x] Fixed routing crashes (`AnalyticsController.RecordClick`).

**Next Steps for Tomorrow Morning:**
- [x] Update the `url-service` (or gateway) to send an HTTP POST request to `http://localhost:6000/analytics/click` right before it redirects a user.
- [x] Implement analytics fetching endpoints (e.g., `GET /analytics/:shortCode` to count documents and return the total number of clicks to the frontend).
- [x] (Optional) Add the remaining fields to the schema like IP Address, Device, and Referrer.
---

## 3.  Docker Compose Integration

Once we have multiple services (Auth, URL, Gateway, Analytics) and our MongoDB database, we will use **Docker Compose** to containerize and spin up the entire ecosystem with a single command.

- Gateway ➔ Auth ➔ URL ➔ Analytics ➔ MongoDB

---

## 4. Redis Caching

To ensure the fastest possible redirects, we will introduce **Redis**.

- **Workflow**: 
  1. User requests a `shortCode`.
  2. The system checks **Redis** first.
  3. If not found in Redis, it queries **MongoDB**, then caches the result in Redis for future requests.

---

## 5. RabbitMQ (Event-Driven Architecture)

Instead of the URL Service talking directly (synchronously) to the Analytics Service, we will use **RabbitMQ** as a message broker.

- **Old (Synchronous)**: `URL Service` ➔ `Analytics Service`
- **New (Asynchronous)**: `URL Service` ➔ `RabbitMQ` ➔ `Analytics Service`

This ensures that if the Analytics Service goes down, the URL Service continues to work perfectly without dropping data.

---

## Final Roadmap


```
✅ Auth Service
      │
      ▼
✅ URL Service
      │
      ▼
✅ JWT Integration
      │
      ▼
✅ API Gateway
      │
      ▼
✅ Analytics Service
      │
      ▼
🎉 Project Finalized & Completed

```