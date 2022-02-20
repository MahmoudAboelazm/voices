import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared-components/Button";
import InputField from "../../../shared-components/InputField";
import { roomApiCreate } from "../../../store/reducers/room/apiReducer/actions";
import { State } from "../../../store/store";

const CreateRoom = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: State) => state.roomApi.loading.creatingRoom,
  );
  const getRoomData = (e: any) => {
    e.preventDefault();
    dispatch(roomApiCreate({ name: e.target.name.value as string }));
  };
  return (
    <section>
      <form onSubmit={getRoomData}>
        <InputField name="name" label="Room name" type="text" />
        <Button loading={loading} type="submit" fullWidth={false}>
          Create Room
        </Button>
      </form>
    </section>
  );
};

export default CreateRoom;
