import axios from "axios";
import { Dispatch, MiddlewareAPI } from "redux";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { apiCall, formError, toastError } from "../reducers/shared/actions";
import {
  ApiAction,
  ErrorResponse,
  FormErrorsStatus,
  UnauthErrorsStatus,
} from "../reducers/shared/types";
import { userAuthFailed } from "../reducers/user/actions";

const api =
  ({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  async (action: ApiAction) => {
    if (action.type !== apiCall.type) return next(action);

    const { router, endPoint, url, method, onSuccessAction, data } =
      action.payload;
    next(action);

    try {
      const { data: responseData } = await axios.request({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { authorization: useLocalStorage({ name: "token" }) },
        method,
        url: `${router}/${url}`,
        data,
      });
      return dispatch({
        type: onSuccessAction,
        payload: { data: responseData.data, router, endPoint },
      });
    } catch (error) {
      const { response } = error as { response?: ErrorResponse };
      if (response) {
        const { data, status } = response;
        if (`code${status}` in FormErrorsStatus)
          return dispatch(formError({ errors: data.errors, router, endPoint }));

        if (`code${status}` in UnauthErrorsStatus)
          return dispatch(userAuthFailed());

        dispatch(toastError({ errors: data.errors, router, endPoint }));
      }
    }
    return;
  };
export default api;
