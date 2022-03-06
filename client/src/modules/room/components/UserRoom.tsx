import React, { memo } from "react";
import ImageProfile from "../../../shared-components/ImageProfile";
import { UserRoomType } from "../../../store/reducers/room/socketReducer/types";
import AudioRender from "./AudioRender";
import MeSpeaker from "./MeSpeaker";
import { MicrophoneIcon } from "@heroicons/react/outline";
interface UserRoomProps {
  user: UserRoomType;
  myStream?: MediaStream;
  showProfile: Function;
  forcePlayAudioFn?: Function;
  children?: any;
}

const UserRoom: React.FC<UserRoomProps> = memo(
  ({ user, myStream, showProfile, children, forcePlayAudioFn }) => {
    return (
      <li className="w-24  mt-12">
        <div className="w-20 h-20 m-auto relative ">
          <div
            className={`cursor-pointer border-2 w-20 h-20  rounded-full  ${
              user.isSpeaking ? "border-indigo-500" : "border-transparent"
            } `}
            onClick={() => showProfile()}
          >
            <ImageProfile url={user.imageURL} firstName={user.firstName} />
          </div>

          <h4 className="text-center" aria-label={user.firstName}>
            {user.firstName.length > 10
              ? user.firstName.slice(0, 10) + "..."
              : user.firstName}
          </h4>
          {user.isSpeaker && (
            <span className="text-sm  text-gray-500 block font-bold flex justify-center items-center">
              {user.isAdmin ? "Admin" : "Speaker"}
              <span className="block relative ">
                {user.muted && (
                  <span className="h-4 w-1 bg-red-700 rounded  border dark:border-black  rotate-45 block absolute left-1/2"></span>
                )}
                <MicrophoneIcon
                  className={` w-4 h-4  ml-1 ${user.muted && "text-red-700"}`}
                />
              </span>
            </span>
          )}

          {user.peer && (
            <AudioRender
              peer={user.peer}
              userId={user.id}
              forcePopUpFn={forcePlayAudioFn!}
            />
          )}
          {user.me && <MeSpeaker myStream={myStream} userId={user.id} />}
          {children}
        </div>
      </li>
    );
  },
);

export default UserRoom;
