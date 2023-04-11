import { orderBy, sortBy } from "lodash";
import { createSelector } from "reselect";
import { getAboveTextQueAns } from "src/shared/helpers";
import { RootState } from "src/store/root-reducer";

export const quizAnswerStateSelector = createSelector(
  (state: RootState) => state.quiz,
  (r) => r.quizAnswerState
);

export const aboveTextQueAnsSelector = createSelector(
  (state: RootState) => state.quiz,
  (r) => getAboveTextQueAns(r.quizAnswerState[1].q1)
);

export const savedQuizzesSelector = createSelector(
  (state: RootState) => state.quiz,
  (r) => r.savedQuizzes
);

export const savedQuizzesBySortSelector = createSelector(
  (state: RootState) => state.quiz,
  (r) => {
    if (r.savedQuizzesSortBy === "Default") return r.savedQuizzes;
    else if (r.savedQuizzesSortBy === "Ascending")
      return orderBy(r.savedQuizzes, ["name"], ["asc"]);
    else if (r.savedQuizzesSortBy === "Descending")
      return orderBy(r.savedQuizzes, ["name"], ["desc"]);
    else return r.savedQuizzes;
  }
);

export const savedQuizzesSortBySelector = createSelector(
  (state: RootState) => state.quiz,
  (r) => r.savedQuizzesSortBy
);
