import { Router } from "express";
import * as authContorller from "../controllers/authController";
import authorization from "../middlewares/authorization";

const authRoutes = Router();

authRoutes.post("/login", authContorller.login);
authRoutes.post("/Register", authContorller.register);
authRoutes.get("/me", authorization, authContorller.checkAuth)

export default authRoutes;