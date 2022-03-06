import hark from "hark";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Peer } from "../../../lib/webrtc/peer";
import {
  isNotSpeaking,
  isSpeaking,
  micMuted,
  micUnmuted,
  playAudioForced,
} from "../../../store/reducers/room/socketReducer/actions";
import { State } from "../../../store/store";

interface AudioProps {
  peer: Peer;
  userId: string;
  forcePopUpFn: Function;
}
const AudioRender: React.FC<AudioProps> = ({ peer, userId, forcePopUpFn }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLVideoElement>(null);
  const [forced, setForced] = useState(false);
  const forcePlayState = useSelector(
    (state: State) => state.roomSocket.forcePlay,
  );
  const [audioStream, setAudioStream] = useState<MediaStream>();

  // Make the user force play audio if the browser doesn't allow auto play
  const forcePlay = async () => {
    if (!forced) {
      if (ref.current) {
        await ref.current
          .play()
          .catch((e) => console.log("force error", e.message));

        const speechEvents = hark(audioStream!);
        speechEvents.resume();

        speechEvents.on("speaking", () => {
          dispatch(isSpeaking(userId));
        });
        speechEvents.on("stopped_speaking", () => {
          dispatch(isNotSpeaking(userId));
        });
        dispatch(playAudioForced());
        setForced(true);
      }
    }
  };

  useEffect(() => {
    peer.onMessage((msg) => {
      if (msg === "mute") dispatch(micMuted(userId));
      if (msg === "unmute") dispatch(micUnmuted(userId));
    });

    if (!forced) {
      peer.onStream(async (stream) => {
        console.log("streaming", userId);
        ref.current!.srcObject = stream;

        await ref.current?.play().catch((e) => {
          if (forcePopUpFn) forcePopUpFn();
          console.warn(e.message);
        });

        setAudioStream(stream);

        const speechEvents = hark(stream);

        speechEvents.on("speaking", () => {
          dispatch(isSpeaking(userId));
        });
        speechEvents.on("stopped_speaking", () => {
          dispatch(isNotSpeaking(userId));
        });
      });
    }
    try {
      if (forcePlayState) forcePlay();
    } catch (error: any) {
      console.log("force auto play error:", error.message);
    }
  }, [forcePlayState]);
  return (
    <>
      <audio playsInline autoPlay={true} controls={false} ref={ref} />
    </>
  );
};

export default AudioRender;
