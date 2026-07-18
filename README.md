# URL Shortener Microservices

A production-ready, scalable URL shortener built with a microservices architecture. It demonstrates modern backend development patterns, inter-service communication, API Gateway routing, and comprehensive testing.

## Why Build a URL Shortener? 
A URL Shortener isn't just about making links smaller. In the real world, this exact architecture is used to:
- **Improve User Experience:** Convert massive, ugly, 200-character URLs into clean, readable links that fit perfectly in SMS messages, Twitter/X posts, and emails.
- **Marketing & Analytics:** Track user engagement. Every time a user clicks a shortened link, the Analytics Service records the click, allowing businesses to measure the success of their marketing campaigns.
- **Link Management:** Businesses can update the original long URL at any time without changing the short link they've already printed on business cards or posted online.
- **Brand Trust:** Custom aliases (like `yourdomain.com/sale`) increase click-through rates compared to random strings.

## System Architecture

The ecosystem consists of four interconnected microservices and a testing suite:

1. **Gateway Service (`:5000`)**: The single entry point for all API requests. Handles routing, rate-limiting, and proxying requests to the appropriate backend services.
2. **Auth Service (`:3000`)**: Manages user registration, login, and profile updates. Issues JWTs for secure access across the ecosystem.
3. **URL Service (`:4000`)**: The core service. Handles the creation, redirection, and administration of shortened URLs.
4. **Analytics Service (`:6000`)**: Tracks and records clicks on shortened URLs, providing analytics on link usage.
5. **API Tester**: An automated end-to-end testing suite that validates the entire architecture's functionality.

## Request Flow
1. Client sends a request to the **API Gateway** (`http://localhost:5000`).
2. Gateway applies rate limiting.
3. If the route requires authentication, the Gateway validates the JWT.
4. The request is proxied to the respective service (`Auth`, `URL`, or `Analytics`).
5. For redirects, the URL Service fetches the original URL, asynchronously fires an event/request to the Analytics Service to record the click, and then redirects the client.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Atlas)

### Installation
Each service manages its own dependencies. You will need to run `npm install` in each directory:
```bash
cd auth-service && npm install
cd ../url-service && npm install
cd ../analytics-service && npm install
cd ../gateway-service && npm install
cd ../api-tester && npm install
```

### Environment Variables
Each service requires a `.env` file. See the `.env.example` in each service (or refer to the codebase) for required keys like `PORT`, `MONGO_URI`, and `JWT_SECRET`.

### Running Locally
To start the entire ecosystem, start each service in a separate terminal:
```bash
cd [service-name] && npm run dev
```

### Testing
To ensure the entire ecosystem is communicating correctly, run the integration suite:
```bash
cd api-tester
npm test
```

## Production Architecture Notes
This codebase features:
- **Dot Notation Naming Conventions** (`auth.controller.js`, `url.routes.js`).
- **Pluralized Standard Directories** (`controllers/`, `middlewares/`, `models/`).
- **Separation of Concerns** (Business logic isolated in `services/`, Express configuration in `app.js`, and Server bootstrapping in `server.js`).
