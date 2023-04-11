import { IonIcon, IonButton, IonGrid, IonRow, IonCol, IonPage } from "@ionic/react";
import { close, informationCircleOutline } from "ionicons/icons";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalOptShareDataInfo = ({ onDismiss }: Props) => {
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
              If you opt into provider sharing, Her PLAN providers may contact other Her PLAN
              providers on your behalf. In this case, they may need to share your Her PLAN
              information with other providers. Some Her PLAN providers that are required to abide
              by HIPAA will obtain additional consent from you. Her PLAN does NOT obtain consent
              required under HIPAA* on your behalf.”
            </span>
          </IonCol>
          <IonCol size="12">
            <span>*HIPAA is the Health Insurance Portability and Accountability Act of 1996.</span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ModalOptShareDataInfo;
