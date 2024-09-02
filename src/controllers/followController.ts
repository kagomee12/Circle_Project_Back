import * as followService from '../services/followServices';
import { Request, Response } from "express";
import errorHandler from '../utils/errorHandler';
import { log } from 'console';

export const follow = async (req: Request, res: Response) => {
    try {
    const  followerId  = res.locals.user.id;
    const { followingId } = req.params;
    
    if (followerId == followingId) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
    }
    const isFollow = await followService.findFirst(parseInt(followerId), parseInt(followingId));
    
    if(isFollow) {
        await followService.unfollow(parseInt(followerId), parseInt(followingId));
        let followed = false
        return res.status(200).json(followed);
    }

    await followService.follow(parseInt(followerId), parseInt(followingId));
    let followed = true
    return res.status(200).json(followed);

    }catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}
export const getFollowers = async (req: Request, res: Response) => {
    const data = await followService.getallFollow()
    res.json(data);
}

export const getFollowersById = async (req: Request, res: Response) => {
    const  followerId  = res.locals.user.id;
    const { followingId } = req.params;
    req.body.followerId = parseInt(followerId);
    req.body.followingId = followingId;
    const data = await followService.findFirst(parseInt(followerId), parseInt(followingId))
    const followed = data ? true : false
        if (followed == true) {
        return res.status(200).json({followed});
        }
        return res.status(200).json({followed: false});
}

export const getCountfollowing = async (req: Request, res: Response) => {
    const {followingId} = req.params
    const Id = parseInt(followingId)
    const following = await followService.countFollowing(Id)

    if (following) {
    const FOLLOWING =  following.length

    res.json({FOLLOWING})
    }else {
        const FOLLOWING =  0
        res.json({FOLLOWING})
    }
    
}
export const getCountfollower = async (req: Request, res: Response) => {
    const {followerId} = req.params
    const Id = parseInt(followerId)
    const following = await followService.countFollower(Id)

    if (following) {
    const FOLLOWING =  following.length

    res.json({FOLLOWING})
    }else {
        const FOLLOWING =  0
        res.json({FOLLOWING})
    }
    
}

export const getInfofollowing = async (req: Request, res: Response) => {
    try {
    const {followingId} = req.params;
    const FollowingId = parseInt(followingId)
    
    const foll = await followService.countFollowing(FollowingId)

    res.json(foll)
    } catch (error) {
        errorHandler(res, error as unknown as Error); 
    }
}

export const getInfofollower = async (req: Request, res: Response) => {
    try {
    const {followerId} = req.params;
    const FollowerId = parseInt(followerId)
    
    const foll = await followService.countFollower(FollowerId)

    res.json(foll)
    } catch (error) {
        errorHandler(res, error as unknown as Error); 
    }
}

