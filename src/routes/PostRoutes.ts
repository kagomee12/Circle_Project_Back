import { Router } from "express";
import * as postController from "../controllers/PostController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import {uploadCloudinary} from "../middlewares/cloudinary"
const postRoute = Router();

postRoute.get("/", postController.findAll);

postRoute.get("/:id", postController.findById);
postRoute.get("/images/:user_id", postController.findImagesById);
postRoute.get("/user/:user_id", authorization, postController.findByUserId);


postRoute.post(
   "/",
   authorization,
   upload.array("files", 5),
   uploadCloudinary,
   postController.create
);

postRoute.put("/:id", postController.update);

postRoute.delete("/:id", postController.remove);

export default postRoute;