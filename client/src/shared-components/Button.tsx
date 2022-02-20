import React, { ButtonHTMLAttributes } from "react";
import Loading from "./Loading";

type Props = ButtonHTMLAttributes<HTMLElement> & {
  loading: boolean;
  children: any;
  fullWidth: boolean;
};
const Button: React.FC<Props> = ({
  loading,
  children,
  fullWidth,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`${
        fullWidth && "w-full"
      } relative min-w-[10rem] shadow-md py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-indigo-500`}
    >
      {loading ? <Loading width={5} /> : children}
    </button>
  );
};

export default Button;
