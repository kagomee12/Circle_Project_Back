import * as likeService from '../services/likeServices';
import { Request, Response } from "express";
import errorHandler from '../utils/errorHandler';


export const createLike = async (req: Request, res: Response) => {
    try {
    // await createPostSchema.validateAsync(req.body);
    console.log(res.locals.user);
    const {post_id} = req.params;
    const user_id = res.locals.user.id;
    req.body.user_id = user_id;
    req.body.post_id = parseInt(post_id);

    console.log(req.body);

    const post = await likeService.findFirst( parseInt(post_id), user_id);
    
    if (post) {
       await likeService.unlike( parseInt(post_id),parseInt(user_id));
       let liked = false
       return res.status(200).json({liked});
    }

    await likeService.like(req.body);
    let liked = true
    return res.status(200).json({liked});
    
    
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }    
}

export const findLike = async (req: Request, res: Response) => {
    try {
        const {post_id} = req.params;
        const user_id = res.locals.user.id;
        const post = await likeService.findFirst( parseInt(post_id), user_id);
        const liked = post ? true : false
        if (liked == true) {
        return res.status(200).json({liked});
        }
        return res.status(200).json({post:null});
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }    
}

export const getLike = async (req: Request, res: Response) => {
    try {
        const {post_id} = req.params;
        const post = await likeService.findLike( parseInt(post_id));
        const get = post.length
        return res.status(200).json({post,get});
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }    
}