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
} from "@ionic/react";
import { getDateFormat, IAppointment } from "src/shared";

interface Props {
  item: IAppointment | null;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalClientAppointmentDetail = ({ item, onDismiss }: Props) => {
  if (!item) return <></>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Appointment Details</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <IonList lines="none" className="ion-padding">
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
                <p>{item.canceledByData[0].name || "-"}</p>
              </IonLabel>
            </IonItem>
          )}
          {(item.providerId || item.room) && (
            <IonItem>
              <IonButton
                className="font-bold w-full"
                color="success"
                size="default"
                expand="block"
                // onClick={() => dispatch(setFilterRequestState(initialFilterRequest))}
              >
                Message Provider
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

export default ModalClientAppointmentDetail;
