import "dotenv/config";

export const PORT = process.env.PORT || 4000;
export const CLIENT_URL = process.env.CLIENT_URL || "*";
export const MONGO_URL = process.env.MONGO_URL || "";
export const REDIS_URL = process.env.REDIS_URL || "127.0.0.1:6379";
export const JWT_SECRETE = process.env.JWT_SECRETE || "secrete";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
