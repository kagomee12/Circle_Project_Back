import { Router } from "express";
import * as userController from "../controllers/userController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import {uploadCloudinary} from "../middlewares/cloudinary"
const userRoute = Router();

userRoute.get("/", authorization, userController.getAllUsers);

userRoute.get("/:id", authorization, userController.findUser);
userRoute.patch("/:id", authorization,  upload.fields([
    { name: 'profil_pic' },
    { name: 'banner_pic' }
]), uploadCloudinary, userController.updateUser);

userRoute.get("/profile/:username", authorization, userController.findUserbyusername)

userRoute.get("/search/:username", authorization, userController.searchUser)

export default userRoute;