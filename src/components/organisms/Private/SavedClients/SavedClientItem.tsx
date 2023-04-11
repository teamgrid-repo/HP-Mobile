import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonPopover,
  useIonAlert,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { ellipsisHorizontal, mailOutline } from "ionicons/icons";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileImage } from "src/components/atoms";
import { PopoverSavedClientAction } from "src/components/molecules";
import { ICheckRoomRequest, ISavedClient, MenuSavedClientActionType } from "src/shared";
import { ClientService } from "src/shared/services";
import { MessageService } from "src/shared/services/message";
import { userStateSelector } from "src/store/auth";
import { getRoomsRequest } from "src/store/messages";
import { getAppointmentsRequest, getSavedClientsRequest } from "src/store/provider";

interface Props {
  item: ISavedClient;
}

const SavedSearchItem = ({ item }: Props) => {
  const navigation = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const dispatch = useDispatch();
  const currentUser = useSelector(userStateSelector);

  const [presentSavedClientP, dismissSavedClientP] = useIonPopover(PopoverSavedClientAction, {
    onDismiss: (data: any, role: MenuSavedClientActionType) => dismissSavedClientP(data, role),
  });

  const onOpenPopover = (e: any, item: ISavedClient) => {
    presentSavedClientP({
      event: e,
      onDidDismiss: async (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuSavedClientActionType) === "message") {
          const data: ICheckRoomRequest = {
            userId: [item.userId._id],
            group: false,
            roomName: `${currentUser?.profileId.userId}-${item.userId._id}`,
          };
          MessageService.checkRoom(data)
            .then((res: any) => {
              if (res.success && res.data && res.data.room) {
                dispatch(getRoomsRequest());
                navigation.push(`/room/${res.data.room}`);
              }
            })
            .catch((error) => {})
            .finally(() => {});
        } else if ((role as MenuSavedClientActionType) === "remove") {
          presentAlert({
            header: "Delete Client ?",
            message: "Are you sure you want to delete this client?",
            buttons: [
              { text: "Cancel", role: "cancel" },
              {
                text: "Ok",
                role: "confirm",
                handler: () => {
                  if (item && item._id) {
                    ClientService.deleteClient(item.userId._id)
                      .then((res: any) => {
                        if (!res.success && res.message && typeof res.message === "string") {
                          presentToast({ message: res.message, color: "danger" });
                          return;
                        }
                        if (res.success && res.message && typeof res.message === "string") {
                          presentToast({ message: res.message, color: "success" });
                        }
                        dispatch(getSavedClientsRequest());
                        dispatch(getAppointmentsRequest());
                      })
                      .catch((error) => {
                        console.error("Error deleteSiteLocation:", error);
                      })
                      .finally(() => {});
                  }
                },
              },
            ],
          });
        }
      },
    });
  };

  return (
    <IonItem lines="full">
      <div className="w-full py-3 space-y-1">
        <div className="flex justify-between space-x-2">
          <div className="flex flex-row space-x-2">
            <ProfileImage image={item.userId.image || ""} size={30} />
            <span className="font-bold my-auto">{item.name || ""}</span>
          </div>
          <IonButton
            className="nopadding-btn mx-0 my-auto"
            fill="clear"
            color="medium"
            onClick={(e) => onOpenPopover(e, item)}
          >
            <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
          </IonButton>
        </div>
        <div className="flex justify-between space-x-4">
          <div className="flex flex-row text-gray-500">
            <IonIcon className="text-[16px] mr-1" icon={mailOutline}></IonIcon>
            <IonLabel className="ion-text-wrap !text-[11px]">{item.userId.email || ""}</IonLabel>
          </div>
        </div>
      </div>
    </IonItem>
  );
};

export default memo(SavedSearchItem);
