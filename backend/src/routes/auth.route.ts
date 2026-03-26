import { Router } from "express";
import { getMe, loginUser, logout, refreshToken, registerUser, verifyEmail } from "../controller/authController.js";
import authUser from "../middlewares/authMiddleware.js";
const authRouter = Router();


// POST '/api/auth/register'
authRouter.post("/register", registerUser)

// POST '/api/auth/login'
authRouter.post("/login", loginUser)

// GET '/api/auth/logout'
authRouter.get("/logout", logout)

// GET '/api/auth/get-me'
authRouter.get("/get-me", authUser, getMe)

// GET '/api/auth/refresh-token'
authRouter.get("/refresh-token", authUser, refreshToken);

// GET '/api/auth/verify-email'
authRouter.get("/verify-email", authUser, verifyEmail)

export default authRouter;