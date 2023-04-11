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
import { useState } from "react";
import { IProviderList, IProviderListRequest, UpdateListValidationSchema } from "src/shared";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedListingRequest } from "src/store/provider";

interface Props {
  item: IProviderList | null;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalEditProviderList = ({ item, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initEditProviderList: IProviderListRequest = {
    listingName: item?.name || "",
    update: true,
    updatedName: "",
    stateLoc: item?.stateLoc || "",
  };

  const EditProviderListName = async (values: IProviderListRequest) => {
    try {
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
      console.error("Error EditProviderListName:", error);
      setIsProcessing(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Provider List</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initEditProviderList}
          enableReinitialize
          validationSchema={UpdateListValidationSchema}
          onSubmit={(values) => EditProviderListName(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    label="List Name (Old)"
                    labelPlacement="stacked"
                    value={values.listingName}
                    disabled
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    className={`${!errors.updatedName && "ion-valid"} ${
                      errors.updatedName && "ion-invalid"
                    } ${touched.updatedName && "ion-touched"}`}
                    label="List Name (New)"
                    labelPlacement="stacked"
                    value={values.updatedName}
                    onIonInput={(event) => setFieldValue("updatedName", event.target.value)}
                    errorText={errors.updatedName || ""}
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
                  Update
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalEditProviderList;
