import db from "../libs/db";

export const findFirst = async (followerId: number, followingId: number) => {
  try {
    return await db.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });
  } catch (error) {
    console.error("Error in findFirst:", error);
    throw error;
  }
};

export const getallFollow = async () => {
  try {
    return await db.follow.findMany({
      include: {
        following: {
          select: {
            id: true,
            username: true,
          },
        },
        followers: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in getallFollow:", error);
    throw error;
  }
};

export const follow = async (followerId: number, followingId: number) => {
  try {
    return await db.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  } catch (error) {
    console.error("Error in follow:", error);
    throw error;
  }
};

export const unfollow = async (followerId: number, followingId: number) => {
  try {
    const getinfo = await db.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });
    return await db.follow.delete({
      where: {
        id: getinfo?.id,
      },
    });
  } catch (error) {
    console.error("Error in unfollow:", error);
    throw error;
  }
};

export const getFollowing = async (followerId: number, followingId: number) => {
  try {
    return await db.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
      include: {
        followers: {
          select: {
            fullName: true,
            username: true,
            bio: true,
            profil_pic: true,
            banner_pic: true,
          },
        },
        following: {
          select: {
            fullName: true,
            username: true,
            bio: true,
            profil_pic: true,
            banner_pic: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in getFollowing:", error);
    throw error;
  }
};

export const countFollowing = async (followerId: number) => {
  try {
    return await db.follow.findMany({
      where: {
        followerId,
      },
      include: {
        following: {
          select: {
            fullName: true,
            username: true,
            bio: true,
            profil_pic: true,
            banner_pic: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in countFollowing:", error);
    throw error;
  }
};

export const countFollower = async (followingId: number) => {
  try {
    return await db.follow.findMany({
      where: {
        followingId,
      },
      include: {
        followers: {
          select: {
            fullName: true,
            username: true,
            bio: true,
            profil_pic: true,
            banner_pic: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in countFollower:", error);
    throw error;
  }
};
