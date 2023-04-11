import axios from "axios";
import { Toast } from '@capacitor/toast';
import { Preferences } from "@capacitor/preferences";
import { API_BASE_URL, STORAGE_LIST } from "src/shared/constants";
import { IUserResponse } from "src/shared";
import { store } from "src/store/config-store";
import { resetStore } from "src/store/global";

const axiosInt = axios.create({
  baseURL: API_BASE_URL,
});

axiosInt.interceptors.request.use(async (config) => {
  const { value } = await Preferences.get({ key: STORAGE_LIST.STORAGE_USER });
  const currentUser: IUserResponse | null = value ? JSON.parse(value) : null;
  const token = currentUser && currentUser.jwt_auth_token ? currentUser.jwt_auth_token : "";
  if (token) {
    (config as any).headers["Authorization"] = `${token}`;
  }
  return config;
}, Promise.reject);

axiosInt.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(resetStore());
      Toast.show({ text: 'Sorry, Your Token is expired. please login again.', duration: 'long' });
      return Promise.reject(error);
    }
    return Promise.reject((error.response && error.response.data) || "There is an error!");
  }
);

export default axiosInt;