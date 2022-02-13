import { Response } from "express";

export interface ErrorMessage {
  [key: string]: string;
}

export interface ErrorField {
  field: string;
  message: ErrorMessage;
}
interface HandleErrorsProps {
  code: number;
  message: string;
  res: Response;
  errors: ErrorField[];
}

export interface ErrorsStatusProps {
  errors: ErrorField[];
  res: Response;
}

const handleErrors = ({ code, message, errors, res }: HandleErrorsProps) => {
  return res.status(code).send({ code, message, errors });
};

export const handleBadRequestError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 400, message: "Bad-Request", errors, res });
};

export const handleUnauthorizedError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 401, message: "Unauthorized", errors, res });
};

export const handleNotFoundError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 404, message: "Not-Found", errors, res });
};

export const handleConflictError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 409, message: "Conflict", errors, res });
};

export const handlePayloadLargeError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 413, message: "Payload-Too-Large", errors, res });
};

export const handleUnsupportedMediaError = ({
  errors,
  res,
}: ErrorsStatusProps) => {
  return handleErrors({
    code: 415,
    message: "Unsupported-Media-Type",
    errors,
    res,
  });
};

export const handleInternalError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 500, message: "Internal-Error", errors, res });
};

export const handleBadGatewayError = ({ errors, res }: ErrorsStatusProps) => {
  return handleErrors({ code: 502, message: "Bad-Gateway", errors, res });
};
