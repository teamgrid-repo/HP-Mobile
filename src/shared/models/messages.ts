import { IUserResponse } from "./auth";

export interface IChatRoom {
  id: string;
  rid: string;
  active: true;
  group: false;
  lastMsg: string;
  lastTime: string;
  name: IUserResponse[];
  room: string;
  status: string;
}

export interface IMessage {
  _id: string;
  room: string;
  imageFlag: boolean;
  status: string;
  text: string;
  time: string;
  socketId: string;
  senderId: IUserResponse;
  activeUserId: string[];
}

export interface ICheckRoomRequest {
  userId: string[];
  group: boolean;
  roomName: string;
}
