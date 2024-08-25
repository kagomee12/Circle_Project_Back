import { Router } from "express";
import * as likeController from "../controllers/likesController";
import authorization from "../middlewares/authorization";

const likeRoute = Router();


likeRoute.post(
   "/:post_id", authorization, likeController.createLike
);

likeRoute.get(
   "/:post_id", authorization, likeController.findLike
)

likeRoute.get(
   "/count/:post_id", authorization, likeController.getLike
)


export default likeRoute;