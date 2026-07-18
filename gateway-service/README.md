# Gateway Service

The **Gateway Service** acts as the central entry point for all client requests. It proxies incoming API calls to the appropriate backend microservices and handles rate limiting.

## Features
- **Reverse Proxy**: Routes traffic to `auth-service`, `url-service`, and `analytics-service`.
- **Rate Limiting**: Protects backend services from abuse and spam.
- **Unified Interface**: Clients only need to interact with a single port/URL.
- **Global Error Handling**: Catch-all for not found and server errors.

## Folder Structure
```
src/
├── config/         # Proxy configurations for downstream services
├── middlewares/    # Rate limiters and Auth verification
├── routes/         # Routing logic mapping paths to proxies
├── app.js          # Express app configuration
└── server.js       # Server initialization
```

## Running the Service
```bash
npm install
npm run dev
```
