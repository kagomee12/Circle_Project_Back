import authRoute from "./authRoutes";
import postRoute from "./PostRoutes";
import { Router } from "express";
import replyRoute from "./replyRoutes";
import likeRoute from "./likeRoutes";
import followRoute from "./followRoutes";
import userRoute from "./userRoutes";
const route = Router();

route.use("/posts", postRoute);
route.use("/auth", authRoute);
route.use("/reply", replyRoute);
route.use("/like", likeRoute);
route.use("/follow", followRoute);
route.use("/user",userRoute)

export default route;