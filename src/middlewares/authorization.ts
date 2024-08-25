import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "no authorized" });
    }

    const payload = jwt.verify(token, process.env.SECRETKEY || "merdekaataumati");

    if(!payload) {
        return res.status(401).json({ message: "no Unauthorized" });       
    }

    res.locals.user = payload;

    next();
}