import { Router } from "express";
import * as userController from "../controllers/userController";
import authorization from "../middlewares/authorization";
const userRoute = Router();

userRoute.get("/", authorization, userController.getAllUsers);

userRoute.get("/:id", authorization, userController.findUser);

userRoute.get("/profile/:username", authorization, userController.findUserbyusername)

export default userRoute;