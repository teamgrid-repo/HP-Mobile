import { IonPage, IonContent, IonButton, useIonRouter, useIonModal } from "@ionic/react";
import { uniq } from "lodash";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { BackButton } from "src/components/atoms";
import { ModalEmailQuiz, ModalSaveQuiz } from "src/components/molecules";
import {
  QuizSuggestionTip,
  QuizHeader,
  TakeTheQuizAction,
  ModalLogin,
} from "src/components/organisms";
import {
  IStep2State,
  IStep3State,
  IStep4State,
  PROVIDER_QUIZRESULT_LIST,
  QuizResultMenuActionType,
  subCatIds,
} from "src/shared";
import { getQuizBaseUrl } from "src/shared/helpers";
import { isLoggedInSelector } from "src/store/auth";
import { cureSubCategoriesStateSelector } from "src/store/category";
import { useAppDispatch } from "src/store/config-store";
import { initialFilterRequest, setFilterRequestState } from "src/store/provider";
import { aboveTextQueAnsSelector, quizAnswerStateSelector } from "src/store/quiz";
import QuizResultSubAns from "./QuizResultSubAns";

const getAnswersByQuestionsForStep2 = (subAns: IStep2State, aboveTextQuestion: string) => {
  const { q1, q11, q12, q13, q14, q111, q112 } = subAns;
  const sgA: JSX.Element[] = [];
  const ids = [];

  if (q1 === "PREGNANT OR MIGHT BE PREGNANT." && q11 === "YES") {
    if (q111 === "NOT SURE ABOUT CONTINUING THIS PREGNANCY.") {
      sgA.push(
        <QuizSuggestionTip
          isGroupTip
          descriptions={["Click here to view", "link-0", "in your area to talk through options."]}
          links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
        />
      );
      ids.push({ categoryId: subCatIds[1], isAllCategory: false });
    } else if (q111 === "TOOK THE FIRST ABORTION PILL, BUT NOW I AM HAVING REGRETS.") {
      sgA.push(
        <QuizSuggestionTip
          isGroupTip
          descriptions={["Call 877-558-0333 (24/7) or visit", "webopen-0"]}
          links={[]}
          weblinks={[
            {
              link: "https://www.abortionpillreversal.com/",
              linkText: "Abortion Pill Reversal",
            },
          ]}
        />
      );
    } else if (
      q111 ===
      "PLANNING TO CARRY MY PREGNANCY TO TERM BUT I’M NOT SURE I CAN TAKE CARE OF MY CHILD."
    ) {
      sgA.push(
        <QuizSuggestionTip
          isGroupTip
          descriptions={[
            "Sometimes parents who feel they can’t care for their children make a plan for open adoption so they can still be in their child’s life while giving them the best chances of success. Go to",
            "link-0",
            "for high-quality programs in your area to learn more for free.",
          ]}
          links={[{ categoryId: subCatIds[30], isAllCategory: false }]}
        />
      );
      ids.push({ categoryId: subCatIds[30], isAllCategory: false });
    } else if (q111 === "CONSIDERING ABORTION.") {
      if (q112 === "THIS MIGHT BE THE BEST DECISION FOR") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={[
              "We understand pregnancy decisions are complicated. Many woman find they benefit from discussing their options with a pregnancy help organization. Click here to view",
              "link-0",
              "or continue the quiz.",
            ]}
            links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[1], isAllCategory: false });
      } else if (q112 === "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
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
        );
        ids.push(
          { categoryId: subCatIds[3], isAllCategory: false },
          { categoryId: subCatIds[21], isAllCategory: false },
          { categoryId: subCatIds[30], isAllCategory: false }
        );
      }
    }
  } else {
    if (q1 === "PREGNANT OR MIGHT BE PREGNANT." && q11 === "NO") {
      sgA.push(
        <QuizSuggestionTip
          isGroupTip
          descriptions={[
            `${aboveTextQuestion} #1 priority could be to confirm ${aboveTextQuestion} pregnancy for free at a pregnancy help organization. Click here to view`,
            "link-0",
            "and look for those that have an ultrasound machine.",
          ]}
          links={[{ categoryId: subCatIds[1], isAllCategory: false }]}
        />
      );
      ids.push({ categoryId: subCatIds[1], isAllCategory: false });
    } else if (q1 === "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2." && q12 === "YES") {
      sgA.push(
        <QuizSuggestionTip
          isGroupTip
          descriptions={[
            "Search",
            "link-0",
            "for help caring for children with special needs or medical challenges.",
          ]}
          links={[{ categoryId: subCatIds[21], isAllCategory: true }]}
        />
      );
      ids.push({ categoryId: subCatIds[21], isAllCategory: true });
    } else if (q1 === "EXPERIENCED PREGNANCY LOSS OR THE LOSS OF HER YOUNG CHILD.") {
      if (q13 === "HAD AN ABORTION.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={["Click here to view", "link-0", "for help after abortion."]}
            links={[{ categoryId: subCatIds[20], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[20], isAllCategory: false });
      } else if (q13 === "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={["Click here to view", "link-0"]}
            links={[{ categoryId: subCatIds[25], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[25], isAllCategory: false });
      } else if (q13 === "HAD A CHILD PLACED IN FOSTER CARE.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={["Click here to view", "link-0"]}
            links={[{ categoryId: subCatIds[31], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[31], isAllCategory: false });
      }
    } else if (q1 === "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.") {
      if (q14 === "CONSIDERING ADOPTION.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={["Click here to view", "link-0"]}
            links={[{ categoryId: subCatIds[30], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[30], isAllCategory: false });
      } else if (q14 === "CONSIDERING BECOMING A FOSTER PARENT.") {
        sgA.push(
          <QuizSuggestionTip
            isGroupTip
            descriptions={["Click here to view", "link-0"]}
            links={[{ categoryId: subCatIds[31], isAllCategory: false }]}
          />
        );
        ids.push({ categoryId: subCatIds[31], isAllCategory: false });
      }
    }
  }

  return { sgA, ids };
};
const getAnswersByQuestionsForStep3 = (subAns: IStep3State) => {
  const { q1, q2, q3, q4, q5, q6, q7, q8 } = subAns;
  const sgA: JSX.Element[] = [];
  const ids = [];

  if (q1 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[12], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[12], isAllCategory: false });
  }
  if (q2 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[14], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[14], isAllCategory: false });
  }
  if (q3 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[11], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[11], isAllCategory: false });
  }
  if (q4 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[28], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[28], isAllCategory: false });
  }
  if (q5 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[27], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[27], isAllCategory: false });
  }
  if (q6 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[13], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[13], isAllCategory: false });
  }
  if (q7 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[6], isAllCategory: true }]}
      />
    );
    ids.push({ categoryId: subCatIds[6], isAllCategory: true });
  }
  if (q8 === "Not Secure/SomeWhat Secure") {
    sgA.push(
      <QuizSuggestionTip
        isGroupTip
        descriptions={["Click here to view", "link-0", "or", "link-1", " or", "link-2"]}
        links={[
          { categoryId: subCatIds[3], isAllCategory: false },
          { categoryId: subCatIds[5], isAllCategory: false },
          { categoryId: subCatIds[27], isAllCategory: false },
        ]}
      />
    );
    ids.push(
      { categoryId: subCatIds[3], isAllCategory: false },
      { categoryId: subCatIds[5], isAllCategory: false },
      { categoryId: subCatIds[27], isAllCategory: false }
    );
  }
  return { sgA, ids };
};
const getAnswersByQuestionsForStep4 = (subAns: IStep4State) => {
  const { q1, q2, q3, q4, q5, q6 } = subAns;
  const sgA: JSX.Element[] = [];
  const ids = [];

  if (q1 === "Yes") {
    sgA.push(
      <div className="quiz-suggestion-tip">
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
    );
  }
  if (q2 === "Yes") {
    sgA.push(
      <div className="quiz-suggestion-tip">
        <QuizSuggestionTip isGroupTip={true} descriptions={["HOTLINES: "]} links={[]} />
        <QuizSuggestionTip
          isGroupTip={true}
          descriptions={["1-844-289-087: ", "webopen-0"]}
          links={[]}
          weblinks={[{ link: "http://drughelpline.org/", linkText: "National Drug Helpline" }]}
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
    );
  }
  if (q3 === "Yes") {
    sgA.push(
      <QuizSuggestionTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[19], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[19], isAllCategory: false });
  }
  if (q4 === "Yes") {
    sgA.push(
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
    );
    ids.push(
      { categoryId: subCatIds[5], isAllCategory: false },
      { categoryId: subCatIds[19], isAllCategory: false },
      { categoryId: subCatIds[28], isAllCategory: false },
      { categoryId: subCatIds[30], isAllCategory: false }
    );
  }
  if (q5 === "Yes") {
    sgA.push(
      <div className="quiz-suggestion-tip">
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
    );
    ids.push({ categoryId: subCatIds[18], isAllCategory: false });
  }
  if (q6 === "Yes") {
    sgA.push(
      <QuizSuggestionTip
        descriptions={["Click here to view", "link-0"]}
        links={[{ categoryId: subCatIds[15], isAllCategory: false }]}
      />
    );
    ids.push({ categoryId: subCatIds[15], isAllCategory: false });
  }
  return { sgA, ids };
};

const QuizResult: FC<RouteComponentProps> = ({ match, location }) => {
  const navigation = useIonRouter();
  const dispatch = useAppDispatch();
  const cureSubCategories = useSelector(cureSubCategoriesStateSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const quizAnswerState = useSelector(quizAnswerStateSelector);
  const { aboveTextQuestion } = useSelector(aboveTextQueAnsSelector);
  const [presentEmailQuizM, dismissEmailQuizM] = useIonModal(ModalEmailQuiz, {
    onDismiss: (data: string, role: string) => dismissEmailQuizM(data, role),
    quizAnswer: quizAnswerState,
  });
  const [presentLoginM, dismissLoginM] = useIonModal(ModalLogin, {
    onDismiss: (data: string, role: string) => dismissLoginM(data, role),
    title: "You Must Be Logged In",
  });
  const [presentSaveQuizM, dismissSaveQuizM] = useIonModal(ModalSaveQuiz, {
    onDismiss: (data: string, role: string) => dismissSaveQuizM(data, role),
    quizAnswer: quizAnswerState,
  });
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  const { sgA: sgA1, ids: ids1 } = getAnswersByQuestionsForStep2(
    quizAnswerState[2],
    aboveTextQuestion
  );
  const { sgA: sgA2, ids: ids2 } = getAnswersByQuestionsForStep3(quizAnswerState[3]);
  const { sgA: sgA3, ids: ids3 } = getAnswersByQuestionsForStep4(quizAnswerState[4]);
  const ids = useMemo(() => [...ids1, ...ids2, ...ids3], [[ids1, ids2, ids3]]);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleAction = (action: QuizResultMenuActionType) => {
    if (action === "See Providers") {
      let ds = initialFilterRequest;
      ds.category = [];
      const bufCats: string[] = [];
      ids.forEach((item) => {
        if (item.isAllCategory) {
          const cat = cureSubCategories.find((c) => c.category._id === item.categoryId);
          if (cat) cat.subCategory.forEach((subCat) => bufCats.push(subCat._id));
        } else {
          bufCats.push(item.categoryId);
        }
      });
      ds = { ...ds, category: [...ds.category, ...uniq(bufCats)] };
      dispatch(setFilterRequestState(ds));
      if (getQuizBaseUrl(location.pathname)) {
        navigation.push(`/tabs/tab-provider`);
      } else {
        navigation.push(`/provider-search`);
      }
    } else if (action === "Email Quiz Results") {
      if (presentingElement) presentEmailQuizM({ presentingElement: presentingElement });
    } else if (action === "Save Quiz Results") {
      if (!isLoggedIn && presentingElement) {
        presentLoginM({ presentingElement: presentingElement });
      } else {
        if (presentingElement) presentSaveQuizM({ presentingElement: presentingElement });
      }
    }
  };

  return (
    <IonPage id="quiz-page" ref={page}>
      <IonContent forceOverscroll={false}>
        <BackButton />
        <QuizHeader
          title="See Your Quiz Result"
          description={`Based on ${aboveTextQuestion} responses here’s the best search criteria.`}
        />
        <div className="flex flex-col px-[30px] pt-[30px]">
          {PROVIDER_QUIZRESULT_LIST.map((action) => (
            <IonButton
              key={action}
              fill="outline"
              color="success"
              onClick={() => handleAction(action)}
            >
              {action}
            </IonButton>
          ))}
        </div>

        <QuizResultSubAns
          headerText={`Recommendations Based On ${aboveTextQuestion} Situation`}
          sgA={sgA1}
        />
        <QuizResultSubAns headerText="Confidence Rankings" sgA={sgA2} />
        <QuizResultSubAns headerText="Special Questions" sgA={sgA3} />
        <TakeTheQuizAction
          buttonText="Take Another Quiz"
          routerDirection="root"
          routeLink={`${getQuizBaseUrl(location.pathname)}/quiz`}
        />
      </IonContent>
    </IonPage>
  );
};

export default QuizResult;
