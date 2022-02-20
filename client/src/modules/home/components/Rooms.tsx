import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../shared-components/Button";
import PageLoading from "../../../shared-components/PageLoading";
import { State } from "../../../store/store";

const Rooms = () => {
  const roomApi = useSelector((state: State) => state.roomApi);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-center text-slate-500  py-5 border-t border-slate-300 dark:border-gray-800">
        Rooms
      </h2>
      {roomApi.loading.gettingRooms ? (
        <PageLoading />
      ) : (
        <>
          {roomApi.rooms.map((room) => (
            <Link href={`/room/${room._id}`} key={room._id}>
              <div className=" rounded-lg shadow  p-6 bg-white dark:border dark:border-slate-700 dark:bg-gray-800 mb-6 cursor-pointer">
                <h3 className="text-2xl font-bold ">{room.name}</h3>
              </div>
            </Link>
          ))}
        </>
      )}
    </section>
  );
};

export default Rooms;
