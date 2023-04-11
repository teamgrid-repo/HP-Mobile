import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonProgressBar,
  useIonPopover,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { PopoverChatRoomAction, ProfileImageWithStatus } from "src/components/molecules";
import { DEFAULT_PROFILE_IMAGE, IChatRoom, MenuChatRoomActionType } from "src/shared";
import { ClientService } from "src/shared/services";
import { MessageService } from "src/shared/services/message";
import { loadingSelector } from "src/store/global";
import { GET_MESSAGES_REQUEST, getRoomsRequest, isOnlineRoomSelector } from "src/store/messages";
import { getSavedClientsRequest } from "src/store/provider";

interface Props {
  room: IChatRoom | undefined;
}

const MessageHeader = ({ room }: Props) => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();
  const [presentToast] = useIonToast();
  const isOnline = useSelector(isOnlineRoomSelector(room?.rid || ""));
  const loading = useSelector(loadingSelector(GET_MESSAGES_REQUEST));
  const [presentChatRoomActionP, dismissChatRoomActionP] = useIonPopover(PopoverChatRoomAction, {
    onDismiss: (data: any, role: MenuChatRoomActionType) => dismissChatRoomActionP(data, role),
    room,
  });

  const name = room?.name.map((item) => item.name).toString();
  const avatarImg =
    room?.name.length && room.name[0].image ? room.name[0].image : DEFAULT_PROFILE_IMAGE;

  const onOpenPopover = (e: any) => {
    presentChatRoomActionP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        const { role, data } = e.detail;
        if ((role as MenuChatRoomActionType) === "Add Client") {
          ClientService.addClient(data.id)
            .then((response: any) => {
              if (!response.success && response.message && typeof response.message === "string") {
                presentToast({ message: response.message, color: "danger" });
                return;
              }
              if (response.success && response.message && typeof response.message === "string") {
                presentToast({ message: response.message, color: "success" });
              }
              dispatch(getSavedClientsRequest());
            })
            .catch((error) => {})
            .finally(() => {});
        } else if ((role as MenuChatRoomActionType) === "Remove Client") {
          ClientService.deleteClient(data.id)
            .then((res: any) => {
              if (!res.success && res.message && typeof res.message === "string") {
                presentToast({ message: res.message, color: "danger" });
                return;
              }
              if (res.success && res.message && typeof res.message === "string") {
                presentToast({ message: res.message, color: "success" });
              }
              dispatch(getSavedClientsRequest());
            })
            .catch((error) => {})
            .finally(() => {});
        } else if ((role as MenuChatRoomActionType) === "Leave Chat") {
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
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.push("/tabs/tab-messages", "root", "push");
              }
            })
            .catch((error) => {})
            .finally(() => {});
        }
      },
    });
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          <IonBackButton color="success" defaultHref="/tabs/tab-messages"></IonBackButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton color="success" onClick={onOpenPopover}>
            <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <div className="room-info-wrapper">
          <div className="my-auto mx-4">
            <ProfileImageWithStatus image={avatarImg} size={50} isOnline={false} />
          </div>
          <div className="profile-info-wraper space-y-2">
            <span className="room-name">{name}</span>
            <span className="room-online">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
        {loading && <IonProgressBar type="indeterminate" color="success"></IonProgressBar>}
      </IonToolbar>
    </IonHeader>
  );
};

export default MessageHeader;
