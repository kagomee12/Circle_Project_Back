import db from "../libs/db";
import { User } from "@prisma/client";

export const getAllUsers = async () => {
    return await db.user.findMany({
        include: {
            post: true
            }
    });
}
export const getSearchUsers = async (username: string) => {
    return await db.user.findMany({
        where: {
            username: {
                contains: username,
                mode: "insensitive"
            }
        }
    });
}

export const getUserById = async (id: number) => {
    return await db.user.findFirst({ where: { id }, 
        include: { 
            following: {
                where: { 
                    followingId: id
                },include: {
                    following: true
                }}, 
                followers: {
                    where: {
                        followerId: id
                    },include: {
                        followers: true
                    }
                } 
            } 
        });
}

export const getUserByusername = async (username: string) => {
    return await db.user.findUnique(
        {
            where:{
                username: username
            }
        }
    )
}

export const updateUser = async (id: number, data: User) => {
    
    const updateduser = await db.user.update({data: data ,where: { id } });
    return updateduser
}

