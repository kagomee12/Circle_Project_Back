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

export const create = async (post: IPosts) => {
   const newPost = await db.posts.create({
      data: {
         ...post,
         
         images: {
            create: post.images?.map((image) => ({ image: image.filename })),
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

export const remove = async (id: number) => {
   const deletedPost = await db.posts.findFirst({
      where: { id },

   })

   await db.postImage.deleteMany({ where: { id : id } });
   await db.posts.deleteMany({ where: { id : id } });

   
   // await db.posts.deleteMany({ where: { id: id },
   // });

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