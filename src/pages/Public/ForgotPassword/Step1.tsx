import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonInput,
  IonButton,
  IonSpinner,
  useIonAlert,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { BackButton } from "src/components/atoms";
import { InformationCircle, ForgotPasswordValidationSchema } from "src/shared";
import { AuthService } from "src/shared/services";
import "./style.scss";

const Step1 = () => {
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const navigation = useIonRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const initialValue = { email: "" };

  const sendForgotPassword = (data: any) => {
    setIsProcessing(true);
    AuthService.forgotPassword(data)
      .then(async (res: any) => {
        if (res.code === 200 && res.success) {
          navigation.push("/forgot-password/step2", "forward");
          if (res.message) presentToast({ message: res.message, color: "success" });
        } else if (res.code === 200 && !res.success) {
          if (res.message) presentAlert({ message: res.message, buttons: ["ok"] });
        }
      })
      .catch((error) => {
        if (error.message) {
          presentAlert({ message: error.message, buttons: ["ok"] });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage id="forgot-password-page">
      <IonContent forceOverscroll={false} className="ion-padding">
        <BackButton />

        <Formik
          initialValues={initialValue}
          enableReinitialize
          validationSchema={ForgotPasswordValidationSchema}
          onSubmit={(values) => sendForgotPassword(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form className="h-full" onSubmit={handleSubmit}>
              <IonGrid className="flex flex-col pt-24">
                <IonRow>
                  <IonCol size="12">
                    <IonImg className="forgot-password-logo" src={InformationCircle} />
                  </IonCol>
                </IonRow>
                <IonRow className="mt-8">
                  <IonCol size="12">
                    <h2 className="forgot-password-title">Forgot Password?</h2>
                    <p className="forgot-password-desc">
                      Please enter your email address. You will receive a link to create a new
                      password via email.
                    </p>
                  </IonCol>
                  <IonCol size="12">
                    <IonInput
                      className={`${!errors.email && "ion-valid"} ${
                        errors.email && "ion-invalid"
                      } ${touched.email && "ion-touched"}`}
                      label=""
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      errorText={errors.email}
                      onIonInput={(event) => setFieldValue("email", event.target.value)}
                    />
                  </IonCol>
                  <IonCol size="12">
                    <IonButton
                      className="send-btn"
                      type="submit"
                      color="success"
                      expand="block"
                      disabled={isProcessing}
                    >
                      {isProcessing && <IonSpinner className="mr-2" slot="start"></IonSpinner>}
                      Send
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default Step1;
