import * as authservices from "../services/authServices";
import { IUser } from "../types/auth";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authservices.login(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        return res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
        throw error;
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = await authservices.register(body as IUser);
        return res.status(201).json({ message: "Registration successful", data: user });
    } catch (error) {
        throw error;
    }
};

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        res.json({
            message: "User authenticated successfully",
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            id: user.id,
            profil_pic: user.profil_pic,
            banner_pic: user.banner_pic,
            bio: user.bio,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
