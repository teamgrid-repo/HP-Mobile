import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonNote,
  IonButton,
  IonSelect,
  IonSelectOption,
  useIonAlert,
} from "@ionic/react";
import { Formik } from "formik";
import { useMemo, useState } from "react";
import { ErrorNote, DateInput, PhoneInput } from "src/components/atoms";
import {
  MyProfileValidationSchema,
  GENDERS,
  MARITAL_STATUS_LIST,
  IUserResponse,
  IProfile,
} from "src/shared";
import { ProfileService } from "src/shared/services";
import { getUserProfileRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  currentUser: IUserResponse;
  openPasswordChange: () => void;
}
const ClientProfile = ({ currentUser, openPasswordChange }: Props) => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const [isProcessing, setIsProcessing] = useState(false);
  const { _id, email, role, profileId } = currentUser;
  const initUserInfo = useMemo(() => ({ ...profileId, email }), [profileId, email]);

  const doSave = (values: IProfile) => {
    const data = {
      contact: values.contact,
      religion: values.religion,
      gender: values.gender,
      occupation: values.occupation,
      martialStatus: values.martialStatus,
      dob: values.dob,
    };
    setIsProcessing(true);
    ProfileService.updateProfile(_id, role, data)
      .then((res: any) => {
        if (res.success && res.data) {
          dispatch(getUserProfileRequest({ email, role, _id }));
          if (res.message) presentAlert({ message: res.message, buttons: ["ok"] });
        }
      })
      .catch((error) => {
        console.error("Error update profile:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div className="profile-container">
      <Formik
        initialValues={initUserInfo}
        enableReinitialize
        validationSchema={MyProfileValidationSchema}
        onSubmit={(values) => doSave(values)}
      >
        {({ errors, touched, handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <IonList lines="none" className="profile-list">
              <IonListHeader>
                <IonLabel>Information</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonInput
                  label="Email"
                  labelPlacement="stacked"
                  placeholder="Email"
                  value={values.email}
                  disabled
                />
              </IonItem>
              <IonItem
                className={`${!errors.dob && "ion-valid"} ${errors.dob && "ion-invalid"} ${
                  touched.dob && "ion-touched"
                }`}
              >
                <IonLabel position="stacked">Date of Birth</IonLabel>
                <DateInput
                  value={values.dob || ""}
                  onDateChange={(value) => {
                    setFieldValue("dob", value);
                  }}
                />
                {errors.dob && touched.dob && (
                  <IonNote slot="error" className="block">
                    {errors.dob}
                  </IonNote>
                )}
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.religion && "ion-valid"} ${
                    errors.religion && "ion-invalid"
                  } ${touched.religion && "ion-touched"}`}
                  label="Religion"
                  labelPlacement="stacked"
                  placeholder="Religion"
                  value={values.religion}
                  errorText={errors.religion}
                  onIonInput={(event) => setFieldValue("religion", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonSelect
                  className={`${!errors.gender && "ion-valid"} ${errors.gender && "ion-invalid"} ${
                    touched.gender && "ion-touched"
                  }`}
                  label="Gender"
                  labelPlacement="stacked"
                  placeholder="Select Gender..."
                  value={values.gender}
                  onIonChange={(e) => {
                    setFieldValue("gender", e.detail.value);
                  }}
                >
                  {GENDERS.map((gender) => (
                    <IonSelectOption key={gender} value={gender}>
                      {gender}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors.gender && touched.gender && (
                  <IonNote slot="error" className="block">
                    {errors.gender}
                  </IonNote>
                )}
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${!errors.occupation && "ion-valid"} ${
                    errors.occupation && "ion-invalid"
                  } ${touched.occupation && "ion-touched"}`}
                  label="Occupation"
                  labelPlacement="stacked"
                  placeholder="Occupation"
                  value={values.occupation}
                  errorText={errors.occupation}
                  onIonInput={(event) => setFieldValue("occupation", event.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonSelect
                  className={`${!errors.martialStatus && "ion-valid"} ${
                    errors.martialStatus && "ion-invalid"
                  } ${touched.martialStatus && "ion-touched"}`}
                  label="Marital Status"
                  labelPlacement="stacked"
                  placeholder="Select Marital Status..."
                  value={values.martialStatus}
                  onIonChange={(e) => {
                    setFieldValue("martialStatus", e.detail.value);
                  }}
                >
                  {MARITAL_STATUS_LIST.map((ms) => (
                    <IonSelectOption key={ms} value={ms}>
                      {ms}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors.martialStatus && touched.martialStatus && (
                  <IonNote slot="error" className="block">
                    {errors.martialStatus}
                  </IonNote>
                )}
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Phone Number</IonLabel>
                <PhoneInput
                  value={values.contact || ""}
                  onChange={(value) => {
                    setFieldValue("contact", value);
                  }}
                />
                {errors.contact && <ErrorNote text={errors.contact} />}
              </IonItem>

              <IonButton
                className="send-btn mt-4"
                type="submit"
                color="success"
                expand="block"
                disabled={isProcessing}
              >
                Save
              </IonButton>
              <IonButton
                className="send-btn mt-4"
                color="success"
                expand="block"
                fill="outline"
                disabled={isProcessing}
                onClick={() => openPasswordChange()}
              >
                Change Password
              </IonButton>
            </IonList>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ClientProfile;
