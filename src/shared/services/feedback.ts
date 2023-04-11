import axiosInt from "src/utils/callApi";
import axiosIntSingleKey from "src/utils/callApiWithSingleKey";
import { API_ROUTES } from "../constants";
import { IProvideFeedbackRequest } from "../models";

export class FeedbackService {
  constructor() {}

  static getFeedbacks() {
    return axiosInt.get(API_ROUTES.getFeedback);
  }

  static addFeedback(data: IProvideFeedbackRequest) {
    return axiosIntSingleKey.post(API_ROUTES.addFeedback, data);
  }

  static deleteFeedback(id: string) {
    return axiosInt.delete(`${API_ROUTES.deleteFeedback}?id=${id}`);
  }
}
