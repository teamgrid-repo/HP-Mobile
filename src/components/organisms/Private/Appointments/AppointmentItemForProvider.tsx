import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonModal,
  useIonPopover,
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import { memo } from "react";
import { AppointmentStatusChip } from "src/components/atoms";
import {
  PopoverProviderAppointmentAction,
  ModalProviderAppointmentDetail,
} from "src/components/molecules";
import {
  DEFAULT_DAY_FORMAT,
  getDateFormat,
  IAppointment,
  ICheckRoomRequest,
  IUserResponse,
  MenuAppointmentActionType,
} from "src/shared";
import { AppointmentService } from "src/shared/services";
import { MessageService } from "src/shared/services/message";
import { useAppDispatch } from "src/store/config-store";
import { getRoomsRequest } from "src/store/messages";
import { getAppointmentsRequest } from "src/store/provider";

interface Props {
  item: IAppointment;
  currentUser: IUserResponse | null;
  presentingElement: HTMLElement | null;
}

const AppointmentItemForProvider = ({ item, currentUser, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const navigation = useIonRouter();

  const [presentProviderAppointmentP, dismissProviderAppointmentP] = useIonPopover(
    PopoverProviderAppointmentAction,
    {
      onDismiss: (data: any, role: MenuAppointmentActionType) =>
        dismissProviderAppointmentP(data, role),
      item,
    }
  );
  const [presentProviderAppointmentDetailM, dismissProviderAppointmentDetailM] = useIonModal(
    ModalProviderAppointmentDetail,
    {
      onDismiss: (data: string, role: string) => dismissProviderAppointmentDetailM(data, role),
      item,
    }
  );

  const onOpenPopover = (e: any, item: IAppointment) => {
    presentProviderAppointmentP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuAppointmentActionType) === "view request") {
          if (presentingElement) {
            presentProviderAppointmentDetailM({
              presentingElement: presentingElement,
              onWillDismiss: (e) => {
                if (e.detail.role === "cancelled" && e.detail.data) {
                  updateAppointmentStatus(e.detail.data, "cancelled");
                } else if (e.detail.role === "message") {
                  messageClient();
                }
              },
            });
          }
        } else if ((role as MenuAppointmentActionType) === "accept request") {
          updateAppointmentStatus(item._id, "approved");
        } else if ((role as MenuAppointmentActionType) === "reject request") {
          updateAppointmentStatus(item._id, "cancelled");
        }
      },
    });
  };

  const updateAppointmentStatus = (appointmentId: string, status: string) => {
    if (currentUser) {
      AppointmentService.updateAppointmentStatus(appointmentId, {
        status,
        providerId: currentUser._id,
      })
        .then((response: any) => {
          if (!response.success && response.message && typeof response.message === "string") {
            presentToast({ message: response.message, color: "danger" });
            return;
          }
          dispatch(getAppointmentsRequest());
        })
        .catch((error) => {})
        .finally(() => {});
    }
  };

  const messageClient = () => {
    if (!item || !currentUser) return;
    const data: ICheckRoomRequest = {
      userId: [item.clientData._id],
      group: false,
      roomName: `${currentUser.profileId.userId}-${item.clientData._id}`,
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
  };

  return (
    <IonItem lines="full">
      <div className="w-full py-3 space-y-1">
        <div className="flex justify-between space-x-2">
          <span className="font-bold">{item.clientData.name || ""}</span>
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
            <IonLabel className="ion-text-wrap !text-[11px]">
              Category of Care: {item.service.serviceName || item.subCategoryData.name || ""}
            </IonLabel>
          </div>
          <div className="flex flex-col space-y-2">
            <AppointmentStatusChip status={item.status} />
            <IonLabel className="text-right font-bold text-[11px]" color="success">
              {getDateFormat(item.date, DEFAULT_DAY_FORMAT)}
            </IonLabel>
          </div>
        </div>
      </div>
    </IonItem>
  );
};

export default memo(AppointmentItemForProvider);
