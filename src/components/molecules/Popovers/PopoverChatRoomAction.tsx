import { IonContent, IonList, IonItem } from "@ionic/react";
import { useSelector } from "react-redux";
import { IChatRoom, MenuChatRoomActionType } from "src/shared";
import { userStateSelector } from "src/store/auth";
import { savedClientsStateSelector } from "src/store/provider";

interface Props {
  room: IChatRoom;
  onDismiss: (data: any, role: MenuChatRoomActionType) => void;
}

const PopoverChatRoomAction = ({ room, onDismiss }: Props) => {
  const currentUser = useSelector(userStateSelector);
  const clients = useSelector(savedClientsStateSelector);

  const userRole = currentUser?.role || "user";
  const sid = room.group ? "" : room.rid;
  const role = room.name.length ? room.name[0].role : "";
  const hasClient = clients.find((c) => c.userId._id === sid);

  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {room.group && room.active && (
          <IonItem
            className="capitalize"
            button={true}
            detail={false}
            onClick={() => {
              onDismiss({ roomName: room.room, delete: false }, "Leave Chat");
            }}
          >
            {"Leave Chat" as MenuChatRoomActionType}
          </IonItem>
        )}
        {!room.group && userRole === "provider" && sid && role !== "provider" && (
          <IonItem
            className="capitalize"
            button={true}
            detail={false}
            onClick={() => {
              if (hasClient) {
                onDismiss({ id: sid }, "Remove Client");
              } else {
                onDismiss({ id: sid }, "Add Client");
              }
            }}
          >
            {hasClient ? "Remove Client" : ("Add Client" as MenuChatRoomActionType)}
          </IonItem>
        )}
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          onClick={() => {
            onDismiss({ roomName: room.room, delete: room.group }, "Leave Chat");
          }}
        >
          {"Delete Chat" as MenuChatRoomActionType}
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default PopoverChatRoomAction;
