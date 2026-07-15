# URL Service

The **URL Service** is the core engine of the platform. It handles the actual business logic of shortening URLs and storing them in the database.

## What does it do?

- **Shortens URLs**: Takes a long original URL and generates a random, unique short code (or accepts a custom alias).

- **Validates Input**: Ensures that the provided URL is actually a valid web address before saving it.

- **Secures Data**: Uses an `AuthMiddleware` to read the JWT token (created by the Auth Service) to ensure that only logged-in users can create URLs.

- **Role-Based Access**: Contains completely separate logic for normal Users vs. Admins. Users can only see and delete their *own* URLs, while Admins can manage *everyone's* URLs.

- **Pagination**: Efficiently fetches data in small chunks (pages) so the database doesn't crash if a user has thousands of URLs.

## Environment Variables

Create a `.env` file in this folder:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_shared_jwt_secret
```
*(Note: The `JWT_SECRET` must match the one used in the Auth Service!)*

## Running the Service

```bash
npm install
npm run dev
```
The server will start on `http://localhost:4000`.
