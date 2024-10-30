import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/replyServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parent_id = parseInt(id);
    const replies = await replyService.findAll(parent_id);
    const count = replies.length;
    res.status(200).json({
      message: "Replies retrieved successfully",
      totalReplies: count,
      data: replies,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const countById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parent_id = parseInt(id);
    const replies = await replyService.findAll(parent_id);
    const count = replies.length;
    res.status(200).json({
      message: "Count retrieved successfully",
      totalReplies: count,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    await createPostSchema.validateAsync(req.body);

    if (req.files) {
      req.body.images = req.files;
    }

    const post_id = parseInt(req.params.post_id);
    const user_id = res.locals.user.id;
    req.body.user_id = user_id;
    req.body.parent_id = post_id;

    const newReply = await replyService.create(req.body);
    res.status(201).json({
      message: "Reply created successfully",
      data: newReply,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updatedReply = await replyService.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedReply) {
      return res
        .status(404)
        .json({ message: "Reply not found or update failed" });
    }
    res.status(200).json({
      message: "Reply updated successfully",
      data: updatedReply,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deletedReply = await replyService.remove(parseInt(req.params.id));
    if (!deletedReply) {
      return res
        .status(404)
        .json({ message: "Reply not found or deletion failed" });
    }
    res.status(200).json({
      message: "Reply deleted successfully",
      data: deletedReply,
    });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
