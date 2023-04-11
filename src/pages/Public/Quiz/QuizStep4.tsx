import { IonPage, IonContent, useIonViewDidEnter } from "@ionic/react";
import { FC, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import {
  QuizStepHeader,
  QuizYesNoOption,
  QuizSuggestionTip,
  QuizStepFooter,
} from "src/components/organisms";
import {
  IStep2State,
  IStep4State,
  subCatIds,
  YesNoType,
  YesNoType2,
  YES_NO_LIST,
} from "src/shared";
import { getQuizBaseUrl } from "src/shared/helpers";
import { useAppDispatch } from "src/store/config-store";
import {
  aboveTextQueAnsSelector,
  quizAnswerStateSelector,
  setQuizAnswerState,
} from "src/store/quiz";

const QuizStep4: FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const { aboveTextAnswer, beVerbByAns, needByAns, verbByAns } =
    useSelector(aboveTextQueAnsSelector);

  const canGoNext = useMemo(() => {
    const { q1, q2, q3, q4, q5, q6 } = quizAnswerState[4];
    return !!(q1 && q2 && q3 && q4 && q5 && q6);
  }, [quizAnswerState[4]]);

  const changeAnswer = (key: keyof (IStep4State & IStep2State), value: YesNoType | YesNoType2) => {
    dispatch(
      setQuizAnswerState({
        ...quizAnswerState,
        4: { ...quizAnswerState[4], [key]: value },
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
        <QuizStepHeader title="Special Questions" />
        <div className="quiz-step-list">
          {/* q1 */}
          <div>
            <span>{`${aboveTextAnswer} ${beVerbByAns} Currently Experiencing Suicidal Thoughts.`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q1}
              stateKey="q1"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q1 === "Yes" && (
              <div className="quiz-suggestion-tip space-y-2">
                <QuizSuggestionTip isGroupTip={true} descriptions={["HOTLINES: "]} links={[]} />
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["1-800-273-8255: ", "webopen-0"]}
                  links={[]}
                  weblinks={[
                    {
                      link: "https://suicidepreventionlifeline.org/",
                      linkText: "National Suicide Prevention Hotline",
                    },
                  ]}
                />
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["1-877-726-472: ", "webopen-0"]}
                  links={[]}
                  weblinks={[
                    {
                      link: "https://www.samhsa.gov/",
                      linkText: "Substance Abuse and Mental Health Services Administration",
                    },
                  ]}
                />
              </div>
            )}
          </div>
          {/* q2 */}
          <div className="mt-8">
            <span>{`${aboveTextAnswer} ${beVerbByAns} Currently Struggling With Substance Abuse Or Addiiction.`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q2}
              stateKey="q2"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q2 === "Yes" && (
              <div className="quiz-suggestion-tip space-y-2">
                <QuizSuggestionTip isGroupTip={true} descriptions={["HOTLINES: "]} links={[]} />
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["1-844-289-087: ", "webopen-0"]}
                  links={[]}
                  weblinks={[
                    { link: "http://drughelpline.org/", linkText: "National Drug Helpline" },
                  ]}
                />
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["1-877-726-472: ", "webopen-0"]}
                  links={[]}
                  weblinks={[
                    {
                      link: "https://www.samhsa.gov/",
                      linkText: "Substance Abuse and Mental Health Services Administration",
                    },
                  ]}
                />
              </div>
            )}
          </div>
          {/* q3 */}
          <div className="mt-8">
            <span>{`${aboveTextAnswer} ${beVerbByAns} Struggling With Grief, Trauma, Realationship, Issues, Depression, Anxiety, Or Other Emotional Problems.`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q3}
              stateKey="q3"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q3 === "Yes" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[19], isAllCategory: false }]}
              />
            )}
          </div>
          {/* q4 */}
          <div className="mt-8">
            <span>{`${aboveTextAnswer} ${beVerbByAns} Struggling To Adjust After The Birth of A Child`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q4}
              stateKey="q4"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q4 === "Yes" && (
              <QuizSuggestionTip
                descriptions={[
                  "Click here to view",
                  "link-0",
                  ". Or Click here to view",
                  "link-1",
                  ". If the adjustment is adoption-related, Click here to view",
                  "link-2",
                  "or",
                  "link-3",
                ]}
                links={[
                  { categoryId: subCatIds[5], isAllCategory: false },
                  { categoryId: subCatIds[19], isAllCategory: false },
                  { categoryId: subCatIds[28], isAllCategory: false },
                  { categoryId: subCatIds[30], isAllCategory: false },
                ]}
              />
            )}
          </div>
          {/* q5 */}
          <div className="mt-8">
            <span>{`${aboveTextAnswer} ${verbByAns} Been Raped, Assaulted, Trafficked, Or Abused.`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q5}
              stateKey="q5"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q5 === "Yes" && (
              <div className="quiz-suggestion-tip space-y-2">
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["Click here to view", "link-0"]}
                  links={[{ categoryId: subCatIds[18], isAllCategory: false }]}
                />
                <QuizSuggestionTip isGroupTip={true} descriptions={["HOTLINES:"]} links={[]} />
                <QuizSuggestionTip
                  isGroupTip={true}
                  descriptions={["1-888-373-7888 (text 233733): ", "webopen-0"]}
                  links={[]}
                  weblinks={[
                    {
                      link: "https://humantraffickinghotline.org/",
                      linkText: "National Human Trafficking Hotline",
                    },
                  ]}
                />
              </div>
            )}
          </div>
          {/* q6 */}
          <div className="mt-8">
            <span>{`${aboveTextAnswer} ${needByAns} Help With A Legal Situation.`}</span>
            <QuizYesNoOption
              yesnoList={YES_NO_LIST}
              value={quizAnswerState[4].q6}
              stateKey="q6"
              changeAnswer={changeAnswer}
            />
            {quizAnswerState[4].q6 === "Yes" && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[15], isAllCategory: false }]}
              />
            )}
          </div>
        </div>
        <QuizStepFooter
          canGoNext={canGoNext}
          nextRoute={`${getQuizBaseUrl(location.pathname)}/quiz-result`}
          step={4}
        />
      </IonContent>
    </IonPage>
  );
};

export default QuizStep4;
