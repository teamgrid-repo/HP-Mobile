import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  useIonModal,
  useIonPopover,
  useIonToast,
} from "@ionic/react";
import { ellipsisHorizontal, locationOutline } from "ionicons/icons";
import { memo, useState } from "react";
import { AppointmentStatusChip } from "src/components/atoms";
import {
  PopoverClientAppointmentAction,
  ModalClientAppointmentDetail,
  ModalGetDirection,
} from "src/components/molecules";
import {
  DEFAULT_DAY_FORMAT,
  getDateFormat,
  IAppointment,
  IMarker,
  IUserResponse,
  MenuAppointmentActionType,
} from "src/shared";
import { AppointmentService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getAppointmentsRequest } from "src/store/provider";

interface Props {
  item: IAppointment;
  currentUser: IUserResponse | null;
  presentingElement: HTMLElement | null;
}

const AppointmentItemForClient = ({ item, currentUser, presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [marker, setMarker] = useState<IMarker | null>(null);

  const [presentClientAppointmentP, dismissClientAppointmentP] = useIonPopover(
    PopoverClientAppointmentAction,
    {
      onDismiss: (data: any, role: MenuAppointmentActionType) =>
        dismissClientAppointmentP(data, role),
    }
  );
  const [presentClientAppointmentDetailM, dismissClientAppointmentDetailM] = useIonModal(
    ModalClientAppointmentDetail,
    {
      onDismiss: (data: string, role: string) => dismissClientAppointmentDetailM(data, role),
      item,
    }
  );
  const [presentGetDirectionM, dismissGetDirectionM] = useIonModal(ModalGetDirection, {
    onDismiss: (data: string, role: string) => dismissGetDirectionM(data, role),
    origin: marker?.coordinate || null,
  });

  const onOpenClientPopover = (e: any, item: IAppointment) => {
    presentClientAppointmentP({
      event: e,
      onDidDismiss: (e: CustomEvent) => {
        if (!item) return;
        const { role } = e.detail;
        if ((role as MenuAppointmentActionType) === "view appointment") {
          if (presentingElement) {
            presentClientAppointmentDetailM({
              presentingElement: presentingElement,
              onWillDismiss: (e) => {
                if (e.detail.role === "cancelled" && e.detail.data) {
                  updateAppointmentStatus(e.detail.data, "cancelled");
                }
              },
            });
          }
        } else if ((role as MenuAppointmentActionType) === "contact provider") {
        } else if ((role as MenuAppointmentActionType) === "get directions") {
          setMarker({
            coordinate: { lat: item.siteData.location.lat, lng: item.siteData.location.lang },
            title: item.siteData.name || "",
          });
          presentGetDirectionM({});
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

  return (
    <IonItem lines="full">
      <div className="w-full py-3 space-y-1">
        <div className="flex justify-between space-x-2">
          <span className="font-bold">{item.clientData.name || ""}</span>
          <IonButton
            className="nopadding-btn mx-0 my-auto"
            fill="clear"
            color="medium"
            onClick={(e) => onOpenClientPopover(e, item)}
          >
            <IonIcon slot="icon-only" icon={ellipsisHorizontal}></IonIcon>
          </IonButton>
        </div>
        <div className="flex justify-between space-x-4">
          <div className="flex flex-row text-gray-500">
            <IonIcon className="text-[16px] mr-1" icon={locationOutline}></IonIcon>
            <IonLabel className="ion-text-wrap !text-[11px]">
              {item.siteData.address || ""}
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

export default memo(AppointmentItemForClient);
