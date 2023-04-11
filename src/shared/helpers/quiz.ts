import { LookingForQuestionType } from "../types";

export const getAboveTextQueAns = (lookingForQuestion: LookingForQuestionType | "") => {
  return {
    aboveTextAnswer: lookingForQuestion === "MYSELF" ? "I" : "She",
    aboveTextAnswer2: lookingForQuestion === "MYSELF" ? "You" : "She",
    aboveTextAnswer3: lookingForQuestion === "MYSELF" ? "I Am" : "She Is",
    aboveTextQuestion: lookingForQuestion === "MYSELF" ? "Your" : "Her",
    adjectiveByAns: lookingForQuestion === "MYSELF" ? "My" : "Her",
    adjectiveByAns2: lookingForQuestion === "MYSELF" ? "Me" : "Her",
    verbByAns: lookingForQuestion === "MYSELF" ? "Have" : "Has",
    beVerbByAns: lookingForQuestion === "MYSELF" ? "Am" : "Is",
    doVerbByAns: lookingForQuestion === "MYSELF" ? "Do" : "Does",
    feelByAns: lookingForQuestion === "MYSELF" ? "Feel" : "Feels",
    needByAns: lookingForQuestion === "MYSELF" ? "Need" : "Needs",
    questionByAns: lookingForQuestion === "MYSELF" ? "Are You" : "Is She",
    questionByAns2: lookingForQuestion === "MYSELF" ? "Does Your" : "Does HER",
    questionByAns3: lookingForQuestion === "MYSELF" ? "Do You" : "Does She",
  };
};

export const getQuizBaseUrl = (pathname: string) => {
  return pathname.includes("/tabs/tab-provider")
    ? "/tabs/tab-provider"
    : pathname.includes("/tabs/tab-dashboard")
    ? "/tabs/tab-dashboard"
    : "";
};
