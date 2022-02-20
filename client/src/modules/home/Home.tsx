import type { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import NavBar from "../../shared-components/Nav";
import { PageHead } from "../../shared-components/PageHead";
import {
  roomApiGetRooms,
  roomApiFetchMore,
} from "../../store/reducers/room/apiReducer/actions";
import { State } from "../../store/store";
import CreateRoom from "./components/CreateRoom";
import FetchMore from "./components/FetchMore";
import Rooms from "./components/Rooms";

type HomeProps = NextPageContext & State;

const Home: NextPage<HomeProps> = ({ roomApi }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(roomApiGetRooms(page));
  }, []);

  return (
    <>
      <PageHead title="Dashboard" />
      <NavBar />
      <main className="pt-20">
        <CreateRoom />
        <Rooms />
        <FetchMore
          fetchFn={() => {
            dispatch(roomApiFetchMore(page + 1));
            setPage((page) => page + 1);
          }}
        />
      </main>
    </>
  );
};

export default connect((state) => state)(Home);
