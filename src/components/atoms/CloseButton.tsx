import { IonButton, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";

interface Props {
  onClose: () => void;
}

const CloseButton = ({ onClose }: Props) => {
  return (
    <IonButton className="close-btn" fill="clear" color="success" onClick={onClose}>
      <IonIcon icon={close}></IonIcon>
    </IonButton>
  );
};

export default CloseButton;
