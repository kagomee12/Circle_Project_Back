import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import { NextFunction, Request, Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

export const uploadCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log("loading");
  

  const file: CloudinaryFile = req.file as CloudinaryFile;
  const files: CloudinaryFile[] = req.files as CloudinaryFile[];
  // const profil_pic: CloudinaryFile = req.file as CloudinaryFile;
  // const banner_pic: CloudinaryFile = req.file as CloudinaryFile;
  if (!file && files?.length < 1  ) {
   
    return next();
  }
 console.log("loaded");
 
  if (file) {
    return uploadSingle(file, res, next) ;
  } else if(files) {
    return uploadMultiple(files, res, next);
  }

  console.log("hu tao");
  
  return next();
};

const uploadMultiple = async (
  files: CloudinaryFile[],
  res: Response,
  next: NextFunction
) => {
  try {
    const cloudinaryUrls: string[] = [];
    for (const file of files) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "your-cloudinary-folder-name",
        } as any,
        (
          err: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return next(err);
          }
          if (!result) {
            console.error("Cloudinary upload error: Result is undefined");
            return next(new Error("Cloudinary upload result is undefined"));
          }
          cloudinaryUrls.push(result.secure_url);

          if (cloudinaryUrls.length === files.length) {
            res.locals.images = cloudinaryUrls;
            next();
          }
        }
      );
      uploadStream.end(file.buffer);
    }
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};

const uploadSingle = async (
  file: CloudinaryFile,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "circle",
      } as any,
      (
        err: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return res.send("Error uploading image");
        }
        if (!result) {
          console.error("Cloudinary upload error: Result is undefined");
          return res.send("Error uploading image");
        }
        res.locals.image = result.secure_url;
        next();
      }
    );
    uploadStream.end(file.buffer);
  } catch (error) {
    console.log("Error in uploadToCloudinary middleware:", error);
    res.send("Error uploading image");
  }
};
// const uploadProfil = async (
//   file: CloudinaryFile,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto",
//         folder: "circle",
//       } as any,
//       (
//         err: UploadApiErrorResponse | undefined,
//         result: UploadApiResponse | undefined
//       ) => {
//         if (err) {
//           console.error("Cloudinary upload error:", err);
//           return res.send("Error uploading image");
//         }
//         if (!result) {
//           console.error("Cloudinary upload error: Result is undefined");
//           return res.send("Error uploading image");
//         }
//         res.locals.profil_pic = result.secure_url;
//         next();
//       }
//     );
//     uploadStream.end(file.buffer);
//   } catch (error) {
//     console.log("Error in uploadToCloudinary middleware:", error);
//     res.send("Error uploading image");
//   }
// };
// const uploadbanner = async (
//   file: CloudinaryFile,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto",
//         folder: "circle",
//       } as any,
//       (
//         err: UploadApiErrorResponse | undefined,
//         result: UploadApiResponse | undefined
//       ) => {
//         if (err) {
//           console.error("Cloudinary upload error:", err);
//           return res.send("Error uploading image");
//         }
//         if (!result) {
//           console.error("Cloudinary upload error: Result is undefined");
//           return res.send("Error uploading image");
//         }
//         res.locals.banner_pic = result.secure_url;
//         next();
//       }
//     );
//     uploadStream.end(file.buffer);
//   } catch (error) {
//     console.log("Error in uploadToCloudinary middleware:", error);
//     res.send("Error uploading image");
//   }
// };
