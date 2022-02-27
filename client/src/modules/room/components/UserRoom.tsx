import React, { memo } from "react";
import ImageProfile from "../../../shared-components/ImageProfile";
import { UserRoomType } from "../../../store/reducers/room/socketReducer/types";
import AudioRender from "./AudioRender";
import MeSpeaker from "./MeSpeaker";

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
          {user.isAdmin && (
            <span className="bg-green-500 rounded-full block absolute px-4 text-sm w-full text-center">
              Admin
            </span>
          )}
          {user.muted && <div>muted</div>}
          <div
            className={`cursor-pointer border-2 w-20 h-20 p-1 rounded-full  ${
              user.isSpeaking ? "border-indigo-500" : "border-transparent"
            } `}
            onClick={() => showProfile()}
          >
            <ImageProfile url={user.imageURL} firstName={user.firstName} />
          </div>

          <div className="text-center" aria-label={user.firstName}>
            {user.firstName.length > 10
              ? user.firstName.slice(0, 10) + "..."
              : user.firstName}
          </div>
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
