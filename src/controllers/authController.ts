import { log, profile } from "console";
import * as authservices from "../services/authServices"
import { IUser } from "../types/auth";
import { Request, Response } from "express";

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
       console.log(body);

       const user = await authservices.register(body as IUser);
       
       

       return res.status(201).json(user);

    } catch (error) {
        throw error
    }
}
export const checkAuth = async (req: Request, res: Response) => {
    try {
       const user = res.locals.user;
        console.log(user);
        
       res.json({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          id: user.id,
          profil_pic: user.profil_pic,
          banner_pic: user.banner_pic,
          bio: user.bio
       });
    } catch (error) {
       console.log(error);
       res.status(500).json(error);
    }
 };