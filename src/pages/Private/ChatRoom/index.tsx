import { IonContent, IonPage, useIonViewWillLeave } from "@ionic/react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ChatRoomMsgs } from "src/components/organisms/Private/ChatRoom";
import { SOCKET_EMIT_CLIENT_JOINED, SOCKET_ON_NEW_MESSAGE } from "src/shared";
import {
  getMessagesRequest,
  getRoomByNameSelector,
  addMessageState,
  setMessagesState,
} from "src/store/messages";
import "./style.scss";
import MessageFooter from "./MessageFooter";
import { socket } from "src/utils/socket";
import { MessageService } from "src/shared/services/message";
import MessageHeader from "./MessageHeader";

interface Props extends RouteComponentProps<{ room: string }> {
  room: string;
}

const ChatRoomPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const roomName = match.params.room;
  const room = useSelector(getRoomByNameSelector(roomName));

  useEffect(() => {
    if (room?.room) {
      dispatch(getMessagesRequest(room.room));
      MessageService.readStatus({ roomName: room.room });
    }
    if (room?.active) {
      socket.emit(SOCKET_EMIT_CLIENT_JOINED, { room: room.room });
    }
  }, [room]);

  useEffect(() => {
    if (room?.active) {
      socket.on(SOCKET_ON_NEW_MESSAGE, (message) => {
        if (typeof message === "string") {
          return;
        }
        dispatch(addMessageState(message));
      });
    }
    return () => {
      socket.off(SOCKET_ON_NEW_MESSAGE);
    };
  }, []);

  useIonViewWillLeave(() => {
    dispatch(setMessagesState([]));
  });

  return (
    <IonPage id="chat-room-page">
      <MessageHeader room={room} />
      <IonContent forceOverscroll={false}>
        <ChatRoomMsgs />
      </IonContent>
      <MessageFooter room={room} />
    </IonPage>
  );
};

export default ChatRoomPage;
