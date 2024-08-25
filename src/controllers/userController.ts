import * as userService from "../services/userServices";
import errorHandler from "../utils/errorHandler";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await userService.getAllUsers();
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

export const findUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(201).json(user);
        console.log(user);
        
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

export const findUserbyusername = async (req: Request, res: Response) => {
    try {
        const {username} = req.params
        console.log(username);
        const userName = username
        const user = await userService.getUserByusername(userName);
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

