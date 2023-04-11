import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonNote,
  IonButton,
  useIonAlert,
  IonToggle,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useMemo, useState } from "react";
import { ErrorNote, PhoneInput } from "src/components/atoms";
import { MyProfileValidationSchema, IUserResponse, IProfile } from "src/shared";
import { ProfileService } from "src/shared/services";
import { getUserProfileRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  currentUser: IUserResponse;
  openPasswordChange: () => void;
}
const ProviderProfile = ({ currentUser, openPasswordChange }: Props) => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const { _id, email, role, profileId } = currentUser;
  const initUserInfo = useMemo(() => ({ ...profileId }), [profileId]);

  const doSave = (values: IProfile) => {
    const data = {
      contact: values.contact,
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

  const updateProfileData = (field: string, isChecked: boolean) => {
    const data = { [field]: isChecked };
    setIsProcessing(true);
    ProfileService.updateProfile(_id, role, data)
      .then((res: any) => {
        if (res.success && res.data) {
          dispatch(getUserProfileRequest({ email, role, _id }));
          if (res.message) presentToast({ message: res.message, color: "success" });
        } else if (!res.success) {
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
                <IonLabel>Basic Information</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel className="ml-4">Make Account Primary</IonLabel>
                <IonToggle
                  slot="end"
                  checked={profileId.makeAccountPrimary}
                  disabled={profileId.approvedStatus !== "approved" || isProcessing}
                  onClick={(event) =>
                    updateProfileData(
                      "makeAccountPrimary",
                      (event.target as HTMLIonToggleElement).checked
                    )
                  }
                ></IonToggle>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Email"
                  labelPlacement="stacked"
                  fill="outline"
                  placeholder="Email"
                  value={values.email}
                  disabled
                />
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

export default ProviderProfile;
