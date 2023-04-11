import { IonPage, IonContent, useIonViewDidEnter } from "@ionic/react";
import { FC, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import {
  QuizStepHeader,
  QuizSecureAndNotSecure,
  QuizSuggestionTip,
  QuizStepFooter,
} from "src/components/organisms";
import { IStep3State, SecureNotSecureType, subCatIds } from "src/shared";
import { getQuizBaseUrl } from "src/shared/helpers";
import { useAppDispatch } from "src/store/config-store";
import {
  aboveTextQueAnsSelector,
  quizAnswerStateSelector,
  setQuizAnswerState,
} from "src/store/quiz";

const QuizStep3: FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const { aboveTextAnswer, feelByAns, aboveTextQuestion, verbByAns } =
    useSelector(aboveTextQueAnsSelector);

  const canGoNext = useMemo(() => {
    const { q1, q2, q3, q4, q5, q6, q7, q8 } = quizAnswerState[3];
    return !!(q1 && q2 && q3 && q4 && q5 && q6 && q7 && q8);
  }, [quizAnswerState[3]]);

  const changeAnswer = (key: keyof IStep3State, value: SecureNotSecureType) => {
    dispatch(
      setQuizAnswerState({
        ...quizAnswerState,
        3: { ...quizAnswerState[3], [key]: value },
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
        <QuizStepHeader title="RANK YOUR CONFIDENCE IN THE FOLLOWING STATEMENTS" />
        <div className="quiz-step-list">
          <span className="text-[12px] text-[#7e7e7e]">
            These questions are organized in an intentional order to help address the area(s) of
            greatest need first. To order the search priorities, we recommend starting at the top
            and working your way down. You could choose to address the areas marked “Not Secure”,
            from top to bottom, first. Then you can move to address the “Somewhat Secure” answers,
            again top to bottom.
          </span>

          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${feelByAns} Confident That ${aboveTextAnswer} Can Feed ${aboveTextQuestion}self And ${aboveTextQuestion} Family.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q1}
              stateKey="q1"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q1 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[12], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${feelByAns} Confident That ${aboveTextQuestion} Housing Is Safe, Affordable, And Stable.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q2}
              stateKey="q2"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q2 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[14], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${verbByAns} Confident That ${aboveTextAnswer} Can Get Around Easily And Go To Get Services.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q3}
              stateKey="q3"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q3 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[11], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${feelByAns} Confident That ${aboveTextAnswer} ${verbByAns} Enough Knowledge And Support To Parent Well.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q4}
              stateKey="q4"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q4 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[28], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${feelByAns} Confident That ${aboveTextAnswer} ${verbByAns} Safe And Affordable Childcare.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q5}
              stateKey="q5"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q5 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[27], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${feelByAns} Confident That ${aboveTextAnswer} ${verbByAns} Enough Furniture, Clothes, And Baby Supplies To Care For ${aboveTextQuestion} Child(ren) Well.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q6}
              stateKey="q6"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q6 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[13], isAllCategory: false }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${verbByAns} Confident That ${aboveTextAnswer} Family Has Enough Money To Live.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q7}
              stateKey="q7"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q7 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[6], isAllCategory: true }]}
              />
            )}
          </div>
          <div className="flex flex-col mt-8 space-y-2">
            <span>{`${aboveTextAnswer} ${verbByAns} Confident That ${aboveTextQuestion} Family Can Find And Afford Medical Services – Including Prenatal, Dental, And General Care As Applicable.`}</span>
            <QuizSecureAndNotSecure
              value={quizAnswerState[3].q8}
              stateKey="q8"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[3].q8 === "Not Secure/SomeWhat Secure" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0", "or", "link-1", " or", "link-2"]}
                links={[
                  { categoryId: subCatIds[3], isAllCategory: false },
                  { categoryId: subCatIds[5], isAllCategory: false },
                  { categoryId: subCatIds[27], isAllCategory: false },
                ]}
              />
            )}
          </div>
        </div>
        <QuizStepFooter
          canGoNext={canGoNext}
          nextRoute={`${getQuizBaseUrl(location.pathname)}/quiz-step4`}
          step={3}
        />
      </IonContent>
    </IonPage>
  );
};

export default QuizStep3;
