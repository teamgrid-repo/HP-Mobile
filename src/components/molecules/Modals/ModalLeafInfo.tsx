import { IonIcon, IonButton, IonGrid, IonRow, IonCol, IonPage } from "@ionic/react";
import { close, informationCircleOutline } from "ionicons/icons";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalLeafInfo = ({ onDismiss }: Props) => {
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
              The leaf designation is used in some of Her PLAN’s subcategories to designate which
              providers support a green, natural approach toward reproductive health by supporting,
              not repressing, replacing, or blocking, their clients’ natural fertility and
              procreative potential.
            </span>
          </IonCol>
          <IonCol size="12">
            <span>
              If the leaf toggle is not active, you have only selected a subcategory or
              subcategories to which leaf does not apply. If you use this toggle and have selected
              both a subcategory to which leaf applies and a subcategory to which it does not apply,
              you will see all results for the subcategory to which leaf does not apply, and only
              the leaf-designated results for the subcategory to which leaf does apply.
            </span>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ModalLeafInfo;
