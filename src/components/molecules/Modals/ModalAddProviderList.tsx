import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { CreateNewListValidationSchema, IProviderListRequest, useMyPosition } from "src/shared";
import { getStateFromAddressComponents } from "src/shared/helpers";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedListingRequest } from "src/store/provider";
import Geocode from "src/utils/geocode";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalAddProviderList = ({ onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const { currentLocation } = useMyPosition();
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState("");
  const initCreateNewList: IProviderListRequest = {
    listingName: "",
    update: false,
    updatedName: "",
    stateLoc: "",
  };

  const createNewListName = async (values: IProviderListRequest) => {
    try {
      if (!currentLocation) return;

      setIsProcessing(true);
      if (state) values = { ...values, stateLoc: state };
      ProviderService.upsertProviderList(values)
        .then((res: any) => {
          if (!res.success && res.message) {
            presentToast({ message: res.message, color: "danger" });
            return;
          }
          if (res.success && res.message) {
            presentToast({ message: res.message, color: "success" });
            dispatch(getSavedListingRequest());
            onDismiss();
          }
        })
        .catch((error) => {
          console.error("Error upsertProviderList:", error);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } catch (error) {
      console.error("Error createNewListName:", error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!currentLocation) return;

    Geocode.fromLatLng(`${currentLocation.lat}`, `${currentLocation.lng}`).then((geocodeRes) => {
      if (geocodeRes && geocodeRes.results.length && geocodeRes.results[0].address_components) {
        const gState = getStateFromAddressComponents(geocodeRes.results[0].address_components);
        if (gState) setState(gState);
      }
    });
  }, [currentLocation]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Provider List</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initCreateNewList}
          enableReinitialize
          validationSchema={CreateNewListValidationSchema}
          onSubmit={(values) => createNewListName(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    className={`${!errors.listingName && "ion-valid"} ${
                      errors.listingName && "ion-invalid"
                    } ${touched.listingName && "ion-touched"}`}
                    label="List Name"
                    labelPlacement="stacked"
                    placeholder="Create New List"
                    value={values.listingName}
                    errorText={errors.listingName || ""}
                    onIonInput={(event) => setFieldValue("listingName", event.target.value)}
                  />
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  {isProcessing && <IonSpinner className="mr-2" slot="start"></IonSpinner>}
                  Add
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalAddProviderList;
