import * as dotenv from "dotenv";
import server from "./server";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

server.start(PORT || 8888);

export default server;
