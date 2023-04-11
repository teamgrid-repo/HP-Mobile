import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { FeedbackValidationSchema, IProvideFeedbackRequest } from "src/shared";
import { FeedbackService } from "src/shared/services";

interface Props {
  siteId: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalFeedback = ({ siteId, onDismiss }: Props) => {
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initPasswordInfo: IProvideFeedbackRequest = {
    name: "",
    email: "",
    feedback: "",
    siteId,
  };

  const sendFeedback = (values: IProvideFeedbackRequest) => {
    setIsProcessing(true);
    if (!values.siteId) {
      presentToast({ message: "siteId is not defined.", color: "danger" });
      return;
    }
    FeedbackService.addFeedback(values)
      .then((res: any) => {
        if (res.success) {
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error Add Feedback Quiz:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feedback</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initPasswordInfo}
          enableReinitialize
          validationSchema={FeedbackValidationSchema}
          onSubmit={(values) => sendFeedback(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                      touched.name && "ion-touched"
                    }`}
                    label="Name"
                    labelPlacement="stacked"
                    placeholder="Name"
                    value={values.name}
                    errorText={errors.name}
                    onIonInput={(event) => setFieldValue("name", event.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    className={`${!errors.email && "ion-valid"} ${errors.email && "ion-invalid"} ${
                      touched.email && "ion-touched"
                    }`}
                    label="Email"
                    labelPlacement="stacked"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onIonInput={(event) => setFieldValue("email", event.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonTextarea
                    className={`${!errors.feedback && "ion-valid"} ${
                      errors.feedback && "ion-invalid"
                    } ${touched.feedback && "ion-touched"}`}
                    label="Message"
                    labelPlacement="stacked"
                    placeholder="Write Your Message"
                    value={values.feedback}
                    autoGrow
                    errorText={errors.feedback}
                    onIonInput={(event) => setFieldValue("feedback", event.target.value)}
                  />
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  Submit Feedback
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalFeedback;
