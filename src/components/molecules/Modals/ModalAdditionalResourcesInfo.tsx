import {
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonFooter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useState } from "react";
import { useAppDispatch } from "src/store/config-store";
import { setFilterRequestState } from "src/store/provider";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalAdditionalResourcesInfo = ({ onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [readMore, setReadMore] = useState(false);

  const continueAdditionalResources = () => {
    dispatch(setFilterRequestState({ additionalResource: true }));
    onDismiss();
  };

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar className="!py-0" style={{ "--background": "white" }}>
          <div className="text-center px-12 my-4">
            <span className="text-[16px] text-[#14407b] font-bold">
              Going To Additional Resources Search
            </span>
          </div>
          <IonButtons className="absolute right-4 top-4">
            <IonButton
              fill="clear"
              color="success"
              className="nopadding-btn"
              onClick={() => onDismiss()}
            >
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <IonButton
          fill="clear"
          color="success"
          className="nopadding-btn fixed right-4 top-4"
          onClick={() => onDismiss()}
        >
          <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
        <IonGrid className="pb-4 px-8">
          <IonRow>
            <IonCol size="12" className="text-center">
              <span className="text-[#7e7e7e] text-[14px] leading-[20px]">
                Resources listed in this “additional resources” directory are not part of the Her
                PLAN network and are not reviewed to determine consistency with Her PLAN standards.
                Her PLAN does not necessarily endorse these sites or the products, content,
                materials, or information presented or made available within them. “Additional
                Resources” provides links to and information about third parties (including
                websites), owned and operated by independent parties over which Her PLAN has no
                control ("Third-Parties)"). HER PLAN DOES NOT ENDORSE OR APPROVE AND MAKES NO
                WARRANTIES, REPRESENTATIONS, OR UNDERTAKINGS RELATING TO THE PRODUCTS, CONTENT,
                MATERIALS, OPINIONS, OR OTHER INFORMATION MADE AVAILABLE BY OR ABOUT THIRD-PARTIES,
                OR RELATING TO ANY SERVICES PROVIDED BY SUCH THIRD PARTIES.  In addition to the
                terms stated in Her PLAN’S Terms of Use, Her PLAN disclaims liability for any loss,
                damage, cost and any other consequence resulting directly or indirectly from or
                relating to your access to the Third-Party Websites or any information made
                available by or about Third-Parties, or any information that you may provide or any
                transaction conducted on or via a Third-Party Website or the failure of any
                information, goods or services posted or offered at the Third-Party Website or any
                error, omission, or misrepresentation on the Third-Party Website or any computer
                virus arising from or system failure associated with the Third-Party Website, or
                resulting directly or indirectly from or relating to any services, products,
                content, materials, opinions, and/or other information provided by the applicable
                third party. By clicking "Proceed", you will be confirming that you have read and
                agreed to the terms herein and in Her PLAN’S Terms of Use.
              </span>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar className="!py-0" style={{ "--background": "white" }}>
          <div className="flex flex-col">
            <IonButton expand="block" color="success" onClick={continueAdditionalResources}>
              Continue to Additional Resources
            </IonButton>
            <IonButton expand="block" fill="clear" color="success" onClick={() => onDismiss()}>
              Cancel
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default ModalAdditionalResourcesInfo;
