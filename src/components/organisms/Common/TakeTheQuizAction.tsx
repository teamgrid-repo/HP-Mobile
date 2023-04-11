import { IonButton, IonIcon, IonText, RouterDirection, useIonRouter } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { setQuizAnswerState, initQuizAnswer } from "src/store/quiz";
import "./style.scss";

interface Props {
  buttonText?: string;
  description?: string;
  routeLink?: string;
  routerDirection?: RouterDirection;
}

const TakeTheQuizAction = (props: Props) => {
  const {
    buttonText = "Take The Quiz",
    description,
    routeLink = "/quiz",
    routerDirection = "forward",
  } = props;
  const dispatch = useDispatch();
  const navigation = useIonRouter();

  const handleClick = () => {
    dispatch(setQuizAnswerState(initQuizAnswer));
    navigation.push(routeLink, routerDirection);
  };

  return (
    <div className="take-quiz-container">
      {description && <IonText className="take-quiz-text">{description}</IonText>}
      <IonButton className="take-quiz-btn" fill="clear" onClick={handleClick}>
        {buttonText} <IonIcon slot="end" icon={arrowForward} />
      </IonButton>
    </div>
  );
};

export default TakeTheQuizAction;
