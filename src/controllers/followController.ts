import * as followService from '../services/followServices';
import { Request, Response } from "express";
import errorHandler from '../utils/errorHandler';

export const follow = async (req: Request, res: Response) => {
    try {
        const followerId = res.locals.user.id;
        const { followingId } = req.params;

        if (followerId == followingId) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const isFollow = await followService.findFirst(parseInt(followerId), parseInt(followingId));

        if (isFollow) {
            await followService.unfollow(parseInt(followerId), parseInt(followingId));
            return res.status(200).json({ message: "Successfully unfollowed", followed: false });
        }

        await followService.follow(parseInt(followerId), parseInt(followingId));
        return res.status(200).json({ message: "Successfully followed", followed: true });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const data = await followService.getallFollow();
        res.status(200).json({
            message: "Successfully retrieved all followers",
            data: data
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getFollowersById = async (req: Request, res: Response) => {
    try {
        const followerId = res.locals.user.id;
        const { followingId } = req.params;
        const data = await followService.findFirst(parseInt(followerId), parseInt(followingId));
        const followed = data ? true : false;

        res.status(200).json({
            message: followed ? "User is followed" : "User is not followed",
            followed: followed
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getCountfollowing = async (req: Request, res: Response) => {
    try {
        const { followingId } = req.params;
        const Id = parseInt(followingId);
        const following = await followService.countFollowing(Id);

        res.status(200).json({
            message: "Successfully counted following users",
            FOLLOWING: following ? following.length : 0
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getCountfollower = async (req: Request, res: Response) => {
    try {
        const { followerId } = req.params;
        const Id = parseInt(followerId);
        const followers = await followService.countFollower(Id);

        res.status(200).json({
            message: "Successfully counted followers",
            FOLLOWING: followers ? followers.length : 0
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getInfofollowing = async (req: Request, res: Response) => {
    try {
        const { followingId } = req.params;
        const FollowingId = parseInt(followingId);
        const foll = await followService.countFollowing(FollowingId);

        res.status(200).json({
            message: "Successfully retrieved following information",
            data: foll
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}

export const getInfofollower = async (req: Request, res: Response) => {
    try {
        const { followerId } = req.params;
        const FollowerId = parseInt(followerId);
        const foll = await followService.countFollower(FollowerId);

        res.status(200).json({
            message: "Successfully retrieved follower information",
            data: foll
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
}
