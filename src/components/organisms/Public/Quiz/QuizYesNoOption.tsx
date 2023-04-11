import { IonCard, IonCardContent } from "@ionic/react";
import { IStep2State, IStep4State, YesNoType, YesNoType2 } from "src/shared";

interface Props {
  yesnoList: YesNoType[] | YesNoType2[];
  value: YesNoType | YesNoType2 | "";
  stateKey: keyof (IStep2State & IStep4State);
  changeAnswer: (key: keyof (IStep2State & IStep4State), value: YesNoType | YesNoType2) => void;
}

const QuizYesNoOption = ({ yesnoList, value, stateKey, changeAnswer }: Props) => {
  return (
    <div className="flex flex-row justify-between space-x-4">
      {yesnoList.map((item) => (
        <IonCard
          key={item}
          className={`quiz-card-item2 w-full ${item === value ? "selected-card-item" : ""}`}
          onClick={() => changeAnswer(stateKey, item)}
        >
          <IonCardContent>{item}</IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default QuizYesNoOption;
