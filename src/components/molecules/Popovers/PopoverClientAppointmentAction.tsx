import { IonContent, IonList, IonItem } from "@ionic/react";
import { MenuAppointmentActionType } from "src/shared";

interface Props {
  onDismiss: (data: any, role: MenuAppointmentActionType) => void;
}

const PopoverClientAppointmentAction = ({ onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          onClick={() => {
            onDismiss(null, "view appointment");
          }}
        >
          {"view appointment" as MenuAppointmentActionType}
        </IonItem>
        {/* <IonItem
          className="capitalize"
          button={true}
          detail={false}
          onClick={() => {
            onDismiss(null, "contact provider");
          }}
        >
          {"contact provider" as MenuAppointmentActionType}
        </IonItem> */}
        <IonItem
          className="capitalize"
          button={true}
          detail={false}
          onClick={() => {
            onDismiss(null, "get directions");
          }}
        >
          {"get directions" as MenuAppointmentActionType}
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default PopoverClientAppointmentAction;
