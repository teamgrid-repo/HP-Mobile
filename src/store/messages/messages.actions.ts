import { IChatRoom, IMessage } from "src/shared";
import {
  ADD_MESSAGE_STATE,
  GET_MESSAGES_REQUEST,
  GET_ROOMS_REQUEST,
  SET_HAS_NEW_MESSAGE_STATE,
  SET_MESSAGES_STATE,
  SET_ONLINE_ROOMIDS_STATE,
  SET_ROOMS_STATE,
} from "./messages.actiontypes";

export const getMessagesRequest = (payload: string) => ({
  type: GET_MESSAGES_REQUEST,
  payload,
});
export const setMessagesState = (payload: IMessage[]) => ({
  type: SET_MESSAGES_STATE,
  payload,
});
export const addMessageState = (payload: IMessage) => ({
  type: ADD_MESSAGE_STATE,
  payload,
});
export const setHasNewMessageState = (payload: boolean) => ({
  type: SET_HAS_NEW_MESSAGE_STATE,
  payload,
});

export const getRoomsRequest = () => ({
  type: GET_ROOMS_REQUEST,
});
export const setRoomsState = (payload: IChatRoom[]) => ({
  type: SET_ROOMS_STATE,
  payload,
});
export const setOnlineRoomIdsState = (payload: string[]) => ({
  type: SET_ONLINE_ROOMIDS_STATE,
  payload,
});
