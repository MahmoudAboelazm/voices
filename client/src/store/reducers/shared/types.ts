import { AxiosRequestHeaders, Method } from "axios";

// api code status used in api middleware for handling any type of error
export enum FormErrorsStatus {
  "code400",
  "code409",
  "code413",
  "code415",
}
export enum UnauthErrorsStatus {
  "code401",
}

/////////////////////////////////////// Api Errors /////////////////////////////////////////

export interface ErrorMessage {
  [key: string]: string;
}

export interface ErrorField {
  field: string;
  message: ErrorMessage;
}

export interface ErrorData {
  code: number;
  message: string;
  errors: ErrorField[];
}

export interface ErrorResponse {
  status: number;
  data: ErrorData;
}

export interface ErrorsPayload {
  errors: ErrorField[];
  router: string;
  endPoint: string;
}

/////////////////////////////////////// Shared State ////////////////////////////////////////////////////

export interface ISharedState {
  formErrors: ErrorField[];
  toastErrors: ErrorField[];
}

//////////////////////////////////////////////// Api ///////////////////////////////////////////////////

export interface ApiCallPayload {
  router: string;
  url: string;
  method: Method;
  headers?: AxiosRequestHeaders;
  data?: any;
  onSuccessAction: string;
  endPoint: string;
}

export interface RouterApiCallProps {
  url: string;
  method: Method;
  data?: any;
  onSuccessAction: string;
}

export interface ApiAction {
  type: string;
  payload: ApiCallPayload;
}
