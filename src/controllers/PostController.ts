import { createPostSchema } from "../libs/validations/post";
import * as postService from "../services/PostServices";
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export const findAll = async (req: Request, res: Response) => {
   const posts = await postService.findAll();
   const pos = posts.sort((a, b) => b.id - a.id);
   res.json(pos);
};

export const findById = async (req: Request, res: Response) => {
   const post = await postService.findById(parseInt(req.params.id));
   return res.json(post);
};
export const findImagesById = async (req: Request, res: Response) => {
   const post = await postService.findimagesById(parseInt(req.params.user_id));
   return res.json(post);
};
export const findByUserId = async (req: Request, res: Response) => {
   const post = await postService.findByIdUser(parseInt(req.params.user_id));
   res.json(post);
};

export const create = async (req: Request, res: Response) => {
   try {
      console.log("test");
      
      await createPostSchema.validateAsync(req.body);
      
      if (res.locals.image) {
         req.body.images = res.locals.image;
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
      console.log(error);
      
   }
};

export const update = async (req: Request, res: Response) => {
   const post = await postService.update(parseInt(req.params.id), req.body);
   res.json(post);
};

export const remove = async (req: Request, res: Response) => {
   try {

   const post = await postService.remove(parseInt(req.params.id));
   res.json(post);
   } catch (error) {
      errorHandler(res, error as unknown as Error);
   }
};