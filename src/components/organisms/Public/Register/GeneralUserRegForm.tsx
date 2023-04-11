import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonToggle,
  IonButton,
  useIonRouter,
  useIonToast,
  IonSpinner,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeepEffect } from "src/hooks";
import { ISignupProviderRequest, ISignupUserRequest, SignupUserValidationSchema } from "src/shared";
import { AuthService } from "src/shared/services";
import {
  resetSignupProviderRequestState,
  resetSignupUserRequestState,
  setSignupUserRequestState,
  setUserState,
  signupUserRequestStateSelector,
} from "src/store/auth";
import RegisterNote from "./RegisterNote";

interface Props {
  socialRes: Partial<ISignupProviderRequest>;
}
const GeneralUserRegForm = ({ socialRes }: Props) => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();
  const [presentToast] = useIonToast();
  const singupUserRequest = useSelector(signupUserRequestStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);
  const { name, email, socialToken, type } = socialRes;

  useDeepEffect(() => {
    if (name && email && socialToken) {
      dispatch(setSignupUserRequestState({ ...singupUserRequest, name, email, socialToken }));
    }
  }, [socialRes]);

  const doSignup = (data: ISignupUserRequest) => {
    setIsProcessing(true);
    const { confirmPassword, ...rest } = data;
    AuthService.register(rest)
      .then((res: any) => {
        if (res.code === 200 && res.success) {
          if (res.data) {
            dispatch(setUserState(res.data));
            dispatch(resetSignupProviderRequestState());
            dispatch(resetSignupUserRequestState());
            navigation.push("/tabs/tab-dashboard");
          }
          if (res.message) presentToast({ message: res.message, color: "success" });
        } else if (res.code === 200 && !res.success) {
          if (res.message) presentToast({ message: res.message, color: "danger" });
        }
      })
      .catch((error) => {
        if (error.message) presentToast({ message: error.message, color: "danger" });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  if (!singupUserRequest) return <></>;

  return (
    <Formik
      initialValues={singupUserRequest}
      enableReinitialize
      validationSchema={SignupUserValidationSchema}
      onSubmit={(values) => doSignup(values)}
    >
      {({ errors, touched, isValid, handleSubmit, values, setFieldValue }) => (
        <form className="h-full" onSubmit={handleSubmit}>
          <IonList className="custom-list" lines="none">
            <RegisterNote type="general" />
            <IonItem>
              <IonInput
                className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                  touched.name && "ion-touched"
                }`}
                label="Your Name"
                labelPlacement="stacked"
                placeholder="Your Name"
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
                placeholder="Email"
                value={values.email}
                errorText={errors.email}
                onIonInput={(event) => setFieldValue("email", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.password && "ion-valid"} ${
                  errors.password && "ion-invalid"
                } ${touched.password && "ion-touched"}`}
                label="Password"
                labelPlacement="stacked"
                type="password"
                placeholder="Password"
                value={values.password}
                errorText={errors.password}
                onIonInput={(event) => setFieldValue("password", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.confirmPassword && "ion-valid"} ${
                  errors.confirmPassword && "ion-invalid"
                } ${touched.confirmPassword && "ion-touched"}`}
                label="Confirm Password"
                labelPlacement="stacked"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                errorText={errors.confirmPassword}
                onIonInput={(event) => setFieldValue("confirmPassword", event.target.value)}
              />
            </IonItem>
            <IonItem
              className={`custome-toggle-container ${!errors.acceptTerms && "ion-valid"} ${
                errors.acceptTerms && "ion-invalid"
              } ${touched.acceptTerms && "ion-touched"}`}
            >
              <IonLabel className="ml-4">Accept the terms of use agreement</IonLabel>
              <IonToggle
                slot="end"
                checked={values.acceptTerms}
                onIonChange={(event) => setFieldValue("acceptTerms", event.target.checked)}
              ></IonToggle>
            </IonItem>
            {errors.acceptTerms && touched.acceptTerms && (
              <IonNote color="danger" className="text-[12px]">
                {errors.acceptTerms}
              </IonNote>
            )}
            <IonItem className="custome-toggle-container">
              <IonLabel className="ml-4">
                Allow providers to contact other Her PLAN providers on your behalf.
              </IonLabel>
              <IonToggle
                slot="end"
                checked={values.optShareData}
                onIonChange={(event) => setFieldValue("optShareData", event.target.checked)}
              ></IonToggle>
            </IonItem>
          </IonList>
          <IonButton
            className="next-btn mt-4"
            type="submit"
            color="success"
            expand="block"
            disabled={isProcessing}
          >
            {isProcessing && <IonSpinner className="mr-2" slot="start"></IonSpinner>}
            Signup
          </IonButton>
        </form>
      )}
    </Formik>
  );
};

export default GeneralUserRegForm;
