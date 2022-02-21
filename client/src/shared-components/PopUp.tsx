import { XIcon } from "@heroicons/react/solid";
import React from "react";

interface PopUpProps {
  show: boolean;
  close: Function;
  children: any;
}
const PopUp: React.FC<PopUpProps> = ({ show, close, children }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0  ${
          show ? "scale-100 w-full h-full z-50" : "scale-75"
        }  duration-300`}
      >
        {show && (
          <>
            <div className="relative py-2 w-full h-full max-w-screen-xl min-h-screen px-4 mx-auto sm:px-16">
              <span
                className="block fixed left-0 top-0 w-screen h-screen bg-black opacity-40"
                onClick={() => close()}
              ></span>
              <div className="h-full flex flex-col justify-center">
                <div className="relative bg-slate-200 dark:bg-gray-800 rounded z-40 dark:border dark:border-slate-700 shadow-gray-700	dark:shadow-gray-800 shadow overflow-auto	flex flex-col justify-center">
                  <span
                    className="absolute right-0 top-0 block  bg-slate-300 hover:bg-slate-400 dark:hover:bg-gray-700 dark:bg-black flex justify-center px-4 py-2 z-40 cursor-pointer"
                    onClick={() => close()}
                  >
                    <button aria-label="close-popup" className="w-5 h-5">
                      <XIcon />
                    </button>
                  </span>

                  <div className="py-16  px-5 relative overflow-auto">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PopUp;
