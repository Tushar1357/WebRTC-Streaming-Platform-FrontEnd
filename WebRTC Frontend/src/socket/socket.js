import { io } from "socket.io-client";
import { ws_url } from "../constants/baseUrl";

const socket = io(ws_url);

export default socket;
