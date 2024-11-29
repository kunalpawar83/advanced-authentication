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

- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/verify-email` - Verify a user via OTP
- POST `/api/auth/login` - Login a user
- POST `/api/auth/logout` - Logout a user
- POST `/api/auth/forgot-password` - Forgot password
- POST `/api/auth//reset-password/:token` - Reset password
- GET `/api/users/me` - Get user profile

### Screenshots

## Verify Email OTP

![Screenshot 2024-11-29 212047](https://github.com/user-attachments/assets/f24f3364-6dc2-4625-a48a-c7692e5664a1)

## Welcome Email After Registration and Verification

![Screenshot 2024-11-29 212258](https://github.com/user-attachments/assets/66befb55-8da6-499f-bc90-7e1599dddccc)

## Reset Password Email

![Screenshot 2024-11-29 212320](https://github.com/user-attachments/assets/5514c41a-7cb4-45a3-a5e3-815e75387bc3)

## Password Reset Success Email

![Screenshot 2024-11-29 212331](https://github.com/user-attachments/assets/fa8fb723-e92e-4e08-9a4d-098d260e6786)
