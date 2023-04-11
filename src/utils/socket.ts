import { io } from "socket.io-client";
import { HERPLAN_SOCKET_URL } from "src/shared";

export const socket = io(HERPLAN_SOCKET_URL);
