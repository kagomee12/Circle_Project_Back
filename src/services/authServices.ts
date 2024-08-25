import { User } from "@prisma/client"
import db from "../libs/db"
import { IUser } from "../types/auth"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const login = async (email: string, password: string) => {
    try {
        const existedUser = await db.user.findFirst({
            where: {
                OR : [
                    {
                        email: email
                    },
                    {
                        username: email
                    }
                ]
            }
            
        })
        if (!existedUser) {
            return null
            
        }
        
        const isMatch = await bcrypt.compare(password, existedUser.password)
        if (!isMatch) {
            return null
        }

        const token = jwt.sign(existedUser, process.env.SECRETKEY || "merdekaataumati", {
            expiresIn: '1d'
        }) 

        return token
    } catch (error) {
        throw error
    }
}


export const register = async (user: IUser): Promise<User | null> => {
    try {
        const existedUser = await db.user.findFirst({
            where: {
                username: user.username
            }

        })
        

        if (existedUser) {
            throw new Error("User already exists")
        }

        const hashingpassword =await bcrypt.hash(user.password, 10);
        user.password = hashingpassword;

        const newUser = await db.user.create({
            data: user
        })

        return newUser
    } catch (error) {
        throw error
    }
}