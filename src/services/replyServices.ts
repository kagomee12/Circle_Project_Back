import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";

export const findAll = async (id: number) => {
  try {
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
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

export const findById = async (id: number) => {
  try {
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
  } catch (error) {
    console.error("Error in findById:", error);
    throw error;
  }
};

export const create = async (post: IPosts) => {
  try {
    const newPost = await db.posts.create({
      data: {
        ...post,
        images: {
          create: post.images && post.images.map((image) => ({ image: image })),
        },
      },
    });

    return newPost;
  } catch (error) {
    console.error("Error in create:", error);
    throw error;
  }
};

export const update = async (id: number, post: PostModels) => {
  try {
    const updatedPost = await db.posts.update({
      data: post,
      where: { id },
    });

    return updatedPost;
  } catch (error) {
    console.error("Error in update:", error);
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    await db.posts.delete({ where: { id } });
    return "deleted";
  } catch (error) {
    console.error("Error in remove:", error);
    throw error;
  }
};
