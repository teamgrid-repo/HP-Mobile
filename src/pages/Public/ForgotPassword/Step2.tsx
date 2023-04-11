import { IonPage, IonContent, IonButton, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { BackButton } from "src/components/atoms";
import { InformationCircle } from "src/shared";

const Step2 = () => {
  return (
    <IonPage id="forgot-password-page">
      <IonContent forceOverscroll={false} className="ion-padding">
        <BackButton />

        <IonGrid className="flex flex-col pt-24">
          <IonRow>
            <IonCol size="12">
              <IonImg className="forgot-password-logo" src={InformationCircle} />
            </IonCol>
          </IonRow>
          <IonRow className="mt-8">
            <IonCol size="12">
              <h2 className="forgot-password-title">Check your email</h2>
              <p className="forgot-password-desc">
                We have sent a password recovery instruction to your email
              </p>
            </IonCol>
            <IonCol size="12" className="mt-20">
              <IonButton
                className="next-btn"
                color="success"
                expand="block"
                routerLink="/forgot-password/step3"
              >
                Ok
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Step2;
