import express from "express";

import {
  Login,
  Logout,
  Signup,
  VerifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controllers.js";

import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

router.post("/verify-email", VerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
