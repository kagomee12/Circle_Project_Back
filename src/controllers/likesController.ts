import * as likeService from "../services/likeServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const createLike = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const user_id = res.locals.user.id;
    req.body.user_id = user_id;
    req.body.post_id = parseInt(post_id);

    const post = await likeService.findFirst(parseInt(post_id), user_id);

    if (post) {
      await likeService.unlike(parseInt(post_id), parseInt(user_id));
      return res.status(200).json({ message: "Successfully unliked the post", liked: false });
    }

    await likeService.like(req.body);
    return res.status(200).json({ message: "Successfully liked the post", liked: true });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const findLike = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const user_id = res.locals.user.id;

    const post = await likeService.findFirst(parseInt(post_id), user_id);
    const liked = post ? true : false;

    return res.status(200).json({
      message: liked ? "User has liked the post" : "User has not liked the post",
      liked: liked,
      post: liked ? post : null
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const getLike = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const post = await likeService.findLike(parseInt(post_id));
    const get = post.length;

    return res.status(200).json({
      message: "Successfully retrieved the number of likes",
      total_likes: get,
      likes_data: post
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
