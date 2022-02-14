import { model, Schema } from "mongoose";

interface RoomModel {
  name: string;
  creatorId: string;
  users: string[];
  speakers: string[];
  requesters: string[];
  admins: string[];
  creationDate: Date;
}

const RoomSchema = new Schema({
  name: String,
  creationDate: { type: Date },
  creatorId: { type: String, unique: true },
  users: [String],
  speakers: [String],
  requesters: [String],
  admins: [String],
});
export const Room = model<RoomModel>("Room", RoomSchema);
