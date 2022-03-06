import { createReducer } from "@reduxjs/toolkit";
import { resetStore, toastError } from "../../shared/actions";
import {
  addUserToListeners,
  addUserToRequesters,
  addUserToSpeakers,
  approvedSpeak,
  forcePlayAudio,
  isNotSpeaking,
  isSpeaking,
  meAdmin,
  meSpeaker,
  micMuted,
  micUnmuted,
  pauseResumeStream,
  playAudioForced,
  removeUser,
  requestSpeak,
  roomIo,
  roomSocketCall,
  roomSocketSuccess,
  stopStream,
  streamError,
  streamSuccess,
  updateListenerPeer,
  updateListenerSignal,
  updateSpeakerPeer,
  updateSpeakerSignal,
} from "./actions";
import { ApprovedSpeak, Room } from "./types";

const roomState: Room = {
  roomName: "",
  listeners: [],
  speakers: [],
  requesters: [],
  meAdmin: false,
  meSpeaker: false,
  loading: false,
  showRequestSpeak: true,
  muted: false,
  forcePlay: false,
  micStreamError: false,
};

export const roomSocket = createReducer(roomState, {
  [roomIo.type]: (room, { payload }) => {
    room.io = payload;
  },
  [streamSuccess.type]: (room, _) => {
    room.micStreamError = false;
  },
  [streamError.type]: (room, _) => {
    room.micStreamError = true;
  },
  [meAdmin.type]: (room, _) => {
    room.meAdmin = true;
  },
  [meSpeaker.type]: (room, _) => {
    room.meSpeaker = true;
    room.showRequestSpeak = false;
  },
  [forcePlayAudio.type]: (room, _) => {
    if (!room.forcePlay) room.forcePlay = true;
  },
  [playAudioForced.type]: (room, _) => {
    if (room.forcePlay) room.forcePlay = false;
  },
  [isSpeaking.type]: (room, { payload }) => {
    for (let speaker of room.speakers) {
      if (speaker.id === payload) {
        speaker.isSpeaking = true;
        return;
      }
    }
  },

  [isNotSpeaking.type]: (room, { payload }) => {
    for (let speaker of room.speakers) {
      if (speaker.id === payload) {
        speaker.isSpeaking = false;
        return;
      }
    }
  },

  [micMuted.type]: (room, { payload }) => {
    for (let speaker of room.speakers) {
      if (speaker.id === payload) {
        speaker.muted = true;
        return;
      }
    }
  },
  [micUnmuted.type]: (room, { payload }) => {
    for (let speaker of room.speakers) {
      if (speaker.id === payload) {
        speaker.muted = false;
        return;
      }
    }
  },
  [requestSpeak.type]: (room, _) => {
    room.io?.emit("request-to-speak", room.io.id);
    room.showRequestSpeak = false;
  },
  [approvedSpeak.type]: (room, { payload }) => {
    const { requesterUserId } = payload as ApprovedSpeak;
    room.io?.emit("approved-to-speak", payload);
    for (let r of room.requesters) {
      if (r.id === requesterUserId) {
        room.speakers.push(r);
        room.requesters = room.requesters.filter(
          (r) => r.id !== requesterUserId,
        );
        return;
      }
    }
  },
  [streamSuccess.type]: (room, { payload }) => {
    room.stream = payload;
  },
  [roomSocketCall.type]: (room, _) => {
    room.loading = true;
  },
  [pauseResumeStream.type]: (room, _) => {
    room.stream
      ?.getTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    room.muted = !room.muted;

    if (room.muted) {
      room.listeners.map((l) => l.peer?.emitMute());
      room.requesters.map((r) => r.peer?.emitMute());
      room.speakers.map((s) => {
        if (s.me) s.muted = true;
        s.peer?.emitMute();
      });
    } else {
      room.listeners.map((l) => l.peer?.emitUnmute());
      room.requesters.map((r) => r.peer?.emitUnmute());
      room.speakers.map((s) => {
        if (s.me) s.muted = false;
        s.peer?.emitUnmute();
      });
    }
  },

  [stopStream.type]: (room, _) => {
    room.stream?.getTracks().forEach((t) => t.stop());
  },
  [roomSocketSuccess.type]: (room, { payload }) => {
    const { roomName, requesters, speakers, listeners } = payload as Room;
    room.roomName = roomName;
    room.listeners = listeners;
    room.requesters = requesters || [];
    room.speakers = speakers;
    room.loading = false;
  },

  [addUserToSpeakers.type]: (room, { payload }) => {
    room.speakers.push(payload);
  },
  [updateSpeakerPeer.type]: (room, { payload }) => {
    const { userId, peer, caller } = payload;
    for (let speaker of room.speakers) {
      if (speaker.id === userId) {
        speaker.peer = peer;
        speaker.socketId = caller;
        return;
      }
    }
  },
  [updateSpeakerSignal.type]: (room, { payload }) => {
    const { caller, signal } = payload;
    for (let speaker of room.speakers) {
      if (speaker.socketId === caller) {
        speaker.peer.setSignal(signal);
        return;
      }
    }
  },
  [addUserToListeners.type]: (room, { payload }) => {
    room.listeners.push(payload);
  },

  [updateListenerPeer.type]: (room, { payload }) => {
    const { peer, caller, userId } = payload;
    for (let listener of room.listeners) {
      if (listener.id === userId) {
        listener.peer = peer;
        listener.socketId = caller;
        return;
      }
    }
  },
  [updateListenerSignal.type]: (room, { payload }) => {
    const { caller, signal } = payload;
    for (let listener of room.listeners) {
      if (listener.socketId === caller) {
        listener.peer.setSignal(signal);
        return;
      }
    }
  },
  [addUserToRequesters.type]: (room, { payload }) => {
    if (room.meAdmin) {
      const { socketId } = payload;
      for (let listener of room.listeners) {
        if (listener.socketId === socketId) {
          room.requesters.push(listener);
          room.listeners = room.listeners.filter(
            (l) => l.socketId !== socketId,
          );
          return;
        }
      }
    }
  },

  [removeUser.type]: (room, { payload }) => {
    const { userId } = payload;
    room.listeners = room.listeners.filter((l) => {
      if (l.id === userId) {
        if (l.peer) l.peer.close();
        return false;
      } else {
        return true;
      }
    });
    room.requesters = room.requesters.filter((l) => {
      if (l.id === userId) {
        if (l.peer) l.peer.close();
        return false;
      } else {
        return true;
      }
    });
    room.speakers = room.speakers.filter((l) => {
      if (l.id === userId) {
        if (l.peer) l.peer.close();
        return false;
      } else {
        return true;
      }
    });
  },
  [toastError.type]: (room, _) => {
    room.loading = false;
  },
  [resetStore.type]: (room, _) => {
    room.io?.disconnect();
    room.stream?.getTracks().forEach((t) => t.stop());
    room.listeners.map((l) => {
      if (l.peer) l.peer.close();
    });

    room.requesters.map((l) => {
      if (l.peer) l.peer.close();
    });

    room.speakers.map((l) => {
      if (l.peer) l.peer.close();
    });
    room.requesters = [];
    room.listeners = [];
    room.speakers = [];
    room.meAdmin = false;
    room.meSpeaker = false;
  },
});
