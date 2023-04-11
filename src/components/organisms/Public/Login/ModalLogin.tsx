import { IonContent, IonPage } from "@ionic/react";
import { CloseButton } from "src/components/atoms";
import LoginForm from "./LoginForm";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  title?: string;
}

const ModalLogin = ({ onDismiss, title = "Login to your Account" }: Props) => {
  return (
    <IonPage id="login-page">
      <IonContent forceOverscroll={false} className="ion-padding">
        <CloseButton onClose={onDismiss} />
        <LoginForm isModal onClose={onDismiss} title={title} />
      </IonContent>
    </IonPage>
  );
};

export default ModalLogin;
