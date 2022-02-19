import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { State } from "../store/store";

export const toastErrors = () => {
  const toastErrors = useSelector((state: State) => state.shared.toastErrors);
  useEffect(() => {
    toastErrors.map((t) => {
      const keys = Object.keys(t.message);
      keys.map((k) => toast(t.message[k]));
    });
  }, [toastErrors]);
};
