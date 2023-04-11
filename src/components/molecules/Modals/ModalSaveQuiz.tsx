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
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import { ISaveQuizRequest, SaveQuizValidationSchema, IQuizAnswerState } from "src/shared";
import { QuizService } from "src/shared/services";
import { useAppDispatch } from "src/store/config-store";
import { getSavedQuizzesRequest } from "src/store/quiz";

interface Props {
  quizAnswer: IQuizAnswerState;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalSaveQuiz = ({ quizAnswer, onDismiss }: Props) => {
  const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initPasswordInfo: ISaveQuizRequest = {
    name: "",
    // url: `${HERPLAN_WEB_URL}/quiz-result?${JSON.stringify(quizAnswer)
    url: `${JSON.stringify(quizAnswer)}`,
  };

  const sendEmailQuiz = (values: ISaveQuizRequest) => {
    setIsProcessing(true);
    QuizService.saveQuiz(values)
      .then((res: any) => {
        if (res.success) {
          dispatch(getSavedQuizzesRequest());
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error save Quiz:", error);
        if (error.message) presentToast({ message: error.message, color: "danger" });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Save Quiz</IonTitle>
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
          validationSchema={SaveQuizValidationSchema}
          onSubmit={(values) => sendEmailQuiz(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem
                  className={`${!errors.name && "ion-valid"} ${errors.name && "ion-invalid"} ${
                    touched.name && "ion-touched"
                  }`}
                >
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput
                    placeholder="Name"
                    value={values.name}
                    onIonInput={(event) => setFieldValue("name", event.target.value)}
                  />
                  {errors.name && touched.name && (
                    <IonNote slot="error" className="block">
                      {errors.name}
                    </IonNote>
                  )}
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  Save Quiz
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalSaveQuiz;
