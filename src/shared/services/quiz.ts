import axiosInt from "src/utils/callApi";
import axiosIntSingleKey from "src/utils/callApiWithSingleKey";
import { IEmailQuizRequest, ISaveQuizRequest } from "..";
import { API_ROUTES } from "../constants";

export class QuizService {
  constructor() {}

  static emailQuiz(data: IEmailQuizRequest) {
    return axiosIntSingleKey.post(API_ROUTES.emailQuiz, data);
  }

  static saveQuiz(data: ISaveQuizRequest) {
    return axiosInt.post(API_ROUTES.quiz, data);
  }

  static deleteSavedQuiz(id: string) {
    return axiosInt.delete(`${API_ROUTES.quiz}?id=${id}`);
  }
}
