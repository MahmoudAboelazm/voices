import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeProvider";
import { resetStore } from "../store/reducers/shared/actions";
import { trackingRouterChange } from "../utils/trackingRouterChange";
import { toastErrors } from "../utils/toastErrors";

type Theme = "dark" | "light";

const ToasterContainer = () => {
  toastErrors();

  const [theme, setTheme] = useState<Theme>("dark");
  const t = useTheme();
  const routerChange = trackingRouterChange();
  const dispatch = useDispatch();

  useEffect(() => {
    if (routerChange) dispatch(resetStore());
    setTheme(t.value as Theme);
  }, [t]);
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme as Theme}
    />
  );
};
export default ToasterContainer;
