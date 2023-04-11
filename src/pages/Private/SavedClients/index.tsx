import { IonButton, IonContent, IonIcon, IonLabel, IonPage, useIonModal } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BackButton } from "src/components/atoms";
import { ModalAddClient } from "src/components/molecules";
import { PageHeader, SavedClientList, SavedClientSortBy } from "src/components/organisms";
import { useAppDispatch } from "src/store/config-store";
import { loadingSelector } from "src/store/global";
import {
  getAppointmentsRequest,
  getSavedClientsRequest,
  GET_SAVED_CLIENT_REQUEST,
  savedClientsBySortSelector,
} from "src/store/provider";
import "./style.scss";

const SavedClients = () => {
  const dispatch = useAppDispatch();
  const savedClients = useSelector(savedClientsBySortSelector);
  const loading = useSelector(loadingSelector(GET_SAVED_CLIENT_REQUEST));
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const [presentAddClientM, dismissAddClientM] = useIonModal(ModalAddClient, {
    onDismiss: (data: string, role: string) => dismissAddClientM(data, role),
  });

  useEffect(() => {
    setPresentingElement(page.current);
    dispatch(getSavedClientsRequest());
    dispatch(getAppointmentsRequest());
  }, []);

  return (
    <IonPage id="saved-clients-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton routerLink="/tabs/tab-dashboard" />
        <div className="flex flex-col h-full">
          <PageHeader title="Saved Clients" headerStyle={2}>
            <IonButton
              className="add-member-btn"
              fill="clear"
              size="small"
              color="success"
              onClick={() => {
                if (presentingElement) {
                  presentAddClientM({ presentingElement });
                }
              }}
            >
              <IonIcon icon={addOutline} />
              Add Client
            </IonButton>
          </PageHeader>
          <SavedClientSortBy />
          <div className="grow">
            <div className="px-[30px] flex justify-end">
              <IonLabel className="text-[12px] text-gray-400">
                Total: <span className="font-bold">{savedClients.length}</span>
              </IonLabel>
            </div>
            <SavedClientList
              presentingElement={presentingElement}
              savedClients={savedClients}
              loading={loading}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SavedClients;
