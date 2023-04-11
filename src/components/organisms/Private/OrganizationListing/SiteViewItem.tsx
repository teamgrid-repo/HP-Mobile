import { IonItem, IonLabel } from "@ionic/react";
import { memo } from "react";
import { ISiteInfoForView } from "./SiteViewList";

interface Props {
  item: ISiteInfoForView;
}

const SiteViewItem = ({ item }: Props) => {
  return (
    <IonItem lines="full">
      <IonLabel>
        <h2>{item.siteName}</h2>
        <p className="ion-text-wrap capitalize !text-[11px]">Category: {item.catName}</p>
        <p className="ion-text-wrap capitalize !text-[11px]">Sub-Categories: {item.subCats}</p>
      </IonLabel>
    </IonItem>
  );
};

export default memo(SiteViewItem);
