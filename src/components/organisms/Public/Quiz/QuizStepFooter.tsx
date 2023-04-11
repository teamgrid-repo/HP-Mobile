import { IonButton, IonIcon, IonRange, useIonRouter, useIonToast } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";

interface Props {
  canGoNext: boolean;
  nextRoute: string;
  step: number;
}

const QuizStepFooter = ({ canGoNext, nextRoute, step = 0 }: Props) => {
  const [presentToast] = useIonToast();
  const navigation = useIonRouter();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleNextQuestion = () => {
    if (!canGoNext) {
      presentToast({ message: "Please Select Answer", color: "danger" });
      return;
    }
    navigation.push(nextRoute);
  };
  return (
    <div className="quiz-step-footer">
      <IonRange
        disabled
        min={0}
        max={4}
        value={step}
        pin
        ticks
        pinFormatter={(value: number) => `${(value / 4) * 100}% complete keep it up`}
        className={`${step === 4 ? "last-step" : step === 0 ? "first-step" : ""}`}
      ></IonRange>
      <div className="flex space-x-5">
        <IonButton fill="clear" color="success" className="step-back-btn" onClick={handleBack}>
          <IonIcon icon={arrowBack} />
        </IonButton>
        <IonButton className="w-full" color="success" onClick={handleNextQuestion}>
          Next Question <IonIcon slot="end" icon={arrowForward} />
        </IonButton>
      </div>
    </div>
  );
};

export default QuizStepFooter;
