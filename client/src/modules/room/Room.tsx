import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { roomStreamInit } from "../../lib/socket/socket";
import Button from "../../shared-components/Button";
import Nav from "../../shared-components/Nav";
import { PageHead } from "../../shared-components/PageHead";
import PageLoading from "../../shared-components/PageLoading";
import PopUp from "../../shared-components/PopUp";
import SecondaryButton from "../../shared-components/SecondaryButton";
import UserProfile from "../../shared-components/UserProfile";
import {
  approvedSpeak,
  forcePlayAudio,
  pauseResumeStream,
  requestSpeak,
} from "../../store/reducers/room/socketReducer/actions";
import { State } from "../../store/store";
import { useLocalStorage } from "../../utils/useLocalStorage";
import UserRoom from "./components/UserRoom";
import UsersWrapper from "./components/UsersWrapper";

type RoomProps = NextPageContext & State & { id: string };

const Room: NextPage<RoomProps> = ({ id, roomSocket }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showForceAudioPopUp, setShowForceAudioPopUp] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const showProfile = (userId: string) => {
    setUserId(userId);
    setShowUserProfile(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      roomStreamInit(dispatch, id, useLocalStorage({ name: "token" }));
    } catch (error: any) {
      console.log("Room component error: ", error.message);
    }
  }, []);

  return (
    <>
      <PageHead title={roomSocket.roomName} />
      <Nav />
      <main className="pt-16">
        {roomSocket.loading ? (
          <PageLoading />
        ) : (
          <>
            {roomSocket.meSpeaker && (
              <div className="text-center mt-8">
                <Button
                  fullWidth={false}
                  loading={false}
                  onClick={() => dispatch(pauseResumeStream())}
                >
                  {roomSocket.muted ? "Unmute" : "Mute"}
                </Button>
              </div>
            )}
            <UsersWrapper title="Speakers">
              {roomSocket.speakers.map((speaker) => (
                <UserRoom
                  key={speaker.id}
                  user={speaker}
                  myStream={roomSocket.stream}
                  showProfile={() => showProfile(speaker.id)}
                  forcePlayAudioFn={() => setShowForceAudioPopUp(true)}
                />
              ))}
            </UsersWrapper>

            {roomSocket.meAdmin && (
              <UsersWrapper title="Requesters">
                {roomSocket.requesters.map((requester) => (
                  <UserRoom
                    key={requester.id}
                    user={requester}
                    showProfile={() => showProfile(requester.id)}
                  >
                    <SecondaryButton
                      loading={false}
                      fullWidth={true}
                      onClick={() =>
                        dispatch(
                          approvedSpeak({
                            requesterUserId: requester.id,
                            requesterSocketId: requester.socketId,
                          }),
                        )
                      }
                    >
                      Approve
                    </SecondaryButton>
                  </UserRoom>
                ))}
              </UsersWrapper>
            )}
            <UsersWrapper title="Listeners">
              {roomSocket.listeners.map((listener) => (
                <UserRoom
                  key={listener.id}
                  user={listener}
                  showProfile={() => showProfile(listener.id)}
                />
              ))}
            </UsersWrapper>

            {roomSocket.showRequestSpeak && (
              <Button
                fullWidth={false}
                loading={false}
                onClick={() => dispatch(requestSpeak())}
              >
                Request Speak
              </Button>
            )}
            <PopUp
              show={showUserProfile}
              close={() => setShowUserProfile(false)}
            >
              <UserProfile userId={userId} />
            </PopUp>
            <PopUp show={roomSocket.micStreamError} close={() => {}}>
              <h3 className="text-center text-2xl mb-4">
                Allow microphone access
              </h3>
              <p className="text-center">
                The site require access to your microphone. Please allow
                microphone access from the browser permissions then reload the
                page.
              </p>
            </PopUp>
            <PopUp
              show={showForceAudioPopUp}
              close={() => setShowForceAudioPopUp(false)}
            >
              <div className="text-center">
                <p className="mb-8">
                  Browsers require user interaction before they will play audio.
                  Just click okay to continue.
                </p>
                <Button
                  fullWidth={false}
                  loading={false}
                  onClick={() => {
                    dispatch(forcePlayAudio());
                    setShowForceAudioPopUp(false);
                  }}
                >
                  Okay
                </Button>
              </div>
            </PopUp>
          </>
        )}
      </main>
    </>
  );
};

Room.getInitialProps = ({ query }) => {
  return { id: query.id } as RoomProps;
};
export default connect((state) => state)(Room);
