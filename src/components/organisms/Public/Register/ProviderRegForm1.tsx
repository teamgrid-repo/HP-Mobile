import { IonInput, useIonRouter, IonItem, IonList, IonButton } from "@ionic/react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useDeepEffect } from "src/hooks";
import { ISignupProviderRequest, Signup1ValidationSchema } from "src/shared";
import { setSignupProviderRequestState, signupProviderRequestStateSelector } from "src/store/auth";
import RegisterNote from "./RegisterNote";

interface Props {
  socialRes: Partial<ISignupProviderRequest>;
}

const ProviderRegForm1 = ({ socialRes }: Props) => {
  const dispatch = useDispatch();
  const navigation = useIonRouter();
  const singupProviderRequest = useSelector(signupProviderRequestStateSelector);

  useDeepEffect(() => {
    if (socialRes) {
      dispatch(
        setSignupProviderRequestState({
          ...singupProviderRequest,
          ...socialRes,
        })
      );
    }
  }, [socialRes]);

  const doNext = (values: ISignupProviderRequest) => {
    dispatch(setSignupProviderRequestState(values));
    navigation.push("/register/create-account2");
  };

  if (!singupProviderRequest) return <></>;

  return (
    <Formik
      initialValues={singupProviderRequest}
      enableReinitialize
      validationSchema={Signup1ValidationSchema}
      onSubmit={(values) => doNext(values)}
    >
      {({ errors, touched, handleSubmit, values, setFieldValue }) => (
        <form className="h-full" onSubmit={handleSubmit}>
          <IonList className="custom-list" lines="none">
            <RegisterNote type="provider" />
            <IonItem>
              <IonInput
                className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                  touched.name && "ion-touched"
                }`}
                label="Name (Preferred Name)"
                labelPlacement="stacked"
                placeholder="Name (Preferred Name)"
                value={values.name}
                errorText={errors.name}
                onIonInput={(event) => setFieldValue("name", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.firstName && "ion-valid"} ${
                  errors.firstName && "ion-invalid"
                } ${touched.firstName && "ion-touched"}`}
                label="First Name"
                labelPlacement="stacked"
                placeholder="First Name"
                value={values.firstName}
                errorText={errors.firstName}
                onIonInput={(event) => setFieldValue("firstName", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.lastName && "ion-valid"} ${
                  errors.lastName && "ion-invalid"
                } ${touched.lastName && "ion-touched"}`}
                label="Last Name"
                labelPlacement="stacked"
                placeholder="Last Name"
                value={values.lastName}
                errorText={errors.lastName}
                onIonInput={(event) => setFieldValue("lastName", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.jobTitle && "ion-valid"} ${
                  errors.jobTitle && "ion-invalid"
                } ${touched.jobTitle && "ion-touched"}`}
                label="Job Title"
                labelPlacement="stacked"
                placeholder="Job Title"
                value={values.jobTitle}
                errorText={errors.jobTitle}
                onIonInput={(event) => setFieldValue("jobTitle", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.orgName && "ion-valid"} ${errors.orgName && "ion-invalid"} ${
                  touched.orgName && "ion-touched"
                }`}
                label="Organization Name"
                labelPlacement="stacked"
                placeholder="Organization Name"
                value={values.orgName}
                errorText={errors.orgName}
                onIonInput={(event) => setFieldValue("orgName", event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                className={`${!errors.howYouHeard && "ion-valid"} ${
                  errors.howYouHeard && "ion-invalid"
                } ${touched.howYouHeard && "ion-touched"}`}
                label="How you heard about Her PLAN"
                labelPlacement="stacked"
                placeholder="How you heard about Her PLAN"
                value={values.howYouHeard}
                errorText={errors.howYouHeard}
                onIonInput={(event) => setFieldValue("howYouHeard", event.target.value)}
              />
            </IonItem>
          </IonList>
          <IonButton className="next-btn mt-4" type="submit" color="success" expand="block">
            Next
          </IonButton>
        </form>
      )}
    </Formik>
  );
};

export default ProviderRegForm1;
