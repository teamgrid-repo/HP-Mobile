import { IonCard, IonCardContent, IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import { useSelector } from "react-redux";
import { QuizSuggestionTip } from "src/components/organisms";
import {
  FELL_ABOUT_ABORTIONS,
  FELL_ABOUT_PREGNANCIES,
  IStep2State,
  SPECIAL_QUESTIONS,
  subCatIds,
} from "src/shared";
import { aboveTextQueAnsSelector, quizAnswerStateSelector } from "src/store/quiz";

interface Props {
  changeAnswer: (key: keyof IStep2State, value: any) => void;
}

const QuizStep2SubAns2 = ({ changeAnswer }: Props) => {
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const {
    aboveTextAnswer,
    doVerbByAns,
    aboveTextAnswer2,
    aboveTextAnswer3,
    aboveTextQuestion,
    beVerbByAns,
    verbByAns,
    adjectiveByAns,
    feelByAns,
    adjectiveByAns2,
    questionByAns,
    questionByAns2,
    questionByAns3,
  } = useSelector(aboveTextQueAnsSelector);

  const { q1, q11, q111, q112, spq } = quizAnswerState[2];

  if (q1 === "PREGNANT OR MIGHT BE PREGNANT." && q11 === "YES") {
    return (
      <div className="mt-2">
        <span>
          How {doVerbByAns} {aboveTextAnswer2} Feel About {aboveTextQuestion} Pregnancy?
        </span>
        <div className="flex flex-col my-4">
          {FELL_ABOUT_PREGNANCIES.map((feelItem, index) => (
            <IonCard
              key={feelItem.value}
              className={`quiz-card-item ${feelItem.value === q111 ? "selected-card-item" : ""}`}
              onClick={() => changeAnswer("q111", feelItem.value)}
            >
              <IonCardContent>{`${aboveTextAnswer} ${index !== 2 ? beVerbByAns : ""} ${feelItem.text
                .replace("${replace1}", aboveTextAnswer3)
                .replaceAll("${replace2}", adjectiveByAns)
                .replace("${replace3}", aboveTextAnswer)}`}</IonCardContent>
            </IonCard>
          ))}
        </div>
        {q111 === "NOT SURE ABOUT CONTINUING THIS PREGNANCY." && (
          <QuizSuggestionTip
            descriptions={["Click here to view", "link-0", "in your area to talk through options."]}
            links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
          />
        )}
        {q111 === "TOOK THE FIRST ABORTION PILL, BUT NOW I AM HAVING REGRETS." && (
          <QuizSuggestionTip
            descriptions={["Call 877-558-0333 (24/7) or visit", "webopen-0"]}
            links={[]}
            weblinks={[
              { link: "https://www.abortionpillreversal.com/", linkText: "Abortion Pill Reversal" },
            ]}
          />
        )}
        {q111 ===
          "PLANNING TO CARRY MY PREGNANCY TO TERM BUT I’M NOT SURE I CAN TAKE CARE OF MY CHILD." && (
          <QuizSuggestionTip
            descriptions={[
              "Sometimes parents who feel they can’t care for their children make a plan for open adoption so they can still be in their child’s life while giving them the best chances of success. Go to",
              "link-0",
              "for high-quality programs in your area to learn more for free.",
            ]}
            links={[{ categoryId: subCatIds[30], isAllCategory: false }]}
          />
        )}
        {q111 === "CONSIDERING ABORTION." && (
          <>
            <span>{aboveTextAnswer3} Considering Abortion.</span>
            <div className="flex flex-col my-4">
              {FELL_ABOUT_ABORTIONS.map((feelItem, index) => (
                <IonCard
                  key={feelItem.value}
                  className={`quiz-card-item ${
                    feelItem.value === q112 ? "selected-card-item" : ""
                  }`}
                  onClick={() => changeAnswer("q112", feelItem.value)}
                >
                  <IonCardContent>{`${aboveTextAnswer} ${index > 0 ? verbByAns : ""} ${feelItem.text
                    .replace("${replace1}", feelByAns)
                    .replace("${replace2}", adjectiveByAns2)}`}</IonCardContent>
                </IonCard>
              ))}
            </div>
            {q112 === "THIS MIGHT BE THE BEST DECISION FOR" && (
              <QuizSuggestionTip
                descriptions={[
                  "We understand pregnancy decisions are complicated. Many woman find they benefit from discussing their options with a pregnancy help organization. Click here to view",
                  "link-0",
                  "or continue the quiz.",
                ]}
                links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
              />
            )}
            {q112 === "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION." && (
              <QuizSuggestionTip
                descriptions={[
                  "Doctors sometimes recommend abortion if there is something wrong with the mom or baby, but abortion is often not actually necessary in these cases, the doctor may just not be trained to handle your case. You have the option to continue your pregnancy. If your doctor is recommending abortion because he thinks your life is at risk, you can get a second opinion by searching",
                  "link-0",
                  ". The danger may not be immediate; you may be able to keep going with the pregnancy with careful monitoring to see if your condition improves, or to see if your body miscarries naturally. If you are in immediate danger, early induction is a safe alternative to dismemberment abortion that allows you to say goodbye to your baby.",
                  "<br />",
                  "<br>",
                  "If your doctor is recommending abortion because of the condition of the unborn baby, search",
                  "link-1",
                  "to find resources to care for a baby with disabilities or medical conditions, or resources to say goodbye without abortion through a Perinatal Hospice Program. You can also search",
                  "link-2",
                  "if you think you might be unable to care for your child but want to make a plan for their care. Another family may be wanting and even requesting a special needs child.",
                ]}
                links={[
                  { categoryId: subCatIds[3], isAllCategory: false },
                  { categoryId: subCatIds[21], isAllCategory: false },
                  { categoryId: subCatIds[30], isAllCategory: false },
                ]}
              />
            )}
          </>
        )}
        <div className="flex flex-col mt-8">
          <span>Special Questions</span>
          <div className="flex flex-col my-4">
            {SPECIAL_QUESTIONS.map((specialItem) => (
              <IonCard key={specialItem.value} className="quiz-card-item">
                <IonCardContent className="quiz-card-content">
                  <IonItem lines="none" className="quiz-checkbox-item">
                    <IonCheckbox
                      slot="start"
                      checked={spq[specialItem.value]}
                      onIonChange={(e) =>
                        changeAnswer("spq", {
                          ...spq,
                          [specialItem.value]: e.detail.checked,
                        })
                      }
                    ></IonCheckbox>
                    <IonLabel>
                      {`${specialItem.text
                        .replace("${replace1}", questionByAns)
                        .replace("${replace2}", questionByAns2)
                        .replace("${replace3}", questionByAns3)}`}
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
          <div className="quiz-suggestion-tip space-y-2">
            {spq[0] && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[4], isAllCategory: false }]}
                isGroupTip={true}
              />
            )}
            {spq[1] && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[21], isAllCategory: true }]}
                isGroupTip={true}
              />
            )}
            {spq[2] && (
              <QuizSuggestionTip
                descriptions={["Click here to view", "link-0"]}
                links={[{ categoryId: subCatIds[28], isAllCategory: false }]}
                isGroupTip={true}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default QuizStep2SubAns2;
