import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  useIonAlert,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { ModalEditProviderList } from "src/components/molecules";
import { SAVED_SORT_TYPES } from "src/shared";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import {
  savedListingStateSelector,
  selectedSavedListingIdSelector,
  setSavedListingSortByState,
  savedListingSortBySelector,
  setSelectedSavedListingState,
  getSavedListingRequest,
} from "src/store/provider";
import "./style.scss";

interface Props {
  presentingElement: HTMLElement | null;
}

const MyProvidersFilters = ({ presentingElement }: Props) => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const savedListing = useSelector(savedListingStateSelector);
  const selectedSavedListingId = useSelector(selectedSavedListingIdSelector);
  const sortType = useSelector(savedListingSortBySelector);

  const [presentEditProviderListM, dismissEditProviderListM] = useIonModal(ModalEditProviderList, {
    onDismiss: (data: string, role: string) => dismissEditProviderListM(data, role),
    item: savedListing.find((sItem) => sItem._id === selectedSavedListingId) || null,
  });

  const deleteProviderList = (providerId: string) => {
    presentAlert({
      header: "Delete Provider List ?",
      message: "Are you sure you want to delete this provider list?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Ok",
          role: "confirm",
          handler: () => {
            ProviderService.deleteProviderList(providerId)
              .then((res: any) => {
                if (!res.success && res.message) {
                  presentToast({ message: res.message, color: "danger" });
                  return;
                }
                if (res.success && res.message) {
                  presentToast({ message: res.message, color: "success" });
                  dispatch(setSelectedSavedListingState(""));
                  dispatch(getSavedListingRequest());
                }
              })
              .catch((error) => {
                console.error("Error deleteSavedSearch:", error);
              })
              .finally(() => {});
          },
        },
      ],
    });
  };

  return (
    <div className="my-5 mx-8 my-provider-filters">
      <IonList>
        <IonItem lines="none">
          <IonSelect
            label="Choose List"
            labelPlacement="floating"
            className="w-full"
            value={selectedSavedListingId}
            placeholder="Select List..."
            onIonChange={(e) => {
              dispatch(setSelectedSavedListingState(e.detail.value || ""));
            }}
          >
            {savedListing.map((item) => (
              <IonSelectOption key={item._id} value={item._id}>
                {item.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        {selectedSavedListingId && (
          <IonItem lines="none" className="actions-item">
            <div className="flex flex-row w-full justify-end">
              <IonButton
                fill="clear"
                color="success"
                onClick={() => {
                  if (presentingElement) presentEditProviderListM({ presentingElement });
                }}
              >
                Edit
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                onClick={() => deleteProviderList(selectedSavedListingId)}
              >
                Delete
              </IonButton>
            </div>
          </IonItem>
        )}
        <IonItem lines="none">
          <IonSelect
            label="Sort By"
            labelPlacement="floating"
            className="w-full"
            value={sortType}
            placeholder="Select Sort..."
            onIonChange={(e) => {
              dispatch(setSavedListingSortByState(e.detail.value));
            }}
          >
            {SAVED_SORT_TYPES.map((sType) => (
              <IonSelectOption key={sType} value={sType}>
                {sType}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
    </div>
  );
};

export default MyProvidersFilters;
