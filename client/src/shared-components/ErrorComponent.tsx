import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface ErrorComponentProps {
  message: string;
  htmlFor: string;
}
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  htmlFor,
}) => {
  return (
    <label
      className="relative block mt-1 text-red-500 text-sm font-medium"
      htmlFor={htmlFor}
    >
      <ExclamationCircleIcon className="h-5 w-5 mr-1 inline-block" />

      {message}
    </label>
  );
};

export default ErrorComponent;
