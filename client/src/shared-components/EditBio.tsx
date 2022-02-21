import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../store/reducers/shared/actions";
import { changeBio, userApiUpdateBio } from "../store/reducers/user/actions";
import { State } from "../store/store";
import Button from "./Button";
import InputField from "./InputField";
import PopUp from "./PopUp";
import SecondaryButton from "./SecondaryButton";

const EditBio = () => {
  const [show, setShow] = useState(false);

  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const submit = (e: any) => {
    e.preventDefault();
    const data = { bio: user.profile?.bio as string };
    dispatch(userApiUpdateBio(data));
  };
  return (
    <div>
      <SecondaryButton
        fullWidth={false}
        loading={false}
        onClick={() => setShow(true)}
      >
        <span className="h-5 block">
          <PencilAltIcon className="mr-1 h-5 inline" />
          Edit bio
        </span>
      </SecondaryButton>

      <PopUp show={show} close={() => setShow(false)}>
        <form onSubmit={submit}>
          <InputField
            type="text"
            value={user.profile?.bio}
            label="Bio"
            name="bio"
            autoFocus={true}
            onChange={(e: any) => dispatch(changeBio(e.target.value))}
          />
          <Button
            fullWidth={false}
            loading={user.loading.updatingBio}
            type="submit"
          >
            Update
          </Button>
        </form>
      </PopUp>
    </div>
  );
};

export default EditBio;
