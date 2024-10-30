import * as userService from "../services/userServices";
import errorHandler from "../utils/errorHandler";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await userService.getAllUsers();
        res.status(201).json({
            message: "Successfully retrieved all users",
            data: user,
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
};

export const findUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(201).json({
            message: "User found successfully",
            data: user,
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
};

export const findUserbyusername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        console.log(username);
        const user = await userService.getUserByUsername(username);
        res.status(201).json({
            message: "User retrieved successfully by username",
            data: user,
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        if (res.locals.image) {
            req.body.profil_pic = res.locals.image;
        }
        const user = await userService.updateUser(parseInt(req.params.id), req.body);
        res.status(201).json({
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
};

export const searchUser = async (req: Request, res: Response) => {
    try {
        const get = await userService.getSearchUsers(req.params.username);
        res.status(201).json({
            message: "Search completed successfully",
            data: get,
        });
    } catch (error) {
        errorHandler(res, error as unknown as Error);
    }
};
