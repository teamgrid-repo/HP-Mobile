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
import {
  IEmailQuizRequest,
  EmailQuizValidationSchema,
  IQuizAnswerState,
  HERPLAN_WEB_URL,
} from "src/shared";
import { QuizService } from "src/shared/services/quiz";

interface Props {
  quizAnswer: IQuizAnswerState;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}

const ModalEmailQuiz = ({ quizAnswer, onDismiss }: Props) => {
  const [presentToast] = useIonToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const initPasswordInfo: IEmailQuizRequest = {
    email: "",
    url: `${HERPLAN_WEB_URL}/quiz-result?${JSON.stringify(quizAnswer)}`,
  };

  const sendEmailQuiz = (values: IEmailQuizRequest) => {
    setIsProcessing(true);
    QuizService.emailQuiz(values)
      .then((res: any) => {
        if (res.success) {
          onDismiss();
        }
        if (res.message) presentToast({ message: res.message, color: "success" });
      })
      .catch((error) => {
        console.error("Error Email Quiz:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Email Quiz</IonTitle>
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
          validationSchema={EmailQuizValidationSchema}
          onSubmit={(values) => sendEmailQuiz(values)}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <IonList lines="none" className="px-[40px] pt-[20px]">
                <IonItem>
                  <IonInput
                    className={`${!errors.email && "ion-valid"} ${errors.email && "ion-invalid"} ${
                      touched.email && "ion-touched"
                    }`}
                    label="Email"
                    labelPlacement="stacked"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    errorText={errors.email}
                    onIonInput={(event) => setFieldValue("email", event.target.value)}
                  />
                </IonItem>
                <IonButton
                  className="send-btn mt-4"
                  type="submit"
                  color="success"
                  expand="block"
                  disabled={isProcessing}
                >
                  Email Quiz
                </IonButton>
                <IonButton
                  className="send-btn mt-4"
                  color="success"
                  expand="block"
                  fill="outline"
                  disabled={isProcessing}
                  onClick={() => {
                    window.open(values.url, "_blank");
                    // Browser.open({ url: values.url })
                    //   .then((result) => {})
                    //   .catch((error) => {
                    //     if (error && error.errorMessage) {
                    //       presentToast(error.errorMessage);
                    //     }
                    //   });
                  }}
                >
                  Preview
                </IonButton>
              </IonList>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default ModalEmailQuiz;
