import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CreateNewListValidationSchema,
  IProviderListRequest,
  ISaveToListRequest,
  SaveToListValidationSchema,
  useMyPosition,
} from "src/shared";
import { getStateFromAddressComponents } from "src/shared/helpers";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedListingRequest, savedListingStateSelector } from "src/store/provider";
import Geocode from "src/utils/geocode";

interface Props {
  siteId: string;
  organisationId: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSaveToList = ({ siteId, organisationId, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const { currentLocation } = useMyPosition();
  const savedListing = useSelector(savedListingStateSelector);
  const [bCreateNewList, setBCreateNewList] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const initCreateNewList: IProviderListRequest = {
    listingName: "",
    update: false,
    updatedName: "",
    stateLoc: "",
  };
  const initSaveToListRequest: ISaveToListRequest = { saveListingId: "", siteId, organisationId };

  const createNewListName = async (values: IProviderListRequest) => {
    try {
      if (!currentLocation) return;
      const geocodeRes = await Geocode.fromLatLng(
        `${currentLocation.lat}`,
        `${currentLocation.lng}`
      );
      if (geocodeRes && geocodeRes.results.length && geocodeRes.results[0].address_components) {
        const state = getStateFromAddressComponents(geocodeRes.results[0].address_components);
        if (state) values = { ...values, stateLoc: state };
      }
      setIsProcessing(true);
      ProviderService.upsertProviderList(values)
        .then((res: any) => {
          if (!res.success && res.message) {
            presentToast({ message: res.message, color: "danger" });
            return;
          }
          if (res.success && res.message) {
            presentToast({ message: res.message, color: "success" });
            dispatch(getSavedListingRequest());
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

  const saveListToSave = (values: ISaveToListRequest) => {
    setIsProcessing(true);
    ProviderService.saveItemToList(values)
      .then((res: any) => {
        if (res.success) {
          onDismiss();
          if (res.message) presentToast({ message: res.message, color: "success" });
        } else {
          if (res.message) presentToast({ message: res.message, color: "danger" });
        }
      })
      .catch((error) => {
        console.error("Error saveItemToList:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Save To List</IonTitle>
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
                  <IonLabel>Create New List</IonLabel>
                  <IonToggle
                    slot="end"
                    checked={bCreateNewList}
                    onIonChange={(e: Event) => {
                      const target = e.target as HTMLIonToggleElement;
                      setBCreateNewList(target.checked);
                    }}
                  ></IonToggle>
                </IonItem>
                {bCreateNewList && (
                  <>
                    <IonItem>
                      <IonInput
                        className={`${!errors.listingName && "ion-valid"} ${
                          errors.listingName && "ion-invalid"
                        } ${touched.listingName && "ion-touched"}`}
                        label="List Name"
                        labelPlacement="stacked"
                        placeholder="Create New List"
                        value={values.listingName}
                        errorText={errors.listingName}
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
                  </>
                )}
              </IonList>
            </form>
          )}
        </Formik>
        <Formik
          initialValues={initSaveToListRequest}
          enableReinitialize
          validationSchema={SaveToListValidationSchema}
          onSubmit={(values) => saveListToSave(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonSelect
                    className={`${!errors.saveListingId && "ion-valid"} ${
                      errors.saveListingId && "ion-invalid"
                    } ${touched.saveListingId && "ion-touched"}`}
                    label="Select List To Save"
                    labelPlacement="stacked"
                    placeholder="Select List To Save"
                    value={values.saveListingId}
                    onIonChange={(e) => {
                      setFieldValue("saveListingId", e.detail.value);
                    }}
                  >
                    {savedListing.map((item) => (
                      <IonSelectOption key={item._id} value={item._id}>
                        {item.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                  {errors.saveListingId && touched.saveListingId && (
                    <IonNote slot="error" className="block">
                      {errors.saveListingId}
                    </IonNote>
                  )}
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  {isProcessing && <IonSpinner className="mr-2" slot="start"></IonSpinner>}
                  Save
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalSaveToList;
