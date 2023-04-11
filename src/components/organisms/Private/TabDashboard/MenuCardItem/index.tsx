import { Browser } from "@capacitor/browser";
import { IonCard, IonCardContent, IonIcon, useIonRouter } from "@ionic/react";
import { home } from "ionicons/icons";
import { IMenuItem } from "src/shared";
import "./style.scss";

interface Props {
  menuItem: IMenuItem;
}

const MenuCardItem = ({ menuItem }: Props) => {
  const navigation = useIonRouter();

  const handleClick = () => {
    if (menuItem.isWebLink && menuItem.route) {
      Browser.open({ url: menuItem.route });
    } else {
      navigation.push(menuItem.route, menuItem.routerDirection);
    }
  };

  return (
    <IonCard className="menu-card-item" button onClick={handleClick}>
      <IonCardContent className="no-padding">
        <div className="menu-icon">
          <IonIcon icon={menuItem.icon ? menuItem.icon : home} color="success"></IonIcon>
        </div>
        <p className="menu-name">{menuItem.name}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default MenuCardItem;
