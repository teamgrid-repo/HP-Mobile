import { IonPage, IonContent, IonCard, IonCardContent, useIonViewDidEnter } from "@ionic/react";
import { FC, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import { QuizStepFooter, QuizStepHeader } from "src/components/organisms";
import { BASIC_SITUATIONS, IStep2State, IStep4State } from "src/shared";
import { getQuizBaseUrl } from "src/shared/helpers";
import { useAppDispatch } from "src/store/config-store";
import {
  aboveTextQueAnsSelector,
  quizAnswerStateSelector,
  setQuizAnswerState,
} from "src/store/quiz";
import QuizStep2SubAns from "./QuizStep2SubAns";
import QuizStep2SubAns2 from "./QuizStep2SubAns2";

const QuizStep2: FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const { aboveTextAnswer, adjectiveByAns, verbByAns, beVerbByAns } =
    useSelector(aboveTextQueAnsSelector);
  const contentRef = useRef<HTMLIonContentElement>(null);

  const { q1, q11, q12, q13, q14 } = quizAnswerState[2];
  const canGoNext = useMemo(() => {
    return !!(q1 && (q11 || q12 || q13 || q14));
  }, [quizAnswerState[2]]);

  const changeAnswer = (key: keyof (IStep4State & IStep2State), value: any) => {
    dispatch(
      setQuizAnswerState({
        ...quizAnswerState,
        2: { ...quizAnswerState[2], [key]: value },
      })
    );
  };

  useIonViewDidEnter(() => {
    contentRef.current?.scrollToTop(500);
  });

  return (
    <IonPage id="quiz-page">
      <IonContent ref={contentRef} forceOverscroll={false}>
        <BackButton />
        <QuizStepHeader title="What is her basic situation?" description="Select One Option" />
        <div className="quiz-step-list">
          {BASIC_SITUATIONS.map((situation, index) => (
            <IonCard
              key={situation.value}
              className={`quiz-card-item ${situation.value === q1 ? "selected-card-item" : ""}`}
              onClick={() => {
                dispatch(
                  setQuizAnswerState({
                    ...quizAnswerState,
                    2: { ...quizAnswerState[2], q1: situation.value, mainAns: index + 1 },
                  })
                );
              }}
            >
              <IonCardContent>
                {`${aboveTextAnswer} ${
                  index === 2 ? verbByAns : beVerbByAns
                } ${situation.text.replace("${replace}", adjectiveByAns)}`}
              </IonCardContent>
            </IonCard>
          ))}
          <QuizStep2SubAns changeAnswer={changeAnswer} />
          <QuizStep2SubAns2 changeAnswer={changeAnswer} />
        </div>
        <QuizStepFooter
          canGoNext={canGoNext}
          nextRoute={`${getQuizBaseUrl(location.pathname)}/quiz-step3`}
          step={2}
        />
      </IonContent>
    </IonPage>
  );
};

export default QuizStep2;
