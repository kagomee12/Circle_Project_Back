import { Likes } from "@prisma/client";
import db from "../libs/db";

export const findFirst = async (post_id: number, user_id: number) => {
  try {
    return await db.likes.findFirst({
      where: {
        post_id,
        user_id,
      },
    });
  } catch (error) {
    console.error("Error in findFirst:", error);
    throw error;
  }
};

export const like = async (like: Likes) => {
  try {
    return await db.likes.create({
      data: {
        user_id: like.user_id,
        post_id: like.post_id,
      },
      include: {
        like_post: true,
        like_user: true,
      },
    });
  } catch (error) {
    console.error("Error in like:", error);
    throw error;
  }
};

export const unlike = async (post_id: number, user_id: number) => {
  try {
    const deletedLike = await db.likes.findFirst({
      where: {
        post_id,
        user_id,
      },
    });

    if (!deletedLike) {
      throw new Error("Like not found for the specified post and user.");
    }

    return await db.likes.delete({
      where: {
        id: deletedLike.id,
      },
    });
  } catch (error) {
    console.error("Error in unlike:", error);
    throw error;
  }
};

export const findLike = async (post_id: number) => {
  try {
    return await db.likes.findMany({
      where: {
        post_id: post_id,
      },
    });
  } catch (error) {
    console.error("Error in findLike:", error);
    throw error;
  }
};
