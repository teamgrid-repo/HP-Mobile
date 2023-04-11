import { IonContent, IonList, IonItem } from "@ionic/react";
import { MenuSavedClientActionType, SAVED_CLIENT_ACTION_LIST } from "src/shared";

interface Props {
  onDismiss: (data: any, role: MenuSavedClientActionType) => void;
}

const PopoverSavedClientAction = ({ onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {SAVED_CLIENT_ACTION_LIST.map((action) => (
          <IonItem
            className="capitalize"
            key={action}
            button={true}
            detail={false}
            onClick={() => {
              onDismiss(null, action);
            }}
          >
            {action}
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default PopoverSavedClientAction;
