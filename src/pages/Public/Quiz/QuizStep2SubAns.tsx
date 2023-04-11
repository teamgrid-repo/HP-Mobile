import { IonCard, IonCardContent } from "@ionic/react";
import { useSelector } from "react-redux";
import { QuizYesNoOption, QuizSuggestionTip } from "src/components/organisms";
import {
  ADOPTION_FOSTER_CONDITIONS,
  IStep2State,
  IStep4State,
  PREGNANCY_LOSS_REASONS,
  subCatIds,
  YES_NO_LIST2,
} from "src/shared";
import { quizAnswerStateSelector, aboveTextQueAnsSelector } from "src/store/quiz";

interface Props {
  changeAnswer: (key: keyof (IStep4State & IStep2State), value: any) => void;
}

const QuizStep2SubAns = ({ changeAnswer }: Props) => {
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const { aboveTextAnswer, aboveTextQuestion, adjectiveByAns } =
    useSelector(aboveTextQueAnsSelector);
  const { q1, q11, q12, q13, q14 } = quizAnswerState[2];

  return (
    <div className="mt-8">
      {q1 === "PREGNANT OR MIGHT BE PREGNANT." && (
        <>
          <span>
            {aboveTextAnswer === "I" ? "Have You" : "Has She"} Confirmed{" "}
            {aboveTextAnswer === "I" ? "Your " : "Her "} Pregnancy Via Ultrasound Or Boold Test?
          </span>
          <QuizYesNoOption
            yesnoList={YES_NO_LIST2}
            value={q11}
            stateKey="q11"
            changeAnswer={changeAnswer}
          />
          {q11 === "NO" && (
            <QuizSuggestionTip
              descriptions={[
                `${aboveTextQuestion} #1 priority could be to confirm ${aboveTextQuestion} pregnancy for free at
              a pregnancy help organization. Click here to view`,
                "link-0",
                "and look for those that have an ultrasound machine.",
              ]}
              links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
            />
          )}
        </>
      )}
      {q1 === "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2." && (
        <>
          <span>Do These Unborn or Young Children Have Special Needs?</span>
          <QuizYesNoOption
            yesnoList={YES_NO_LIST2}
            value={q12}
            stateKey="q12"
            changeAnswer={changeAnswer}
          />
          {q12 === "YES" && (
            <QuizSuggestionTip
              descriptions={[
                "Search",
                "link-0",
                "for help caring for children with special needs or medical challenges.",
              ]}
              links={[{ categoryId: subCatIds[21], isAllCategory: true }]}
            />
          )}
        </>
      )}
      {q1 === "EXPERIENCED PREGNANCY LOSS OR THE LOSS OF HER YOUNG CHILD." && (
        <>
          <span>
            {aboveTextAnswer === "I" ? "I Have " : "She Has "} Experienced Pregnancy Loss Or The
            Loss of {adjectiveByAns} Young Child.
          </span>
          <div className="flex flex-col my-4">
            {PREGNANCY_LOSS_REASONS.map((item) => (
              <IonCard
                key={item.value}
                className={`quiz-card-item ${item.value === q13 ? "selected-card-item" : ""}`}
                onClick={() => changeAnswer("q13", item.value)}
              >
                <IonCardContent>
                  {aboveTextAnswer} {item.text}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
          {q13 === "HAD AN ABORTION." && (
            <QuizSuggestionTip
              descriptions={["Click here to view", "link-0", "for help after abortion."]}
              links={[{ categoryId: subCatIds[20], isAllCategory: false }]}
            />
          )}
          {q13 === "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT." && (
            <QuizSuggestionTip
              descriptions={["Click here to view", "link-0"]}
              links={[{ categoryId: subCatIds[25], isAllCategory: false }]}
            />
          )}
          {q13 === "HAD A CHILD PLACED IN FOSTER CARE." && (
            <QuizSuggestionTip
              descriptions={["Click here to view", "link-0"]}
              links={[{ categoryId: subCatIds[31], isAllCategory: false }]}
            />
          )}
        </>
      )}
      {q1 === "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT." && (
        <>
          <span>
            {aboveTextAnswer === "I" ? "I Am" : "She Is"} Considering Becoming An Adoptive Or Foster
            Care Parent.
          </span>
          <div className="flex flex-col my-4">
            {ADOPTION_FOSTER_CONDITIONS.map((item) => (
              <IonCard
                key={item.value}
                className={`quiz-card-item ${item.value === q14 ? "selected-card-item" : ""}`}
                onClick={() => changeAnswer("q14", item.value)}
              >
                <IonCardContent>
                  {aboveTextAnswer === "I" ? "I Am" : "She Is"} {item.text}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
          {q14 === "CONSIDERING ADOPTION." && (
            <QuizSuggestionTip
              descriptions={["Click here to view", "link-0"]}
              links={[{ categoryId: subCatIds[30], isAllCategory: false }]}
            />
          )}
          {q14 === "CONSIDERING BECOMING A FOSTER PARENT." && (
            <QuizSuggestionTip
              descriptions={["Click here to view", "link-0"]}
              links={[{ categoryId: subCatIds[31], isAllCategory: false }]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizStep2SubAns;
