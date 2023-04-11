import { IonContent, IonList, IonItem } from "@ionic/react";
import { IAppointment, MenuAppointmentActionType } from "src/shared";

interface Props {
  item: IAppointment | null;
  onDismiss: (data: any, role: MenuAppointmentActionType) => void;
}

const PopoverProviderAppointmentAction = ({ item, onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          onClick={() => {
            onDismiss(null, "view request");
          }}
        >
          {"view request" as MenuAppointmentActionType}
        </IonItem>
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          disabled={item?.status === "approved"}
          onClick={() => {
            onDismiss(null, "accept request");
          }}
        >
          {"accept request" as MenuAppointmentActionType}
        </IonItem>
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          disabled={item?.status === "cancelled"}
          onClick={() => {
            onDismiss(null, "reject request");
          }}
        >
          {"reject request" as MenuAppointmentActionType}
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default PopoverProviderAppointmentAction;
