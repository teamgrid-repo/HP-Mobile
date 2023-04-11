import { Browser } from "@capacitor/browser";
import { IonIcon, IonButton, IonGrid, IonRow, IonCol, IonPage } from "@ionic/react";
import { close, informationCircleOutline } from "ionicons/icons";
import { HIPAA_LINK } from "src/shared";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalHipaaInfo = ({ onDismiss }: Props) => {
  const openLink = () => {
    Browser.open({ url: HIPAA_LINK });
  };

  return (
    <div className="p-8">
      <div className="flex">
        <IonIcon
          className="my-auto mr-2"
          size="large"
          icon={informationCircleOutline}
          color="medium"
        ></IonIcon>
        <h4 className="my-auto font-bold">Tool Tip</h4>
      </div>
      <IonButton
        fill="clear"
        color="success"
        className="nopadding-btn absolute right-4 top-4"
        onClick={() => onDismiss()}
      >
        <IonIcon slot="icon-only" icon={close}></IonIcon>
      </IonButton>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <span>
              HIPAA is a federal law regarding patient privacy.{" "}
              <a href="#" onClick={openLink}>
                Individuals and Organizations
              </a>{" "}
              subject to HIPAA are typically familiar with, and trained in, HIPAA requirements.
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ModalHipaaInfo;
