import * as followController from '../controllers/followController';
import { Router } from 'express';
import authorization from '../middlewares/authorization';

const followRoute = Router();

followRoute.get("/",followController.getFollowers)

followRoute.get("/countfollowing/:followingId",followController.getCountfollowing)

followRoute.get("/countfollower/:followerId",followController.getCountfollower)

followRoute.post("/:followingId",authorization, followController.follow);

followRoute.get("/:followingId",authorization, followController.getFollowersById);

export default followRoute