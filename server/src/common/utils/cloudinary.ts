import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import DataURI from "datauri/parser";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../config/constants";

interface CloudinarySaveProps {
  file: Express.Multer.File;
  options?: UploadApiOptions;
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const dataURI = new DataURI();

export const cloudinaryDelete = async (publicID: string) => {
  try {
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.log(
      "Cloudinary error on delete",
      `publicId: ${publicID}`,
      error.message,
    );
  }
};

export const cloudinarySave = async (props: CloudinarySaveProps) => {
  try {
    const file = dataURI.format("webp", props.file.buffer).content!;
    const data = await cloudinary.uploader.upload(file, props.options);
    return data;
  } catch (error) {
    console.log("Cloudinary error on save", {
      message: error.message,
      file: props.file,
    });
    return;
  }
};
