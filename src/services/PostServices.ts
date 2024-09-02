import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";
import { IPosts } from "../types/post";


export const findAll = async () => {
   return await db.posts.findMany({
      // join table
      include: {
         author: {
            select: {
               id: true,
               username: true,
               fullName: true,
               profil_pic: true,
            },
         },
         comments: true,
         images: true,
         likes: {
            select: {post_id: true, user_id: true,
               like_user: {
                  select: {
                     username: true,
                  },
               }
            }
            }
      },
   });
};

export const findById = async (id: number) => {
   return await db.posts.findFirst({
      where: { id },
      // join table
      include: {
         author: {
            select: {
               id: true,
               username: true,
               fullName: true,
               profil_pic: true,
               likes: true,
               
            },
         },
         comments: true,
         images: true,
      },
   });
};
export const findimagesById = async (user_id: number) => {
   return await db.posts.findMany({
      where: {
         user_id: user_id,
         images: {
           some: {}, 
         },
         parent_id: null
       },
      include: {
         author: {
            select: {
               id: true,
               username: true,
               fullName: true,
               profil_pic: true,
               likes: true,
               
            },
         },
         comments: true,
         images: true
         
      },
   });
};
export const create = async (post: IPosts) => {
   const newPost = await db.posts.create({
      data: {
         ...post,
         
         images: {
            create: post.images && post.images.map((image) => ({ image: image.filename })),
         },
         
      },
   });

   return newPost;
};

export const update = async (id: number, post: PostModels) => {
   
   const updatedPost = await db.posts.update({
      data: post,
      where: { id },
   });

   // console.log(updatedPost);
   

   return updatedPost;
};

export const remove = async (post_Id: number) => {
   const deletedPost = await db.posts.findFirst({
      where: {id: post_Id },

   })

   await db.likes.deleteMany({ where: { post_id: post_Id } });

   await db.postImage.deleteMany({ where: { post_id: post_Id } });

   await db.posts.deleteMany({ where: { parent_id: post_Id } });
 
   await db.posts.deleteMany({ where: { id: post_Id } });


   return "deleted";
};

export const findByIdUser = async (user_id: number) => {
   return await db.posts.findMany({
      where: { user_id },
      include: {
         author: {
            select: {
               id: true,
               username: true,
               fullName: true,
               profil_pic: true,
               likes: true,
               
            },
         },
         comments: true,
         images: true,
      },
   });
};