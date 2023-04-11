import { IonPage, IonContent, IonCard, IonCardContent, useIonViewDidEnter } from "@ionic/react";
import { FC, memo, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import { QuizStepFooter, QuizStepHeader } from "src/components/organisms";
import { LOOKING_FOR_QUESTIONS, LookingForQuestionType } from "src/shared";
import { getQuizBaseUrl } from "src/shared/helpers";
import { useAppDispatch } from "src/store/config-store";
import { quizAnswerStateSelector, setQuizAnswerState } from "src/store/quiz";

const QuizStep1: FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const canGoNext = useMemo(() => !!quizAnswerState[1].q1, [quizAnswerState[1].q1]);
  const contentRef = useRef<HTMLIonContentElement>(null);

  const changeAnswer = (answer: LookingForQuestionType) => {
    dispatch(setQuizAnswerState({ ...quizAnswerState, 1: { q1: answer } }));
  };

  useIonViewDidEnter(() => {
    contentRef.current?.scrollToTop(500);
  });

  return (
    <IonPage id="quiz-page">
      <IonContent ref={contentRef} forceOverscroll={false}>
        <BackButton />
        <QuizStepHeader title="I'm looking for help for…" description="Select One Option" />
        <div className="quiz-step-list">
          {LOOKING_FOR_QUESTIONS.map((question) => (
            <IonCard
              key={question.value}
              className={`quiz-card-item ${
                question.value === quizAnswerState[1].q1 ? "selected-card-item" : ""
              }`}
              onClick={() => changeAnswer(question.value)}
            >
              <IonCardContent>{question.text}</IonCardContent>
            </IonCard>
          ))}
        </div>
        <QuizStepFooter
          canGoNext={canGoNext}
          nextRoute={`${getQuizBaseUrl(location.pathname)}/quiz-step2`}
          step={1}
        />
      </IonContent>
    </IonPage>
  );
};

export default memo(QuizStep1);
