import { IonContent, IonList, IonItem } from "@ionic/react";
import { MenuMyProvidersActionType, MY_PROVIDERS_ACTION_LIST } from "src/shared";

interface Props {
  onDismiss: (data: any, role: MenuMyProvidersActionType) => void;
}

const PopoverMyProvidersAction = ({ onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {MY_PROVIDERS_ACTION_LIST.map((action) => (
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

export default PopoverMyProvidersAction;
