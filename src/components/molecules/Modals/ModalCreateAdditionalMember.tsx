import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { ErrorNote, PhoneInput } from "src/components/atoms";
import { SaveAdditionalMemberSchema, IPrfoileUpdateRequest } from "src/shared";
import { AuthService } from "src/shared/services";
import { getAdditionalMembersRequest } from "src/store/auth";
import { useAppDispatch } from "src/store/config-store";

interface Props {
  organisationId: string;
  userId: string;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalCreateAdditionalMember = ({ organisationId, userId, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initializeData: IPrfoileUpdateRequest = {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    contact: "",
    makeAccountPrimary: false,
    hippa: false,
    organisationId,
    userId,
  };

  const updateProfile = (values: IPrfoileUpdateRequest) => {
    if (!values.organisationId || !values.userId) return;
    setIsProcessing(true);
    AuthService.createAdditionalMember(values)
      .then((res: any) => {
        if (res.success) {
          if (values.userId) dispatch(getAdditionalMembersRequest(values.userId));
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error createAdditionalMember:", error);
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
          <IonTitle>Add Team Member</IonTitle>
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
                  <IonLabel position="stacked">Phone Number</IonLabel>
                  <PhoneInput
                    value={values.contact || ""}
                    onChange={(value) => {
                      setFieldValue("contact", value);
                    }}
                  />
                  {errors.contact && <ErrorNote text={errors.contact} />}
                </IonItem>
                <IonItem>
                  <IonLabel className="!text-[14px]">Make Account Primary</IonLabel>
                  <IonToggle
                    slot="start"
                    checked={values.makeAccountPrimary}
                    disabled={isProcessing}
                    onClick={(event) =>
                      setFieldValue(
                        "makeAccountPrimary",
                        (event.target as HTMLIonToggleElement).checked
                      )
                    }
                  ></IonToggle>
                </IonItem>
                <IonItem>
                  <IonLabel className="!text-[14px]">HIPAA Chat</IonLabel>
                  <IonToggle
                    slot="start"
                    checked={values.hippa}
                    disabled={isProcessing}
                    onClick={(event) =>
                      setFieldValue("hippa", (event.target as HTMLIonToggleElement).checked)
                    }
                  ></IonToggle>
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  Add
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalCreateAdditionalMember;
