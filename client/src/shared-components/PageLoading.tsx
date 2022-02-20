import React from "react";
import Loading from "./Loading";

const PageLoading = () => {
  return (
    <div className="absolute h-full w-full left-0 top-0 flex justify-center items-center flex-col">
      <Loading width={20} />
    </div>
  );
};

export default PageLoading;
