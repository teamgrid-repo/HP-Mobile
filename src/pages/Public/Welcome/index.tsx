import { Browser } from "@capacitor/browser";
import {
  IonPage,
  IonContent,
  IonButton,
  IonImg,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { LogoWhite, TERMS_OF_USE_LINK } from "src/shared";
import { getCareSubcategoriesRequest, getSpecialQualificationsRequest } from "src/store/category";
import "./style.scss";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();

  const loadDefaultData = () => {
    dispatch(getCareSubcategoriesRequest());
    dispatch(getSpecialQualificationsRequest());
  };

  return (
    <IonPage id="welcome-page">
      <IonContent className="ion-padding" forceOverscroll={false} slot="fixed">
        <IonGrid className="flex flex-col justify-between h-full pt-12">
          <IonRow>
            <IonCol size="12" className="flex flex-col text-center space-y-6">
              <IonImg className="welcome-logo" src={LogoWhite} />
              <IonText className="welcome-title mx-auto">Welcome!</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="flex flex-col space-y-1 mb-4">
              <IonButton
                className="login-btn"
                expand="block"
                color="success"
                onClick={() => {
                  loadDefaultData();
                  navigation.push("/login", "forward");
                }}
              >
                Log In
              </IonButton>
              <IonButton
                className="singup-btn"
                expand="block"
                fill="outline"
                color="success"
                routerLink="/register/create-account1"
              >
                Sign In
              </IonButton>
              <IonButton
                className="skiplogin-btn"
                fill="clear"
                expand="block"
                color="light"
                onClick={() => {
                  loadDefaultData();
                  navigation.push("/provider-search", "forward");
                }}
              >
                Skip Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="terms-btn"
                fill="clear"
                expand="block"
                color="light"
                onClick={() => Browser.open({ url: TERMS_OF_USE_LINK })}
              >
                Terms & Conditions
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
