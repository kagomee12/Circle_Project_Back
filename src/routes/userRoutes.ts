import { Router } from "express";
import * as userController from "../controllers/userController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import { uploadCloudinary } from "../middlewares/cloudinary"
const userRoute = Router();

userRoute.get("/", authorization, userController.getAllUsers);

userRoute.get("/:id", authorization, userController.findUser);

// userRoute.patch("/:id", authorization,
//     upload.single("profil_pic"),
//     uploadCloudinary, userController.updateUser);

// userRoute.patch("/:id", authorization,
//     upload.single("banner_pic"),
//     uploadCloudinary, userController.updateUser);

userRoute.patch("/:id",  upload.single("file"), uploadCloudinary, userController.updateUser);

userRoute.get("/profile/:username", authorization, userController.findUserbyusername)

userRoute.get("/search/:username", authorization, userController.searchUser)

export default userRoute;