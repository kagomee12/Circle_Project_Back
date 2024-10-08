import * as userService from "../services/userServices";
import errorHandler from "../utils/errorHandler";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await userService.getAllUsers();
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

export const findUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(201).json(user);
        
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

export const findUserbyusername = async (req: Request, res: Response) => {
    try {
        const {username} = req.params
        console.log(username);
        const userName = username
        const user = await userService.getUserByusername(userName);
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {

        
        if (res.locals.image) {
            req.body.profil_pic = res.locals.image;
        }
        
        const user = await userService.updateUser(parseInt(req.params.id), req.body);
         
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error as unknown as Error);;
    }
}
// export const updateUser = async (req: Request, res: Response) => {
//     try {
//         // if (res.locals.banner_pic || res.locals.profil_pic) {
//         //     if (res.locals.banner_pic && res.locals.profil_pic) {
//         //         req.body.banner_pic = (res.locals.banner_pic);
//         //         req.body.profil_pic = (res.locals.profil_pic);
//         //     }
//         //     if (res.locals.profil_pic) {
//         //         req.body.profil_pic = (res.locals.profil_pic);
//         //     }
//         //     if (res.locals.banner_pic) {
//         //         req.body.banner_pic = (res.locals.banner_pic);
//         //     }
//         // }
//         if (res.locals.banner_pic) {
//             req.body.banner_pic = res.locals.banner_pic;
//           }
      
//           if (res.locals.profil_pic) {
//             req.body.profil_pic = res.locals.profil_pic;
//           }

//         const user = await userService.updateUser(parseInt(req.params.id), req.body);
        
        
         
//         res.status(201).json(user);
//     } catch (error) {
//         errorHandler(res, error as unknown as Error);;
//     }
// }

export const searchUser = async (req: Request, res: Response) => {
    const get = await userService.getSearchUsers(req.params.username);

    res.status(201).json(get);

}

