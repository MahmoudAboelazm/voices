import React, { InputHTMLAttributes, memo } from "react";
import { useSelector } from "react-redux";
import { State } from "../store/store";
import ErrorComponent from "./ErrorComponent";

type InputFieldProps = InputHTMLAttributes<HTMLElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = memo(
  ({ name, label, ...props }) => {
    const error = useSelector(({ shared }: State) => {
      for (const err of shared.formErrors) {
        if (err.field === name) return err;
      }
      return null;
    });
    /**
     * the error may contains multiple messages
    @example
    error = {
      field: "name",
      message: {
        isEmail: "not email",
        isLetters: "not letters"
      }
    } 
   
   */
    let errorMessageKeys: string[] = [];

    if (error) errorMessageKeys = Object.keys(error.message);

    return (
      <div className="mb-4">
        <input
          className="dark:bg-gray-800 relative block w-full px-3 py-2 border dark:border-gray-800 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 "
          name={name}
          placeholder={label}
          aria-label={label}
          {...props}
        />

        {error &&
          errorMessageKeys.map((e, i) => (
            <ErrorComponent
              key={name + i}
              message={error.message[e]}
              htmlFor={name}
            />
          ))}
      </div>
    );
  },
);

export default InputField;
