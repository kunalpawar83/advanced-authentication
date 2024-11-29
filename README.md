## advanced authentication and authorization Via OTP and jwt

### Description

This project is a simple implementation of OTP and JWT for authentication and authorization. It is a simple project that demonstrates how to use OTP and JWT for authentication and authorization. The project is implemented using Node.js and MongoDB database.

### Features

- User registration
- User Verification via OTP
- User login
- User logout
- User profile
- User password reset
- User authorization

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- OTP
  -Mail Trap

### Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file and add the following environment variables
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `OTP_SECRET`
   - `MAILTRAP_USER`
   - `MAILTRAP_PASS`
4. Run `npm start` to start the server

### API Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/verify` - Verify a user via OTP
- POST `/api/auth/login` - Login a user
- POST `/api/auth/logout` - Logout a user
- POST `/api/auth/forgot-password` - Forgot password
- POST `/api/auth/reset-password` - Reset password
- GET `/api/users/me` - Get user profile
