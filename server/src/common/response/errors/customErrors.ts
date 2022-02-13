import { Response } from "express";
import {
  handleBadGatewayError,
  handleBadRequestError,
  handleConflictError,
  handleInternalError,
  handleNotFoundError,
  handlePayloadLargeError,
  handleUnauthorizedError,
  handleUnsupportedMediaError,
} from "./mainErrors";

export const handleLoginError = (res: Response) =>
  handleBadRequestError({
    errors: [
      {
        field: "password",
        message: { isFalse: "email or password isn't correct" },
      },
    ],
    res,
  });

export const handleEmailConflictError = (res: Response) =>
  handleConflictError({
    errors: [{ field: "email", message: { isExist: "email already exist" } }],
    res,
  });

export const handleImageMissingError = (res: Response) =>
  handleBadRequestError({
    errors: [{ field: "image", message: { isRequired: "image is required" } }],
    res,
  });

export const handleImageSizeError = (size: number, res: Response) =>
  handlePayloadLargeError({
    errors: [
      {
        field: "image",
        message: { isLarge: `image should be less than ${size} MB` },
      },
    ],
    res,
  });

export const handleImageNotSupported = (res: Response) =>
  handleUnsupportedMediaError({
    errors: [
      {
        field: "image",
        message: { isLarge: `image type isn't supported` },
      },
    ],
    res,
  });

export const handleUnauthUserError = (res: Response) =>
  handleUnauthorizedError({
    errors: [{ field: "general", message: { isUnauth: "you need to login" } }],
    res,
  });

export const handleServerError = (res: Response) =>
  handleInternalError({
    errors: [{ field: "server", message: { isDown: "internal server error" } }],
    res,
  });

export const handleGatewayError = (res: Response) =>
  handleBadGatewayError({
    errors: [{ field: "gateway", message: { isDown: "gateway error" } }],
    res,
  });

export const handlePageNotFound = (res: Response) =>
  handleNotFoundError({
    res,
    errors: [{ field: "general", message: { notFound: "page not found" } }],
  });
