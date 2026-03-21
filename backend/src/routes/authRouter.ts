import { Router } from "express";
import { getMe, loginUser, logout, registerUser, verifyEmail } from "../controller/authController.js";
const authRouter = Router();


// POST '/api/auth/register'
authRouter.post("/register", registerUser)

// POST '/api/auth/login'
authRouter.post("/login", loginUser)

// GET '/api/auth/logout'
authRouter.get("/logout", logout)

// GET '/api/auth/get-me'
authRouter.get("/get-me", getMe)

authRouter.post("verify-email", verifyEmail)

export default authRouter;