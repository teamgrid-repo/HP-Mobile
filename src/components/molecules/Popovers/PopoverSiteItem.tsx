import { IonContent, IonList, IonItem } from "@ionic/react";
import { useState } from "react";
import { useDeepEffect } from "src/hooks";
import { ISite, MenuSiteItemActionType } from "src/shared";

interface Props {
  item: ISite | null;
  onDismiss: (data: any, role: MenuSiteItemActionType) => void;
}

const PopoverSiteItem = ({ item, onDismiss }: Props) => {
  const [actionList, setActionList] = useState<MenuSiteItemActionType[]>([]);

  useDeepEffect(() => {
    const actions: MenuSiteItemActionType[] = ["View"];
    if (!item?.approvalPending && !item?.status) {
      actions.push("Edit");
      actions.push("Delete");
    }
    if (!item?.status) actions.push("Details");
    setActionList(actions);
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

export default PopoverSiteItem;
