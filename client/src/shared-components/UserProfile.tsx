import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApiGetProfile } from "../store/reducers/user/actions";
import { State } from "../store/store";
import EditBio from "./EditBio";
import EditImg from "./EditImg";
import ImageProfile from "./ImageProfile";
import PageLoading from "./PageLoading";
interface UserProfileProps {
  userId: string;
}
const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  useEffect(() => {
    dispatch(userApiGetProfile(userId));
  }, []);
  return (
    <div className="flex justify-center items-center flex-col ">
      {user.loading.gettingProfile ? (
        <PageLoading />
      ) : (
        user.profile && (
          <>
            <div className="h-32 w-32 mb-2 rounded-full border-4 dark:border-slate-700 border-slate-300">
              <ImageProfile
                url={user.profile.imageURL}
                firstName={user.profile.firstName}
              />
            </div>
            {user.profile.id === user.me?.id && <EditImg />}
            <h2 className="font-medium mb-4">
              {user.profile.firstName} {user.profile.lastName}
            </h2>
            <p className="mb-2">{user.profile.bio}</p>
            {user.profile.id === user.me?.id && <EditBio />}
          </>
        )
      )}
    </div>
  );
};

export default UserProfile;
