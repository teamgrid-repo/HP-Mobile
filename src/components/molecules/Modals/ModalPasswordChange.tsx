import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IPasswordChangeRequest, PasswordChangeValidationSchema } from "src/shared";
import { ProfileService } from "src/shared/services";
import { userStateSelector } from "src/store/auth";

interface Props {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalPasswordChange = ({ onDismiss }: Props) => {
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const currentUser = useSelector(userStateSelector);
  const initPasswordInfo: IPasswordChangeRequest = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const savePassword = (values: IPasswordChangeRequest) => {
    if (!currentUser?._id) return;
    const { currentPassword, password } = values;
    setIsProcessing(true);
    ProfileService.changePassword({ _id: currentUser._id, currentPassword, password })
      .then((res: any) => {
        if (res.success) {
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error password change:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change Password</IonTitle>
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
          validationSchema={PasswordChangeValidationSchema}
          onSubmit={(values) => savePassword(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    className={`${!errors.currentPassword && "ion-valid"} ${
                      errors.currentPassword && "ion-invalid"
                    } ${touched.currentPassword && "ion-touched"}`}
                    label="Current Password"
                    labelPlacement="stacked"
                    type="password"
                    placeholder="Current Password"
                    value={values.currentPassword}
                    errorText={errors.currentPassword}
                    onIonInput={(event) => setFieldValue("currentPassword", event.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonInput
                    className={`${!errors.password && "ion-valid"} ${
                      errors.password && "ion-invalid"
                    } ${touched.password && "ion-touched"}`}
                    label="New Password"
                    labelPlacement="stacked"
                    type="password"
                    placeholder="New Password"
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
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  Change Password
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalPasswordChange;
