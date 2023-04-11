import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDateFormat, IAppointment } from "src/shared";
import { ClientService } from "src/shared/services";
import { getSavedClientsRequest, savedClientsStateSelector } from "src/store/provider";

interface Props {
  item: IAppointment | null;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalProviderAppointmentDetail = ({ item, onDismiss }: Props) => {
  const dispatch = useDispatch();
  const [presentToast] = useIonToast();
  const savedClients = useSelector(savedClientsStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasClient = savedClients.find((client) => client.userId._id === item?.clientData._id);

  const addToClient = (id: string, addFlag: boolean) => {
    setIsProcessing(true);
    if (addFlag) {
      ClientService.addClient(id)
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
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      ClientService.deleteClient(id)
        .then((response: any) => {
          if (response.success && response.message && typeof response.message === "string") {
            presentToast({ message: response.message, color: "success" });
          }
          dispatch(getSavedClientsRequest());
        })
        .catch((error) => {})
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  if (!item) return <></>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Appointment Details</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <IonList lines="none" className="ion-padding">
          <IonItem>
            <IonLabel>
              <h2>Name</h2>
              <p className="ion-text-wrap">{item.clientData.name || "-"}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Email</h2>
              <p className="ion-text-wrap">{item.clientData.email || "-"}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Phone</h2>
              <p className="ion-text-wrap">{item.clientData.contact || "-"}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Site of Interest</h2>
              <p className="ion-text-wrap">{item.siteData.name || "-"}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Site Address</h2>
              <p className="ion-text-wrap">{item.siteData.address || "-"}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Service</h2>
              <p className="ion-text-wrap">
                {item.service.serviceName || item.subCategoryData.name || "-"}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Date</h2>
              <p>{getDateFormat(item.date)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Status</h2>
              <p>{item.status || "-"}</p>
            </IonLabel>
          </IonItem>
          {item.status === "cancelled" && (
            <IonItem>
              <IonLabel>
                <h2>Canceled By</h2>
                <p>{item.canceledByData.length > 0 ? item.canceledByData[0].name : "-"}</p>
              </IonLabel>
            </IonItem>
          )}
          <IonItem>
            <IonButton
              className="font-bold w-full"
              color="success"
              size="default"
              expand="block"
              onClick={() => onDismiss(undefined, "message")}
            >
              Message Client
            </IonButton>
          </IonItem>
          {item.clientData && item.clientData._id && (
            <IonItem>
              <IonButton
                className="font-bold w-full"
                color="success"
                size="default"
                expand="block"
                onClick={() => addToClient(item.clientData._id, !hasClient)}
              >
                {hasClient ? "Remove Client" : "Save Client"}
              </IonButton>
            </IonItem>
          )}

          {item.status !== "cancelled" && (
            <IonItem>
              <IonButton
                className="font-bold w-full"
                color="danger"
                size="default"
                expand="block"
                onClick={() => onDismiss(item._id, "cancelled")}
              >
                Cancel Appointment
              </IonButton>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ModalProviderAppointmentDetail;
