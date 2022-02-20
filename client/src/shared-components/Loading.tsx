import React from "react";
interface Props {
  width: number;
}
const Loading: React.FC<Props> = ({ width }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`w-${width} h-${width} border-2 border-white border-t-indigo-400 dark:border-t-indigo-400 dark:border-gray-700 border-solid rounded-full  animate-spin `}
      ></div>
    </div>
  );
};

export default Loading;
