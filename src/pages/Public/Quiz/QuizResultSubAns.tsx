import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { memo } from "react";

interface Props {
  headerText: string;
  sgA: JSX.Element[];
}

const QuizResultSubAns = ({ headerText, sgA }: Props) => {
  return (
    <div className="mx-8 mt-6">
      <IonCard className="quiz-card-item">
        <IonCardHeader>{headerText}</IonCardHeader>
        <IonCardContent className="quiz-card-content2">
          {sgA.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          {sgA.length === 0 && <div className="text-center text-[#7e7e7e]">No Quiz Data</div>}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default memo(QuizResultSubAns);
