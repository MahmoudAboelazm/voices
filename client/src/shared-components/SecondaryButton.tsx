import React, { ButtonHTMLAttributes } from "react";
import Loading from "./Loading";

type Props = ButtonHTMLAttributes<HTMLElement> & {
  loading: boolean;
  children: any;
  fullWidth: boolean;
};
const SecondaryButton: React.FC<Props> = ({
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
      } relative text-left px-4 py-2 rounded-md hover:bg-gray-200 bg-gray-100 dark:bg-black dark:hover:bg-gray-700 shadow-md cursor-pointer text-sm font-medium 
      `}
    >
      {loading ? <Loading width={5} /> : children}
    </button>
  );
};

export default SecondaryButton;
