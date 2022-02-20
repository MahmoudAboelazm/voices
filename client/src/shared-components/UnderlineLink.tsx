import React from "react";
interface Props {
  children: any;
}
const UnderlineLink: React.FC<Props> = ({ children }) => {
  return (
    <span className="font-medium underline decoration-indigo-600 hover:text-indigo-500">
      {children}
    </span>
  );
};

export default UnderlineLink;
