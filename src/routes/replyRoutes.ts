import { Router } from "express";
import * as replyController from "../controllers/replyController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
import {uploadCloudinary} from "../middlewares/cloudinary"
const repliesRoute = Router();

repliesRoute.get("/:id", replyController.findAll);

repliesRoute.get("/count/:id", replyController.countById)

repliesRoute.post(
   "/:post_id",
   authorization,
   upload.array("image"),
   uploadCloudinary,
   replyController.create
);

repliesRoute.put("/:id", replyController.update);

repliesRoute.delete("/:id", replyController.remove);

export default repliesRoute;