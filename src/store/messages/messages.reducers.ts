import { orderBy } from "lodash";
import { RootAction } from "../root-action";
import {
  ADD_MESSAGE_STATE,
  SET_HAS_NEW_MESSAGE_STATE,
  SET_MESSAGES_STATE,
  SET_ONLINE_ROOMIDS_STATE,
  SET_ROOMS_STATE,
} from "./messages.actiontypes";
import { MessagesState } from "./messages.models";

const initialState: MessagesState = {
  rooms: [],
  onlineRoomIds: [],
  messages: [],
  hasNewMessage: false,
};

export const messagesReducer = (
  state: MessagesState = initialState,
  action: RootAction
): MessagesState => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGES_STATE:
      const payloadOrderBy = orderBy(payload, ["time"], "asc");
      return { ...state, messages: payloadOrderBy };
    case ADD_MESSAGE_STATE:
      const fMessage = state.messages.find((m) => m._id === payload._id);
      if (fMessage) return { ...state };
      return {
        ...state,
        messages: orderBy([...state.messages, payload], ["time"], "asc"),
        hasNewMessage: true,
      };
    case SET_HAS_NEW_MESSAGE_STATE:
      return { ...state, hasNewMessage: payload };
    case SET_ROOMS_STATE:
      return { ...state, rooms: payload };
    case SET_ONLINE_ROOMIDS_STATE:
      return { ...state, onlineRoomIds: payload };
    default:
      return state;
  }
};
