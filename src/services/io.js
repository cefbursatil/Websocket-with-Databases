import { server } from "./express.js";
import { Server } from "socket.io";

const io = new Server(server);

export default io;
