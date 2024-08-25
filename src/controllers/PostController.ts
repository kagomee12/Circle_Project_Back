import { createPostSchema } from "../libs/validations/post";
import * as postService from "../services/PostServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { log } from "console";

export const findAll = async (req: Request, res: Response) => {
   const posts = await postService.findAll();
   const pos = posts.sort((a, b) => b.id - a.id);
   res.json(pos);
};

export const findById = async (req: Request, res: Response) => {
   const post = await postService.findById(parseInt(req.params.id));
   res.json(post);
};
export const findByUserId = async (req: Request, res: Response) => {
   const post = await postService.findByIdUser(parseInt(req.params.user_id));
   res.json(post);
};

export const create = async (req: Request, res: Response) => {
   try {
      await createPostSchema.validateAsync(req.body);
      
      if (req.files) {
         req.body.images = req.files;
      }

      const user_id = res.locals.user.id;
      req.body.user_id = user_id;

      const post = await postService.create(req.body);
      res.json({
         message: "Post created successfully",
         data: post,
      });
   } catch (error) {
      errorHandler(res, error as unknown as Error);
   }
};

export const update = (req: Request, res: Response) => {
   const post = postService.update(parseInt(req.params.id), req.body);
   res.json(post);
};

export const remove = (req: Request, res: Response) => {
   try {

      const post = postService.remove(parseInt(req.params.id));
   res.json(post);
   console.log(post);
   } catch (error) {
      errorHandler(res, error as unknown as Error);
   }
};