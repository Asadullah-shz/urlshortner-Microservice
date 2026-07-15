# Auth Service

The **Auth Service** is responsible for all user identity and security operations. It acts as the "front door" to the platform.

## What does it do?

- **Registers Users**: Accepts a username, email, and password.

- **Secures Passwords**: Uses `bcryptjs` to irreversibly scramble (hash) passwords before saving them to the database.

- **Logs Users In**: Verifies passwords and generates a **JWT (JSON Web Token)**. This token is stored in an HTTP-only cookie and acts as a digital ID card for the user.

- **Uploads Profile Pictures**: Integrates with a storage service to upload and store user avatars.

## Environment Variables

Create a `.env` file in this folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_shared_jwt_secret
```

## Running the Service
```bash
npm install
npm run dev
```
The server will start on `http://localhost:3000`.
