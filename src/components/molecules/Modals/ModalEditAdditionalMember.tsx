import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ErrorNote, PhoneInput } from "src/components/atoms";
import {
  SaveAdditionalMemberSchema,
  IProfile,
  IPrfoileUpdateRequest,
  MenuSubUserActionType,
} from "src/shared";
import { AuthService } from "src/shared/services";
import { getAdditionalMembersRequest, userStateSelector } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  subUser: IProfile;
  actionType: MenuSubUserActionType | "";
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  onEdit: () => void;
}

const ModalEditAdditionalMember = ({ subUser, actionType, onDismiss, onEdit }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const currentUser = useSelector(userStateSelector);
  const initializeData: IPrfoileUpdateRequest = {
    name: subUser.name,
    firstName: subUser.firstName,
    lastName: subUser.lastName,
    email: subUser.email,
    jobTitle: subUser.jobTitle,
    contact: subUser.contact,
    makeAccountPrimary: subUser.makeAccountPrimary,
  };

  const updateProfile = (values: IPrfoileUpdateRequest) => {
    if (!currentUser || !currentUser._id) return;
    setIsProcessing(true);
    AuthService.updateAdditionalMember(subUser._id, currentUser._id, values)
      .then((res: any) => {
        if (res.success) {
          dispatch(getAdditionalMembersRequest(currentUser._id));
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error updateAdditionalMember:", error);
        if (error && error.response && error.response.data && error.response.data.message) {
          presentToast({ message: error.response.data.message, color: "danger" });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {actionType === "View" && (
            <IonButtons slot="start">
              <IonButton disabled={isProcessing} onClick={() => onEdit()}>
                Edit
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>User Details</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={isProcessing} onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <Formik
          initialValues={initializeData}
          enableReinitialize
          validationSchema={SaveAdditionalMemberSchema}
          onSubmit={(values) => updateProfile(values)}
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
                    readonly={actionType === "View"}
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
                    readonly={actionType === "View"}
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
                    readonly={actionType === "View"}
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
                    readonly={actionType === "View"}
                    errorText={errors.jobTitle}
                    onIonInput={(event) => setFieldValue("jobTitle", event.target.value)}
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
                    readonly
                    errorText={errors.email}
                    onIonInput={(event) => setFieldValue("email", event.target.value)}
                  />
                </IonItem>
                <IonItem>
                  {actionType === "View" ? (
                    <IonInput
                      label="Phone Number"
                      labelPlacement="stacked"
                      value={values.contact || ""}
                      readonly
                    />
                  ) : (
                    <>
                      <IonLabel position="stacked">Phone Number</IonLabel>
                      <PhoneInput
                        value={values.contact || ""}
                        onChange={(value) => {
                          setFieldValue("contact", value);
                        }}
                      />
                    </>
                  )}
                  {errors.contact && <ErrorNote text={errors.contact} />}
                </IonItem>
                {actionType === "Edit" && (
                  <IonButton
                    className="send-btn mt-4"
                    type="submit"
                    color="success"
                    expand="block"
                    disabled={isProcessing}
                  >
                    Update User
                  </IonButton>
                )}
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalEditAdditionalMember;
