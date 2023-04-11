import { IonContent, IonList, IonItem } from "@ionic/react";
import { MenuSavedActionType, QUIZITEM_ACTION_LIST } from "src/shared";

interface Props {
  onDismiss: (data: any, role: MenuSavedActionType) => void;
}

const PopoverSavedItem = ({ onDismiss }: Props) => {
  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {QUIZITEM_ACTION_LIST.map((action) => (
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

export default PopoverSavedItem;
