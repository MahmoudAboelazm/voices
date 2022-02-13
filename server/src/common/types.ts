declare module "express-serve-static-core" {
  interface Request {
    userId: string;
    fileError?: { code: string };
  }
}

export interface ErrorMessage {
  [key: string]: string;
}

export interface ErrorField {
  field: string;
  message: ErrorMessage;
}
