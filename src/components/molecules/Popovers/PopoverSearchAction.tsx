import { IonContent, IonList, IonItem } from "@ionic/react";
import { MenuActionType, PROVIDER_ACTION_LIST } from "src/shared";

interface Props {
  onDismiss: (data: any, role: MenuActionType) => void;
}

const PopoverSearchAction = ({ onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {PROVIDER_ACTION_LIST.map((action) => (
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

export default PopoverSearchAction;
