import db from "../libs/db";

export const findFirst = async (followerId: number, followingId: number) => {
    return await db.follow.findFirst({
        where: {
            followerId,
            followingId
        }
    })
}

export const getallFollow = async () => {
    return await db.follow.findMany(
        {
            include: {
                following: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                followers: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        }
    )
}

export const follow = async (followerId: number, followingId: number) => {
    return await db.follow.create({
        data: {
            followerId,
            followingId
        }
    })
}

export const unfollow = async (followerId: number, followingId: number) => {
    const getinfo = await db.follow.findFirst({
        where: {
            followerId,
            followingId
        }
    })
    return await db.follow.delete({
        where: {
            id: getinfo?.id
        }
    })
}

export const getFollowing = async (followerId: number, followingId: number) => {
    return await db.follow.findFirst({
        where: {
            followerId: followerId,
            followingId: followingId
            
        },include: {
            followers:{
                select:{
                    fullName: true,
                    username: true,
                    bio: true,
                    profil_pic: true,
                    banner_pic: true,
                }
            },following:{
                select:{
                    fullName: true,
                    username: true,
                    bio: true,
                    profil_pic: true,
                    banner_pic: true,
                }
            }
        }
    })
}


export const countFollowing = async (followerId: number) => {
    return await db.follow.findMany({
        where: {
            followerId: followerId
        },include:{
            following:{
                select:{
                    fullName: true,
                    username: true,
                    bio: true,
                    profil_pic: true,
                    banner_pic: true,
                }
            }
        }
    })
}

export const countFollower = async (followingId: number) => {
    return await db.follow.findMany({
        where: {
            followingId: followingId
        },
            include:{
                followers:{
                    select:{
                        fullName: true,
                        username: true,
                        bio: true,
                        profil_pic: true,
                        banner_pic: true,
                    }
                }
            
        }
    })
}