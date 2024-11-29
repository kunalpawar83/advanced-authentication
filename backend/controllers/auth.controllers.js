import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordSuccessEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const Signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Please fill all fields");
    }
    const userAlreadyExists = await User.findOne({ email });
    console.log(userAlreadyExists);
    if (userAlreadyExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    //jwt
    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, user.verificationToken);
    res.status(201).json({
      success: true,
      message: "User created",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const VerifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email);
    res.status(200).json({ success: true, message: "Email verified" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const Logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
  res.status(200).json({ success: true, message: "Logged out" });
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Logged in",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();
    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    // update password
    const hashedPassword = await bcryptjs.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendPasswordSuccessEmail(user.email, "Your password has been reset");
    res.status(200).json({ success: true, message: "Password reset" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
