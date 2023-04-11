import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";

export class ProfileService {
  constructor() {}

  static updateProfile(uid: string, role: string, data: any) {
    const api = role === "provider" ? `${API_ROUTES.updateProvider}/${uid}` : API_ROUTES.profile;
    return axiosInt.post(api, role === "provider" ? data : { ...data, userId: uid });
  }

  static uploadImage(data: { image: string }) {
    return axiosInt.post(API_ROUTES.uploadImage, data);
  }

  static changePassword(data: any) {
    return axiosInt.post(API_ROUTES.changePassword, data);
  }
}
