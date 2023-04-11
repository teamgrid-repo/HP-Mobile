import { IonCard, IonCardContent } from "@ionic/react";
import { IStep3State, SecureNotSecureType, SECURE_NOTSECURE_LIST } from "src/shared";

interface Props {
  value: SecureNotSecureType | "";
  stateKey: keyof IStep3State;
  changeAnswer: (key: keyof IStep3State, value: any) => void;
}

const QuizSecureAndNotSecure = ({ value, stateKey, changeAnswer }: Props) => {
  return (
    <div className="flex flex-col">
      {SECURE_NOTSECURE_LIST.map((item) => (
        <IonCard
          key={item}
          className={`quiz-card-item ${item === value ? "selected-card-item" : ""}`}
          onClick={() => changeAnswer(stateKey, item)}
        >
          <IonCardContent>{item}</IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default QuizSecureAndNotSecure;
