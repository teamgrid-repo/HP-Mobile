import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import { logoApple } from "ionicons/icons";
import "./style.scss";
import { ProviderRegForm2 } from "src/components/organisms";
import { Logo, LogoFacebook, LogoGoogle } from "src/shared";
import { BackButton } from "src/components/atoms";
import { Device } from "@capacitor/device";
import { useState } from "react";

const CreateAccount2 = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useIonViewWillEnter(() => {
    Device.getInfo().then((deviceInfo) => {
      setIsAndroid(deviceInfo.platform === "android");
    });
  });

  const registerWithFacebook = () => {};

  return (
    <IonPage id="register-page">
      <IonContent className="ion-padding">
        <BackButton />
        <IonGrid className="flex flex-col pt-12">
          <IonRow>
            <IonCol size="12">
              <IonImg className="register-logo" src={Logo} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText className="register-title">Almost there!</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <ProviderRegForm2 />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-[14px]">Or sign in with</IonText>
            </IonCol>
            <IonCol size="12" className="flex flex-row space-x-3 justify-center">
              {!isAndroid && (
                <IonButton className="social-btn" color="light">
                  <IonIcon slot="icon-only" icon={logoApple}></IonIcon>
                </IonButton>
              )}
              <IonButton className="social-btn" color="light">
                <IonIcon slot="icon-only" icon={LogoGoogle}></IonIcon>
              </IonButton>
              <IonButton className="social-btn" color="light" onClick={registerWithFacebook}>
                <IonIcon slot="icon-only" icon={LogoFacebook}></IonIcon>
              </IonButton>
            </IonCol>
            <IonCol className="flex flex-row justify-center text-[14px] space-x-1">
              <IonText className="my-auto">Already have an account?</IonText>
              <IonButton className="login-btn" fill="clear" color="dark" routerLink="/login">
                Login.
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount2;
