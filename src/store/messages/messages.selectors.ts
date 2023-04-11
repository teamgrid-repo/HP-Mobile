import { createSelector } from "reselect";
import { RootState } from "src/store/root-reducer";

export const roomsStateSelector = createSelector(
  (state: RootState) => state.messages,
  (r) => r.rooms
);

export const getRoomByNameSelector = (roomName: string) =>
  createSelector(
    (state: RootState) => state.messages,
    (r) => r.rooms.find((item) => item.room === roomName)
  );

export const onlineRoomIdsStateSelector = createSelector(
  (state: RootState) => state.messages,
  (r) => r.onlineRoomIds
);

export const isOnlineRoomSelector = (rid: string) =>
  createSelector(
    (state: RootState) => state.messages,
    (r) => !!r.onlineRoomIds.find((item) => item === rid)
  );

export const messagesStateSelector = createSelector(
  (state: RootState) => state.messages,
  (r) => r.messages
);

export const hasNewMessageStateSelector = createSelector(
  (state: RootState) => state.messages,
  (r) => r.hasNewMessage
);
