import { Router } from "express";
import * as replyController from "../controllers/replyController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
const repliesRoute = Router();

repliesRoute.get("/:id", replyController.findAll);

repliesRoute.get("/count/:id", replyController.countById)

repliesRoute.post(
   "/:post_id",
   authorization,
   upload.single("image"),
   replyController.create
);

repliesRoute.put("/:id", replyController.update);

repliesRoute.delete("/:id", replyController.remove);

export default repliesRoute;