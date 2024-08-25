import * as authservices from "../services/authServices"
import { IUser } from "../types/auth";
import { Request, Response, NextFunction } from "express";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authservices.login(email, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
            
        }

        return res.status(200).json(user);
    } catch (error) {
        throw error
    }
}


export const register = async (req: Request, res: Response) => {
    try {
       const body = req.body;
       
       const user = await authservices.register(body as IUser);

       return res.status(201).json(user);

    } catch (error) {
        throw error
    }
}
export const checkAuth = async (req: Request, res: Response) => {
    try {
       const user = res.locals.user;
 
       res.json({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          id: user.id
       });
    } catch (error) {
       console.log(error);
       res.status(500).json(error);
    }
 };