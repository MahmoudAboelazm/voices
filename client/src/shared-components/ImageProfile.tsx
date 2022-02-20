import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
interface ImageProfileProps {
  url: string;
  firstName: string;
}
const ImageProfile: React.FC<ImageProfileProps> = ({ url, firstName }) => {
  return (
    <>
      {url ? (
        <img src={url} alt={firstName} className="w-full	h-full rounded-full" />
      ) : (
        <UserCircleIcon className="w-full	h-full" />
      )}
    </>
  );
};

export default ImageProfile;
