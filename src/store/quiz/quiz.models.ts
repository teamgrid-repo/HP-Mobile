import { SavedSortType } from "src/shared";
import { IQuizAnswerState, ISavedQuiz } from "src/shared/models/quiz";

export interface QuizState {
  quizAnswerState: IQuizAnswerState;
  savedQuizzes: ISavedQuiz[];
  savedQuizzesSortBy: SavedSortType;
}
