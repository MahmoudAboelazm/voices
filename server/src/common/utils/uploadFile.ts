import { Request, Response } from "express";
import multer, { FileFilterCallback, Options } from "multer";

interface UploadFileProps {
  name: string;
  fileTypes: { [key: string]: any };
  options: Options;
  error: { code: string };
}

/////// Main function to upload any file type
const uploadFile =
  (props: UploadFileProps) => (req: Request, res: Response, next: any) => {
    const { fileTypes, options, name, error } = props;

    options.fileFilter = (
      _: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      if (!(file.mimetype in fileTypes)) {
        return cb(error as any, false);
      }
      return cb(null, true);
    };

    multer(options).single(name)(req, res, (error) => {
      req.fileError = error;
      next();
    });
  };

///////////////// Custome functions to upload custome file type ////////////////////////////////

///////// Upload image ///////////////
export interface UploadImageProps {
  name: string;
  size: number;
}

enum ImageTypes {
  "image/jpeg",
  "image/JPEG",
  "image/png",
  "image/PNG",
  "image/JPG",
  "image/jpg",
  "image/WEBP",
  "image/webp",
}

export const uploadImage = (props: UploadImageProps) => {
  return uploadFile({
    name: props.name,
    options: { limits: { fileSize: props.size } },
    fileTypes: ImageTypes,
    error: { code: "NOT_IMAGE" },
  });
};
