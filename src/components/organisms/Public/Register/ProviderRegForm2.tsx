import {
  IonInput,
  useIonRouter,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
  useIonToast,
  IonSpinner,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISignupProviderRequest, Signup2ValidationSchema } from "src/shared";
import { AuthService } from "src/shared/services";
import {
  resetSignupProviderRequestState,
  resetSignupUserRequestState,
  setUserState,
  signupProviderRequestStateSelector,
} from "src/store/auth";

const ProviderRegForm2 = () => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();
  const [presentToast] = useIonToast();
  const singupProviderRequest = useSelector(signupProviderRequestStateSelector);
  const [isProcessing, setIsProcessing] = useState(false);

  const doSignup = (data: ISignupProviderRequest) => {
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

  if (!singupProviderRequest) return <></>;

  return (
    <Formik
      initialValues={singupProviderRequest}
      enableReinitialize
      validationSchema={Signup2ValidationSchema}
      onSubmit={(values) => doSignup(values)}
    >
      {({ errors, touched, handleSubmit, values, setFieldValue }) => (
        <form className="h-full" onSubmit={handleSubmit}>
          <IonList className="custom-list" lines="none">
            <IonItem>
              <IonInput
                className={`${!errors.address && "ion-valid"} ${errors.address && "ion-invalid"} ${
                  touched.address && "ion-touched"
                }`}
                label="Address"
                labelPlacement="stacked"
                placeholder="Address"
                value={values.address}
                errorText={errors.address}
                onIonInput={(event) => setFieldValue("address", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.city && "ion-valid"} ${errors.city && "ion-invalid"} ${
                  touched.city && "ion-touched"
                }`}
                label="City"
                labelPlacement="stacked"
                placeholder="City"
                value={values.city}
                errorText={errors.city}
                onIonInput={(event) => setFieldValue("city", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.zipcode && "ion-valid"} ${errors.zipcode && "ion-invalid"} ${
                  touched.zipcode && "ion-touched"
                }`}
                label="Zipcode"
                labelPlacement="stacked"
                placeholder="Zipcode"
                value={values.zipcode}
                errorText={errors.zipcode}
                onIonInput={(event) => setFieldValue("zipcode", event.target.value)}
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
            <IonItem className="custome-toggle-container">
              <IonLabel className="ml-4">HIPAA-covered entity</IonLabel>
              <IonToggle slot="end"></IonToggle>
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

export default ProviderRegForm2;
