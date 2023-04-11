import { IonContent, IonPage } from "@ionic/react";
import { BackButton } from "src/components/atoms";
import { LoginForm } from "src/components/organisms";

const Login = () => {
  return (
    <IonPage id="login-page">
      <IonContent className="ion-padding">
        <BackButton />
        <LoginForm />
      </IonContent>
    </IonPage>
  );
};

export default Login;
