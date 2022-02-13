import express from "express";
import cors from "cors";
import http from "http";
import { CLIENT_URL } from "./config/constants";
import routes from "./routes/routes";

export const expressInit = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: CLIENT_URL,
    }),
  );
  app.use("/", routes);
  return http.createServer(app);
};
