import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonInput,
  IonRow,
  IonSpinner,
  useIonAlert,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { BackButton } from "src/components/atoms";
import {
  ResetPasswordValidationSchema,
  InformationCircle,
  IResetPasswordRequest,
} from "src/shared";
import { AuthService } from "src/shared/services";

const Step3 = () => {
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();
  const navigation = useIonRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const initialValue: IResetPasswordRequest = { code: "", password: "", confirmPassword: "" };

  const doCreateNewPassword = (data: IResetPasswordRequest) => {
    const { confirmPassword, ...rest } = data;
    setIsProcessing(true);
    AuthService.verifyForgotPassword(rest)
      .then(async (res: any) => {
        if (res.code === 200 && res.success) {
          navigation.push("/login", "root");
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
          validationSchema={ResetPasswordValidationSchema}
          onSubmit={(values) => doCreateNewPassword(values)}
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
                    <h2 className="forgot-password-title">Create new password</h2>
                    <p className="forgot-password-desc">
                      Your new password must be different from previously used passwords.
                    </p>
                  </IonCol>
                  <IonCol size="12">
                    <IonInput
                      className={`${!errors.code && "ion-valid"} ${errors.code && "ion-invalid"} ${
                        touched.code && "ion-touched"
                      }`}
                      label=""
                      placeholder="Code"
                      value={values.code}
                      errorText={errors.code}
                      onIonInput={(event) => setFieldValue("code", event.target.value)}
                    />
                  </IonCol>
                  <IonCol size="12">
                    <IonInput
                      className={`${!errors.password && "ion-valid"} ${
                        errors.password && "ion-invalid"
                      } ${touched.password && "ion-touched"}`}
                      label=""
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      errorText={errors.password}
                      onIonInput={(event) => setFieldValue("password", event.target.value)}
                    />
                  </IonCol>
                  <IonCol size="12">
                    <IonInput
                      className={`${!errors.confirmPassword && "ion-valid"} ${
                        errors.confirmPassword && "ion-invalid"
                      } ${touched.confirmPassword && "ion-touched"}`}
                      label=""
                      type="password"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      errorText={errors.confirmPassword}
                      onIonInput={(event) => setFieldValue("confirmPassword", event.target.value)}
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
                      Create
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

export default Step3;
