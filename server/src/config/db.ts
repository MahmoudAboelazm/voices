import mongoose from "mongoose";
import { MONGO_URL } from "./constants";

export const dbConnection = async () => {
  mongoose.connection.on("connecting", () => {
    console.log("Connecting to MongoDB...");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err.message);
  });

  mongoose.connection.on("connected", () => {
    console.log("✨ Server connected to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    console.info("Server lost connection to MongoDB");
  });
  await mongoose.connect(MONGO_URL);
};
