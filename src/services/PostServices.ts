import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";

export const findAll = async () => {
  try {
    return await db.posts.findMany({
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
          select: {
            post_id: true,
            user_id: true,
            like_user: {
              select: {
                username: true,
              },
            },
          },
        },
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
    console.error("Error in findById:", error);
    throw error;
  }
};

export const findimagesById = async (user_id: number) => {
  try {
    return await db.posts.findMany({
      where: {
        user_id: user_id,
        images: {
          some: {},
        },
        parent_id: null,
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
        images: true,
      },
    });
  } catch (error) {
    console.error("Error in findimagesById:", error);
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

export const remove = async (post_Id: number) => {
  try {
    const deletedPost = await db.posts.findFirst({
      where: { id: post_Id },
    });

    if (!deletedPost) {
      throw new Error("Post not found.");
    }

    await db.likes.deleteMany({ where: { post_id: post_Id } });
    await db.postImage.deleteMany({ where: { post_id: post_Id } });
    await db.posts.deleteMany({ where: { parent_id: post_Id } });
    await db.posts.deleteMany({ where: { id: post_Id } });

    return "deleted";
  } catch (error) {
    console.error("Error in remove:", error);
    throw error;
  }
};

export const findByIdUser = async (user_id: number) => {
  try {
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
  } catch (error) {
    console.error("Error in findByIdUser:", error);
    throw error;
  }
};
