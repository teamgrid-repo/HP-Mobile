import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import "./style.scss";

interface Props {
  url: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalPreviewImage = ({ url, onDismiss }: Props) => {
  return (
    <IonPage id="modal-preview-image">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => onDismiss()}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen forceOverscroll={false}>
        <div className="image-container">
          <IonImg src={url} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ModalPreviewImage;
