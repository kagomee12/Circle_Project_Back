import * as followController from '../controllers/followController';
import { Router } from 'express';
import authorization from '../middlewares/authorization';

const followRoute = Router();

followRoute.get("/",followController.getFollowers)

followRoute.get("/countfollowing/:followingId",followController.getCountfollowing)

followRoute.get("/countfollower/:followerId",followController.getCountfollower)

followRoute.post("/:followingId",authorization, followController.follow);

followRoute.get("/:followingId",authorization, followController.getFollowersById);

followRoute.get("/getfollowing/:followingId",authorization, followController.getInfofollowing);
followRoute.get("/getfollower/:followerId",authorization, followController.getInfofollower);

export default followRoute