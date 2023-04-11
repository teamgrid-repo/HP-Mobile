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
import {
  IEditSaveShareProviderRequest,
  ISaveShareProviderRequest,
  SaveSearchesValidationSchema,
} from "src/shared";
import { ProviderService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedSearchesRequest } from "src/store/provider";

interface Props {
  url: string;
  count: number;
  _id?: string;
  oldName?: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSaveSearchAction = ({ url, count, _id, oldName, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initiShareProvider: ISaveShareProviderRequest = { name: oldName || "", url, count };

  const saveListToSave = async (values: ISaveShareProviderRequest) => {
    try {
      setIsProcessing(true);
      let res: any = null;
      if (_id) {
        const data: IEditSaveShareProviderRequest = {
          id: _id,
          name: oldName || "",
          updatedName: values.name,
          update: true,
          all: false,
        };
        res = await ProviderService.editSaveShareProvider(data);
      } else {
        res = await ProviderService.saveShareProvider(values);
      }
      if (res.success) {
        onDismiss();
        dispatch(getSavedSearchesRequest());
        if (res.message) presentToast({ message: res.message, color: "success" });
      } else {
        if (res.message) presentToast({ message: res.message, color: "danger" });
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("Error saveShareProvider:", error);
      setIsProcessing(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Save Search Action</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initiShareProvider}
          enableReinitialize
          validationSchema={SaveSearchesValidationSchema}
          onSubmit={(values) => saveListToSave(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                      touched.name && "ion-touched"
                    }`}
                    label="Search Name"
                    labelPlacement="stacked"
                    placeholder="Search Name"
                    value={values.name}
                    errorText={errors.name}
                    onIonInput={(event) => setFieldValue("name", event.target.value)}
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

export default ModalSaveSearchAction;
