import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  useIonModal,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { BackButton } from "src/components/atoms";
import { ModalAddProviderList } from "src/components/molecules";
import { ProviderDirectoryList, MyProvidersFilters, PageHeader } from "src/components/organisms";
import { useAppDispatch } from "src/store/config-store";
import { getSavedListingRequest } from "src/store/provider";
import "./style.scss";

const MyProviders = () => {
  const dispatch = useAppDispatch();
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const [presentAddProviderListM, dismissAddProviderListM] = useIonModal(ModalAddProviderList, {
    onDismiss: (data: string, role: string) => dismissAddProviderListM(data, role),
  });

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useIonViewWillEnter(() => {
    dispatch(getSavedListingRequest());
  });

  return (
    <IonPage id="my-providers-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-dashboard" />
        <div className="flex flex-col h-full">
          <PageHeader title="Provider List" headerStyle={2}>
            <IonButton
              className="add-list-btn"
              fill="clear"
              size="small"
              color="success"
              onClick={() => {
                if (presentingElement) {
                  presentAddProviderListM({ presentingElement });
                }
              }}
            >
              <IonIcon icon={addOutline} />
              Add List
            </IonButton>
          </PageHeader>
          <MyProvidersFilters presentingElement={presentingElement} />
          <div className="grow">
            <ProviderDirectoryList presentingElement={presentingElement} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyProviders;
