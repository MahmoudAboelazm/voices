import { Response } from "express";

export interface SuccessResponseProps {
  code: number;
  message: string;
  data: any;
  res: Response;
}

export interface SuccessStatusProps {
  data: any;
  res: Response;
}
const handleSuccess = ({ res, code, message, data }: SuccessResponseProps) =>
  res.status(code).send({ code, message, data });

export const handleOkSuccess = ({ data, res }: SuccessStatusProps) =>
  handleSuccess({ code: 200, message: "OK", data, res });

export const handleCreatedSuccess = ({ res, data }: SuccessStatusProps) =>
  handleSuccess({ code: 201, message: "Created", data, res });

export const handleAcceptedSuccess = ({ res, data }: SuccessStatusProps) =>
  handleSuccess({ code: 202, message: "Accepted", data, res });

export const handleNoContentSuccess = ({ res, data }: SuccessStatusProps) =>
  handleSuccess({ code: 204, message: " No-Content", data, res });

export const handleResetContentSuccess = ({ res, data }: SuccessStatusProps) =>
  handleSuccess({ code: 205, message: "Reset-Content", data, res });

export const handlePartialContentSuccess = ({
  res,
  data,
}: SuccessStatusProps) =>
  handleSuccess({ code: 206, message: "Partial-Content", data, res });
