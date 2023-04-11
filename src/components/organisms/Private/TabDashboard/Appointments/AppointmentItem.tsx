import {
  IonCard,
  IonCardContent,
  IonImg,
  IonButton,
  IonSpinner,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { parseISO } from "date-fns";
import { lowerCase } from "lodash";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { AppointmentStatusChip } from "src/components/atoms";
import {
  ModalClientAppointmentDetail,
  ModalProviderAppointmentDetail,
} from "src/components/molecules";
import { useDeepEffect } from "src/hooks";
import { getDateFormat, IAppointment, ICareCategory, IUserResponse } from "src/shared";
import { AppointmentService } from "src/shared/services";
import { getAppointmentsRequest } from "src/store/provider";

interface Props {
  appointment: IAppointment;
  categories: ICareCategory[];
  currentUser: IUserResponse | null;
  presentingElement: HTMLElement | null;
}

const AppointmentItem = (props: Props) => {
  const { appointment, categories, currentUser, presentingElement } = props;

  const dispatch = useDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [category, setCategory] = useState<ICareCategory | null>(null);

  const [presentClientAppointmentDetailM, dismissClientAppointmentDetailM] = useIonModal(
    ModalClientAppointmentDetail,
    {
      onDismiss: (data: string, role: string) => dismissClientAppointmentDetailM(data, role),
      item: appointment,
    }
  );
  const [presentProviderAppointmentDetailM, dismissProviderAppointmentDetailM] = useIonModal(
    ModalProviderAppointmentDetail,
    {
      onDismiss: (data: string, role: string) => dismissProviderAppointmentDetailM(data, role),
      item: appointment,
    }
  );

  useDeepEffect(() => {
    setCategory(
      categories.find((item) => item._id === appointment?.subCategoryData.category_id) || null
    );
  }, [appointment, categories]);

  const viewAppointment = () => {
    if (presentingElement) {
      if (currentUser?.role === "provider") {
        presentProviderAppointmentDetailM({
          presentingElement: presentingElement,
          onWillDismiss: (e) => {
            if (e.detail.role === "cancelled" && e.detail.data) {
              updateAppointmentStatus(e.detail.data, "cancelled");
            }
          },
        });
      } else {
        presentClientAppointmentDetailM({
          presentingElement: presentingElement,
          onWillDismiss: (e) => {
            if (e.detail.role === "cancelled" && e.detail.data) {
              updateAppointmentStatus(e.detail.data, "cancelled");
            }
          },
        });
      }
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: string) => {
    if (currentUser) {
      setIsProcessing(true);
      AppointmentService.updateAppointmentStatus(appointmentId, {
        status,
        providerId: currentUser._id,
      })
        .then((response: any) => {
          if (!response.success && response.message && typeof response.message === "string") {
            presentToast({ message: response.message, color: "danger" });
          }
          dispatch(getAppointmentsRequest());
        })
        .catch((error) => {})
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <IonCard className="appointment-card">
      <IonCardContent>
        <div className="flex flex-row w-full">
          <div className="grow">
            <h2 className="text-black !font-bold !text-[12px] !mb-1">
              {appointment.siteData.name}
            </h2>
            <p className="capitalize !text-[11px]">Care: {lowerCase(category?.name || "")}</p>
            {currentUser?.role === "provider" && (
              <p className="capitalize !text-[11px]">
                Client: {lowerCase(appointment.clientId.name || "")}
              </p>
            )}
            <p className="!text-[11px]">Date: {getDateFormat(parseISO(appointment.date))}</p>
            <AppointmentStatusChip status={appointment.status} />
          </div>
          {category?.icon && (
            <div className="w-[80px] h-[80px] relative -top-[12px] -right-[12px]">
              <IonImg className="w-full h-full" src={category.icon} />
            </div>
          )}
        </div>
        <div className="mt-4">
          <IonButton color="success" fill="outline" expand="block" onClick={viewAppointment}>
            View Request
          </IonButton>
          {currentUser?.role === "provider" && appointment.status !== "approved" && (
            <IonButton
              color="success"
              expand="block"
              disabled={isProcessing}
              onClick={() => updateAppointmentStatus(appointment._id, "approved")}
            >
              {isProcessing && <IonSpinner className="mr-2" />}
              Accept
            </IonButton>
          )}
          {appointment.status !== "cancelled" && (
            <IonButton
              color="danger"
              fill="outline"
              expand="block"
              disabled={isProcessing}
              onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
            >
              {isProcessing && <IonSpinner className="mr-2" />}
              {currentUser?.role === "provider" ? "Reject" : "Cancel"}
            </IonButton>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default memo(AppointmentItem);
