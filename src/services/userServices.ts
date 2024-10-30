import db from "../libs/db";
import { User } from "@prisma/client";

export const getAllUsers = async () => {
  try {
    return await db.user.findMany({
      include: {
        post: true,
      },
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};

export const getSearchUsers = async (username: string) => {
  try {
    return await db.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    console.error("Error in getSearchUsers:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    return await db.user.findFirst({
      where: { id },
      include: {
        following: {
          where: {
            followingId: id,
          },
          include: {
            following: true,
          },
        },
        followers: {
          where: {
            followerId: id,
          },
          include: {
            followers: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    throw error;
  }
};

export const updateUser = async (id: number, data: User) => {
  try {
    const updatedUser = await db.user.update({
      data: data,
      where: { id },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};
