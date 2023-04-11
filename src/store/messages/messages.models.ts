import { IChatRoom, IMessage } from "src/shared";

export interface MessagesState {
  rooms: IChatRoom[];
  onlineRoomIds: string[];
  messages: IMessage[];
  hasNewMessage: boolean;
}
