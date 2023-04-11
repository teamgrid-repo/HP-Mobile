import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useState } from "react";
import { ISubCategoryInfoForProviderDetails } from "src/shared";

interface Props {
  subCategoryInfo: ISubCategoryInfoForProviderDetails;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSiteDetails = ({ subCategoryInfo, onDismiss }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  function dismiss() {
    onDismiss(null, "cancel");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{subCategoryInfo.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} color="success" onClick={() => dismiss()}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}></IonContent>
    </IonPage>
  );
};

export default ModalSiteDetails;
