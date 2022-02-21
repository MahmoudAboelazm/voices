import { PhotographIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../store/reducers/shared/actions";
import { userApiUpdateImg } from "../store/reducers/user/actions";
import { State } from "../store/store";
import Button from "./Button";
import InputField from "./InputField";
import PopUp from "./PopUp";
import SecondaryButton from "./SecondaryButton";
const EditImg = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  const submit = (e: any) => {
    e.preventDefault();
    const img = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", img);

    dispatch(userApiUpdateImg(formData));
  };
  return (
    <div>
      <SecondaryButton
        fullWidth={false}
        loading={false}
        onClick={() => setShow(true)}
      >
        <span className="h-5 block">
          <PhotographIcon className="mr-1 h-5 inline" />
          Edit image
        </span>
      </SecondaryButton>
      <PopUp show={show} close={() => setShow(false)}>
        <form onSubmit={submit}>
          <InputField
            type="file"
            accept="image/*"
            label="Profile Image"
            name="image"
            autoFocus
          />
          <Button
            fullWidth={false}
            loading={user.loading.updatingImg}
            type="submit"
          >
            Update
          </Button>
        </form>
      </PopUp>
    </div>
  );
};

export default EditImg;
