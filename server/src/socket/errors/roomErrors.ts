import { ErrorField } from "../../common/types";

interface SocketErrorProps {
  errors: ErrorField[];
}

const socketError = ({ errors }: SocketErrorProps) => ({ errors });

export const roomEndedError = () =>
  socketError({
    errors: [{ field: "room", message: { isEnded: "Room is ended" } }],
  });

export const userInRoomError = () =>
  socketError({
    errors: [{ field: "room", message: { inRoom: "You already in a room" } }],
  });

export const unauthError = () => new Error("You have to login");
