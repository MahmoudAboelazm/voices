import hark from "hark";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  isNotSpeaking,
  isSpeaking,
} from "../../../store/reducers/room/socketReducer/actions";

interface MeAudioProps {
  myStream?: MediaStream;
  userId: string;
}
const MeSpeaker: React.FC<MeAudioProps> = ({ myStream, userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (myStream) {
      const speechEvents = hark(myStream);
      speechEvents.on("speaking", () => {
        dispatch(isSpeaking(userId));
      });
      speechEvents.on("stopped_speaking", () => {
        dispatch(isNotSpeaking(userId));
      });
    }
  }, []);
  return <></>;
};

export default MeSpeaker;
