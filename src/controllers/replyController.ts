import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/replyServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { log } from "console";

export const findAll = async (req: Request, res: Response) => {
   const {id} = req.params
   const parent_id = parseInt(id)
   const posts = await replyService.findAll(parent_id);
   const get = posts.length
   res.json({posts, get});
};

export const countById = async (req: Request, res: Response) => {
   const {id} = req.params
   const parent_id = parseInt(id)
   const posts = await replyService.findAll(parent_id);
   const get = posts.length
   res.json({get});
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



      const post = await replyService.create(req.body);
      res.json({
         message: "Post created successfully",
         data: post,
      });
   } catch (error) {
      errorHandler(res, error as unknown as Error);
   }
};

export const update = (req: Request, res: Response) => {
   const post = replyService.update(parseInt(req.params.id), req.body);
   res.json(post);
};

export const remove = async (req: Request, res: Response) => {
   try {

      const post = await replyService.remove(parseInt(req.params.id));

   res.json(post);
   } catch (error) {
      errorHandler(res, error as unknown as Error);
   }
};