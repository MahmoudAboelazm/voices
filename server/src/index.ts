import { PORT } from "./config/constants";
import { dbConnection } from "./config/db";
import { expressInit } from "./main";
import { socketInit } from "./socket";

const index = async () => {
  const server = expressInit();
  socketInit(server);
  await dbConnection();
  server.listen(PORT, () => console.log("🚀 Server running on port:", PORT));
};
index().catch((err) => {
  console.log(err);
});
