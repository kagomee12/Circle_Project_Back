import { Likes, Posts } from "@prisma/client";
import db from "../libs/db";


export const findFirst = async (post_id: number, user_id: number) => {
   return await db.likes.findFirst({
      where: {
         post_id,
         user_id
      }
   })
} 

export const like = async (like: Likes) => {
    return await db.likes.create(
       {
        data:{
         user_id: like.user_id,
         post_id: like.post_id
        },
        include: {
           like_post: true,
           like_user: true,
         
        }
       }
       
    );
 };

 export const unlike = async (post_id: number, user_id: number) => {
    const deletedLike = await db.likes.findFirst({
       where: {
         post_id,
         user_id,
       },
      
    })



    return await db.likes.delete({
       where: {
          id: deletedLike?.id
       }
      }
    )
 }

 export const findLike = async (post_id: number) => {
    return await db.likes.findMany({
       where: {
          post_id: post_id
       }
    })
 }