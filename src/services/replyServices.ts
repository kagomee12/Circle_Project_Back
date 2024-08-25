import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";

const posts: PostModels[] = [];

export const findAll = async (id: number) => {
   return await db.posts.findMany({
      where: { parent_id: id },
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

export const findById = async (id: number) => {
   return await db.posts.findFirst({
      where: { id },
      include: {
         author: {
            select: {
               id: true,
               username: true,
               profil_pic: true,
            },
         },
      },
   });
};

export const create = async (post: Posts) => {
   const newPost = await db.posts.create({ data: post });

   return newPost;
};

export const update = async (id: number, post: PostModels) => {
   const updatedPost = await db.posts.update({
      data: post,
      where: { id },
   });

   return updatedPost;
};

export const remove = async (id: number) => {
   await db.posts.delete({ where: { id } });
   return "deleted";
};
