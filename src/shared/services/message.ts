import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";
import { ICheckRoomRequest } from "..";

export class MessageService {
  constructor() { }

  static readStatus(data: { roomName: string }) {
    return axiosInt.put(API_ROUTES.updateReadStatus, data);
  }

  static checkRoom(data: ICheckRoomRequest) {
    return axiosInt.post(API_ROUTES.messageRoom, data);
  }

  static leaveOrDelete(data: any) {
    return axiosInt.put(API_ROUTES.leaveDeleteChat, data);
  }

  static sendFileApi(data: any) {
    return axiosInt.post(API_ROUTES.socketUpload, data, { headers: { "Content-Type": "multipart/form-data" } });
  }
}
