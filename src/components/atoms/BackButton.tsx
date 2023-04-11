import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { userStateSelector } from "src/store/auth";

interface Props {
  routerLink?: string;
  text?: string;
}

const BackButton = (props: Props) => {
  const { routerLink = "/", text } = props;
  const currentUser = useSelector(userStateSelector);
  const navigation = useIonRouter();

  const bRouterLink = currentUser?._id ? routerLink : "/welcome";

  const handleBack = () => {
    if (navigation.canGoBack()) {
      const { pathname } = navigation.routeInfo;
      if (currentUser && (pathname === "/provider-search" || pathname === "/quiz")) {
        navigation.push("/", "root");
      } else {
        navigation.goBack();
      }
    } else {
      navigation.push(bRouterLink);
    }
  };
  return (
    <IonButton className="back-btn" fill="clear" color="success" onClick={handleBack}>
      <IonIcon icon={arrowBackOutline}></IonIcon>
      {text}
    </IonButton>
  );
};

export default BackButton;
