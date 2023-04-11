import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ROOMS_REQUEST,
  getRoomsRequest,
  onlineRoomIdsStateSelector,
  roomsStateSelector,
} from "src/store/messages";
import { RoomItem } from "src/components/organisms";
import { createOutline } from "ionicons/icons";
import { loadingSelector } from "src/store/global";
import { MessageService } from "src/shared/services/message";
import { IChatRoom } from "src/shared";
import { Dialog } from "@capacitor/dialog";

const TabMessages: FC<RouteComponentProps> = ({ match }) => {
  const dispatch = useDispatch();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();
  const rooms = useSelector(roomsStateSelector);
  const loading = useSelector(loadingSelector(GET_ROOMS_REQUEST));
  const onlineRoomIds = useSelector(onlineRoomIdsStateSelector);

  useIonViewWillEnter(() => {
    dispatch(getRoomsRequest());
  });

  const deleteChat = (room: IChatRoom) => {
    Dialog.confirm({
      title: "Leave or Delete?",
      message: "Are you sure you want to leave or delete this chat?",
    }).then(({ value }) => {
      if (!value) return;
      handleLeaveOrDelete(room);
    });
  };

  const handleLeaveOrDelete = (room: IChatRoom) => {
    const data = { roomName: room.room, delete: room.group };
    presentLoading();
    MessageService.leaveOrDelete(data)
      .then((res: any) => {
        if (!res.success && res.message && typeof res.message === "string") {
          presentToast({ message: res.message, color: "danger" });
          return;
        }
        if (res.success && res.message && typeof res.message === "string") {
          presentToast({ message: res.message, color: "success" });
        }
        dispatch(getRoomsRequest());
      })
      .catch((error) => {})
      .finally(() => {
        dismissLoading();
      });
  };

  return (
    <IonPage id="tab-messages-page">
      {/* <IonHeader translucent className="ion-no-border"> */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton fill="clear" slot="icon-only" color="success" className="nopadding-btn">
              <IonIcon icon={createOutline} />
            </IonButton>
          </IonButtons> */}
          {loading && <IonProgressBar type="indeterminate" color="success"></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messages</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <Virtuoso
          className="ion-content-scroll-host"
          style={{ height: "100%" }}
          data={rooms}
          itemContent={(index, item) => (
            <RoomItem
              room={item}
              isOnline={!!onlineRoomIds.find((onlineRoomId) => onlineRoomId === item.rid)}
              onDeleteChat={deleteChat}
            />
          )}
        />
      </IonContent>
    </IonPage>
  );
};

export default TabMessages;
