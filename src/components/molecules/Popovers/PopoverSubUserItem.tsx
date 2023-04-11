import { IonContent, IonList, IonItem } from "@ionic/react";
import { useMemo } from "react";
import { IProfile, MenuSubUserActionType } from "src/shared";

interface Props {
  item: IProfile | null;
  onDismiss: (data: any, role: MenuSubUserActionType) => void;
}

const PopoverSubUserItem = ({ item, onDismiss }: Props) => {
  const actionList = useMemo(() => {
    const actions: MenuSubUserActionType[] = ["View"];
    if (!item?.approvalPending) {
      actions.push("Edit");
      actions.push("Resend Invite");
      actions.push("Delete");
    }
    return actions;
  }, [item]);

  return (
    <IonContent forceOverscroll={false}>
      <IonList lines="none" className="popover-list">
        {actionList.map((action) => (
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

export default PopoverSubUserItem;
