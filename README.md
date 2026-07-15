## URL Shortener Platform

Welcome to the URL Shortener project! This is a complete backend platform that allows users to create short links (like `bit.ly`) and allows admins to manage them.

To make the platform scalable and professional, it is built using a **Microservices Architecture**. This means instead of one giant app, the project is split into smaller, independent services that talk to each other.

---

## Project Structure

The project is divided into three main folders. Click on each folder to read more about what it does:

1. **[`/auth-service`](./auth-service)**: The bouncer of the club. It handles user registration, secure logins, and generates JWT (JSON Web Token) "ID cards" for users.

2. **[`/url-service`](./url-service)**: The core engine. It takes long URLs, creates short codes, and saves them to MongoDB. It checks the user's JWT ID card before allowing them to create or delete URLs.


---

##  Quick Start Guide

Want to run the whole project on your machine? Follow these simple steps.

### Step 1: Setup Environment Variables
You need a `.env` file inside **both** the `auth-service` and `url-service` folders. 

Create a `.env` file in both folders and add these exact lines:
```env
# Use Port 3000 for auth-service, and 4000 for url-service
PORT=... 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=my_super_secret_password_123
```
*(Important: The `JWT_SECRET` must be exactly the same in both folders so they can understand each other's tokens!)*

### Step 2: Start the Auth Service
Open a new terminal window:
```bash
cd auth-service
npm install
npm run dev
```

### Step 3: Start the URL Service

Open a **second** terminal window:

```bash
cd url-service
npm install
npm run dev
```

