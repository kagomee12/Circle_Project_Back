import { createPostSchema } from "../libs/validations/post";
import * as postService from "../services/PostServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findAll();
    const sortedPosts = posts.sort((a, b) => b.id - a.id);
    res.status(200).json({
      message: "Posts retrieved successfully",
      totalPosts: sortedPosts.length,
      data: sortedPosts,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const post = await postService.findById(parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const findImagesById = async (req: Request, res: Response) => {
  try {
    const images = await postService.findimagesById(parseInt(req.params.user_id));
    res.status(200).json({
      message: "Images retrieved successfully",
      data: images,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const findByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findByIdUser(parseInt(req.params.user_id));
    res.status(200).json({
      message: "Posts by user retrieved successfully",
      totalPosts: posts.length,
      data: posts,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    await createPostSchema.validateAsync(req.body);

    if (res.locals.images) {
      req.body.images = res.locals.images;
    }

    const user_id = res.locals.user.id;
    req.body.user_id = user_id;

    const post = await postService.create(req.body);
    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updatedPost = await postService.update(parseInt(req.params.id), req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found or update failed" });
    }
    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const removedPost = await postService.remove(parseInt(req.params.id));
    if (!removedPost) {
      return res.status(404).json({ message: "Post not found or deletion failed" });
    }
    res.status(200).json({
      message: "Post deleted successfully",
      data: removedPost,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
