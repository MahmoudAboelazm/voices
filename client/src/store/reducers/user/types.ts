import { RouterApiCallProps } from "../shared/types";

// UserEndPoints to show loading while fetching
export type UserEndPoints =
  | "updatingImg"
  | "signing"
  | "gettingProfile"
  | "updatingBio"
  | "gettingMe";

export type UserApiCallProps = RouterApiCallProps & { endPoint: UserEndPoints };

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  imageURL: string;
  id: string;
}

export interface User {
  loading: {
    [K in UserEndPoints]: boolean;
  };
  profile?: UserProfile;
  me?: { id: string; imageURL: string };
}

export interface SingInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ApiBioProps {
  bio: string;
}
